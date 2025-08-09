import { RequestHandler } from "express";
import mongoose from 'mongoose';
import { User } from "../models/User";
import { generateToken } from "../middleware/auth";
import { z } from "zod";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["user", "admin"]).optional()
});

// Demo credentials for when database is not available
const demoCredentials = {
  'admin@demo.com': {
    password: 'password123',
    user: {
      id: 'demo-admin-id',
      email: 'admin@demo.com',
      name: 'Demo Admin',
      role: 'admin' as const
    }
  },
  'user@demo.com': {
    password: 'password123',
    user: {
      id: 'demo-user-id',
      email: 'user@demo.com',
      name: 'Demo User',
      role: 'user' as const
    }
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      // Demo mode authentication
      const demo = demoCredentials[email as keyof typeof demoCredentials];
      if (demo && demo.password === password) {
        const token = generateToken(demo.user.id);
        return res.json({
          token,
          user: demo.user
        });
      } else {
        return res.status(401).json({ 
          error: "Invalid credentials",
          message: "For demo mode, use: admin@demo.com/password123 or user@demo.com/password123"
        });
      }
    }

    // Normal database operation
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Generate token
    const token = generateToken(user._id.toString());

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const register: RequestHandler = async (req, res) => {
  try {
    const { email, password, name, role } = registerSchema.parse(req.body);
    
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: "Database unavailable",
        message: "Registration requires database connection. Please configure MongoDB or use demo accounts."
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists with this email" });
      return;
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
      role: role || "user"
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id.toString());

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      // Return basic user info for demo mode
      return res.json({
        user: {
          _id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          favorites: [],
          downloads: [],
          purchasedAssets: []
        }
      });
    }

    const fullUser = await User.findById(user._id)
      .populate('favorites', 'title image price')
      .populate('downloads', 'title image')
      .populate('purchasedAssets', 'title image price')
      .select('-password');

    res.json({
      user: fullUser
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { name } = req.body;

    if (!user) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: "Database unavailable",
        message: "Profile updates require database connection."
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { name },
      { new: true }
    ).select('-password');

    res.json({
      user: updatedUser
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addToFavorites: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { assetId } = req.body;

    if (!user) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: "Database unavailable",
        message: "Favorites require database connection."
      });
    }

    await User.findByIdAndUpdate(
      user._id,
      { $addToSet: { favorites: assetId } }
    );

    res.json({ message: "Added to favorites" });
  } catch (error) {
    console.error("Add to favorites error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeFromFavorites: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { assetId } = req.params;

    if (!user) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: "Database unavailable",
        message: "Favorites require database connection."
      });
    }

    await User.findByIdAndUpdate(
      user._id,
      { $pull: { favorites: assetId } }
    );

    res.json({ message: "Removed from favorites" });
  } catch (error) {
    console.error("Remove from favorites error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
