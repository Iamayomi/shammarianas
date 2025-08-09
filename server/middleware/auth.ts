import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User, IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: any; // Made more flexible for demo mode
}

// Demo users for when database is not available
const demoUsers = {
  'demo-admin-id': {
    _id: 'demo-admin-id',
    email: 'admin@demo.com',
    name: 'Demo Admin',
    role: 'admin'
  },
  'demo-user-id': {
    _id: 'demo-user-id',
    email: 'user@demo.com',
    name: 'Demo User',
    role: 'user'
  }
};

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret) as { userId: string };
    
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      // Demo mode - check if it's a demo user
      const demoUser = demoUsers[decoded.userId as keyof typeof demoUsers];
      if (demoUser) {
        req.user = demoUser;
        next();
        return;
      } else {
        res.status(401).json({ error: 'Invalid demo user' });
        return;
      }
    }

    // Normal database operation
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }
  next();
};
