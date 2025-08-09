import { RequestHandler } from "express";
import mongoose from 'mongoose';
import { Asset } from "../models/Asset";
import { User } from "../models/User";
import { Order } from "../models/Order";
import { Blog } from "../models/Blog";
import { Portfolio } from "../models/Portfolio";
import { Service } from "../models/Service";
import { upload } from "../config/cloudinary";
import { z } from "zod";

const assetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(['Code', 'Video', 'Audio', 'Plugins', 'Graphics', 'Mobile Apps', 'Themes', '3D Assets', 'Templates']),
  price: z.number().min(0, "Price must be positive"),
  tags: z.string(),
  type: z.enum(['free', 'premium'])
});

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  slug: z.string().min(1, "Slug is required"),
  tags: z.string(),
  status: z.enum(['draft', 'published']).optional()
});

const portfolioSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(['Web Development', 'Mobile App', 'UI/UX Design', 'Branding', 'E-commerce', 'Other']),
  projectUrl: z.string().optional(),
  technologies: z.string(),
  featured: z.boolean().optional(),
  status: z.enum(['draft', 'published']).optional()
});

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  icon: z.string().min(1, "Icon is required"),
  features: z.string(),
  pricing: z.object({
    basic: z.number().optional(),
    pro: z.number().optional(),
    enterprise: z.number().optional()
  }).optional(),
  featured: z.boolean().optional(),
  status: z.enum(['draft', 'published']).optional()
});

// ASSET MANAGEMENT
export const uploadAsset: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (!files.image || !files.asset) {
      res.status(400).json({ error: "Both image and asset file are required" });
      return;
    }

    const {
      title,
      description,
      category,
      price,
      tags,
      type,
      isTrending,
      isBestSelling,
      isFeatured
    } = assetSchema.extend({
      isTrending: z.boolean().optional(),
      isBestSelling: z.boolean().optional(),
      isFeatured: z.boolean().optional()
    }).parse({
      ...req.body,
      price: Number(req.body.price),
      tags: req.body.tags,
      isTrending: req.body.isTrending === 'true',
      isBestSelling: req.body.isBestSelling === 'true',
      isFeatured: req.body.isFeatured === 'true'
    });

    const imageFile = files.image[0];
    const assetFile = files.asset[0];

    const asset = new Asset({
      title,
      description,
      category,
      price: type === 'free' ? 0 : price,
      image: imageFile.path,
      fileUrl: assetFile.path,
      isPremium: type === 'premium',
      isTrending: isTrending || false,
      isBestSelling: isBestSelling || false,
      isFeatured: isFeatured || false,
      tags: tags.split(',').map(tag => tag.trim()),
      author: user._id,
      authorName: user.name,
      type,
      fileSize: `${Math.round(assetFile.size / 1024)} KB`,
      fileType: assetFile.mimetype
    });

    await asset.save();

    res.status(201).json({
      message: "Asset uploaded successfully",
      asset
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    console.error("Upload asset error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAsset: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const updateData = req.body;
    
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map((tag: string) => tag.trim());
    }

    // Convert string booleans to actual booleans
    if (updateData.isTrending !== undefined) {
      updateData.isTrending = updateData.isTrending === 'true' || updateData.isTrending === true;
    }
    if (updateData.isBestSelling !== undefined) {
      updateData.isBestSelling = updateData.isBestSelling === 'true' || updateData.isBestSelling === true;
    }
    if (updateData.isFeatured !== undefined) {
      updateData.isFeatured = updateData.isFeatured === 'true' || updateData.isFeatured === true;
    }

    const asset = await Asset.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!asset) {
      res.status(404).json({ error: "Asset not found" });
      return;
    }

    res.json({
      message: "Asset updated successfully",
      asset
    });
  } catch (error) {
    console.error("Update asset error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAsset: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const asset = await Asset.findByIdAndDelete(id);

    if (!asset) {
      res.status(404).json({ error: "Asset not found" });
      return;
    }

    res.json({ message: "Asset deleted successfully" });
  } catch (error) {
    console.error("Delete asset error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ANALYTICS & REPORTS
export const getAnalytics: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      // Return demo analytics data
      const demoAnalytics = {
        totalAssets: 8,
        totalUsers: 2,
        totalRevenue: 1250,
        monthlyRevenue: 850,
        monthlyDownloads: 12450,
        popularCategories: [
          { category: 'Code', count: 2 },
          { category: 'Graphics', count: 2 },
          { category: 'Mobile Apps', count: 1 },
          { category: 'Themes', count: 1 },
          { category: '3D Assets', count: 1 }
        ],
        recentSales: [
          {
            _id: 'demo-order-1',
            total: 68,
            status: 'completed',
            createdAt: new Date().toISOString(),
            userId: { name: 'Demo User', email: 'user@demo.com' },
            assets: [
              { assetId: { title: 'Modern React Dashboard' } },
              { assetId: { title: 'Music Player App UI' } }
            ]
          }
        ],
        salesReport: {
          totalOrders: 15,
          averageOrderValue: 83.33,
          conversionRate: 75.0
        }
      };
      return res.json(demoAnalytics);
    }

    const [
      totalAssets,
      totalUsers,
      totalOrders,
      completedOrders,
      popularCategories,
      recentSales,
      monthlyRevenue
    ] = await Promise.all([
      Asset.countDocuments(),
      User.countDocuments(),
      Order.countDocuments(),
      Order.find({ status: 'completed' }),
      Asset.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),
      Order.find({ status: 'completed' })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('userId', 'name email')
        .populate('assets.assetId', 'title'),
      Order.aggregate([
        {
          $match: {
            status: 'completed',
            createdAt: {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ])
    ]);

    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
    const monthlyDownloads = await Asset.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$downloads' }
        }
      }
    ]);

    res.json({
      totalAssets,
      totalUsers,
      totalRevenue,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
      monthlyDownloads: monthlyDownloads[0]?.total || 0,
      popularCategories: popularCategories.map(cat => ({
        category: cat._id,
        count: cat.count
      })),
      recentSales,
      salesReport: {
        totalOrders: completedOrders.length,
        averageOrderValue: completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0,
        conversionRate: totalUsers > 0 ? (completedOrders.length / totalUsers) * 100 : 0
      }
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSalesReport: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const { startDate, endDate, period = 'month' } = req.query;

    let dateFilter: any = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate as string),
          $lte: new Date(endDate as string)
        }
      };
    } else {
      // Default to current month
      const now = new Date();
      dateFilter = {
        createdAt: {
          $gte: new Date(now.getFullYear(), now.getMonth(), 1),
          $lte: new Date(now.getFullYear(), now.getMonth() + 1, 0)
        }
      };
    }

    const salesData = await Order.aggregate([
      { $match: { status: 'completed', ...dateFilter } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: period === 'day' ? { $dayOfMonth: '$createdAt' } : null
          },
          totalRevenue: { $sum: '$total' },
          orderCount: { $sum: 1 },
          avgOrderValue: { $avg: '$total' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    const topSellingAssets = await Order.aggregate([
      { $match: { status: 'completed', ...dateFilter } },
      { $unwind: '$assets' },
      {
        $group: {
          _id: '$assets.assetId',
          totalSold: { $sum: 1 },
          totalRevenue: { $sum: '$assets.price' },
          assetTitle: { $first: '$assets.title' }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      salesData,
      topSellingAssets,
      summary: {
        totalRevenue: salesData.reduce((sum, item) => sum + item.totalRevenue, 0),
        totalOrders: salesData.reduce((sum, item) => sum + item.orderCount, 0),
        averageOrderValue: salesData.length > 0 
          ? salesData.reduce((sum, item) => sum + item.avgOrderValue, 0) / salesData.length 
          : 0
      }
    });
  } catch (error) {
    console.error("Get sales report error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// BLOG MANAGEMENT
export const createBlog: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    const {
      title,
      content,
      excerpt,
      slug,
      tags,
      status
    } = blogSchema.parse(req.body);

    const blog = new Blog({
      title,
      content,
      excerpt,
      slug,
      featuredImage: files.featuredImage ? files.featuredImage[0].path : undefined,
      tags: tags.split(',').map(tag => tag.trim()),
      status: status || 'draft',
      author: user._id,
      authorName: user.name
    });

    await blog.save();

    res.status(201).json({
      message: "Blog post created successfully",
      blog
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    console.error("Create blog error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBlog: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const updateData = req.body;
    
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map((tag: string) => tag.trim());
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!blog) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }

    res.json({
      message: "Blog post updated successfully",
      blog
    });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBlog: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }

    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBlogs: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('author', 'name email');

    const total = await Blog.countDocuments();

    res.json({
      blogs,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error("Get all blogs error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PORTFOLIO MANAGEMENT
export const createPortfolio: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (!files.image) {
      res.status(400).json({ error: "Image is required" });
      return;
    }

    const {
      title,
      description,
      category,
      projectUrl,
      technologies,
      featured,
      status
    } = portfolioSchema.parse(req.body);

    const portfolio = new Portfolio({
      title,
      description,
      category,
      image: files.image[0].path,
      projectUrl,
      technologies: technologies.split(',').map(tech => tech.trim()),
      featured: featured || false,
      status: status || 'published',
      author: user._id,
      authorName: user.name
    });

    await portfolio.save();

    res.status(201).json({
      message: "Portfolio item created successfully",
      portfolio
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    console.error("Create portfolio error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePortfolio: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const updateData = req.body;
    
    if (updateData.technologies && typeof updateData.technologies === 'string') {
      updateData.technologies = updateData.technologies.split(',').map((tech: string) => tech.trim());
    }

    const portfolio = await Portfolio.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!portfolio) {
      res.status(404).json({ error: "Portfolio item not found" });
      return;
    }

    res.json({
      message: "Portfolio item updated successfully",
      portfolio
    });
  } catch (error) {
    console.error("Update portfolio error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePortfolio: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const portfolio = await Portfolio.findByIdAndDelete(id);

    if (!portfolio) {
      res.status(404).json({ error: "Portfolio item not found" });
      return;
    }

    res.json({ message: "Portfolio item deleted successfully" });
  } catch (error) {
    console.error("Delete portfolio error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPortfolios: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const portfolios = await Portfolio.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email');

    res.json({ portfolios });
  } catch (error) {
    console.error("Get all portfolios error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// SERVICES MANAGEMENT
export const createService: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const {
      title,
      description,
      shortDescription,
      icon,
      features,
      pricing,
      featured,
      status
    } = serviceSchema.parse(req.body);

    const service = new Service({
      title,
      description,
      shortDescription,
      icon,
      image: files.image ? files.image[0].path : undefined,
      features: features.split(',').map(feature => feature.trim()),
      pricing: pricing || {},
      featured: featured || false,
      status: status || 'published',
      author: user._id,
      authorName: user.name
    });

    await service.save();

    res.status(201).json({
      message: "Service created successfully",
      service
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    console.error("Create service error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateService: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const updateData = req.body;
    
    if (updateData.features && typeof updateData.features === 'string') {
      updateData.features = updateData.features.split(',').map((feature: string) => feature.trim());
    }

    const service = await Service.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!service) {
      res.status(404).json({ error: "Service not found" });
      return;
    }

    res.json({
      message: "Service updated successfully",
      service
    });
  } catch (error) {
    console.error("Update service error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteService: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      res.status(404).json({ error: "Service not found" });
      return;
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllServices: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const services = await Service.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email');

    res.json({ services });
  } catch (error) {
    console.error("Get all services error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GENERAL ADMIN DATA
export const getAllAssets: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const assets = await Asset.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('author', 'name email');

    const total = await Asset.countDocuments();

    res.json({
      assets,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error("Get all assets error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments();

    res.json({
      users,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllOrders: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('userId', 'name email')
      .populate('assets.assetId', 'title');

    const total = await Order.countDocuments();

    res.json({
      orders,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
