import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/database";
import { handleDemo } from "./routes/demo";
import { 
  getAssets, 
  getAssetById, 
  getCategories, 
  getFeaturedAssets,
  getTrendingAssets,
  getBestSellingAssets,
  getFreeAssets,
  downloadAsset
} from "./routes/assets";
import { 
  login, 
  register, 
  getProfile, 
  updateProfile,
  addToFavorites,
  removeFromFavorites
} from "./routes/auth";
import { 
  uploadAsset, 
  updateAsset, 
  deleteAsset, 
  getAnalytics,
  getSalesReport,
  getAllAssets,
  getAllUsers,
  getAllOrders,
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getAllPortfolios,
  createService,
  updateService,
  deleteService,
  getAllServices
} from "./routes/admin";
import { 
  createCheckoutSession, 
  handleWebhook, 
  getOrderHistory,
  getOrderById
} from "./routes/payments";
import {
  createTicket,
  getUserTickets,
  getTicketById,
  updateTicketStatus,
  getAllTickets,
  respondToTicket
} from "./routes/support";
import { authenticateToken, requireAdmin } from "./middleware/auth";
import { upload } from "./config/cloudinary";

export function createServer() {
  const app = express();

  // Connect to MongoDB
  connectDB();

  // Middleware
  app.use(cors());
  
  // Stripe webhook needs raw body, handle it specifically BEFORE express.json()
  app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), handleWebhook);
  
  // Standard JSON parsing for all other routes
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Demo route (existing)
  app.get("/api/demo", handleDemo);

  // Public asset routes
  app.get("/api/assets", getAssets);
  app.get("/api/assets/featured", getFeaturedAssets);
  app.get("/api/assets/trending", getTrendingAssets);
  app.get("/api/assets/bestselling", getBestSellingAssets);
  app.get("/api/assets/free", getFreeAssets);
  app.get("/api/assets/:id", getAssetById);
  app.get("/api/categories", getCategories);

  // Authentication routes
  app.post("/api/auth/login", login);
  app.post("/api/auth/register", register);
  app.get("/api/auth/profile", authenticateToken, getProfile);
  app.put("/api/auth/profile", authenticateToken, updateProfile);
  app.post("/api/auth/favorites", authenticateToken, addToFavorites);
  app.delete("/api/auth/favorites/:assetId", authenticateToken, removeFromFavorites);

  // Protected asset routes
  app.post("/api/assets/:id/download", authenticateToken, downloadAsset);

  // Support routes (protected - registered users only)
  app.post("/api/support/tickets", authenticateToken, createTicket);
  app.get("/api/support/tickets", authenticateToken, getUserTickets);
  app.get("/api/support/tickets/:id", authenticateToken, getTicketById);
  app.put("/api/support/tickets/:id", authenticateToken, updateTicketStatus);

  // Admin support routes
  app.get("/api/admin/support/tickets", authenticateToken, requireAdmin, getAllTickets);
  app.put("/api/admin/support/tickets/:id/respond", authenticateToken, requireAdmin, respondToTicket);

  // Admin asset management routes
  app.post("/api/admin/assets", authenticateToken, requireAdmin, 
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'asset', maxCount: 1 }]), 
    uploadAsset
  );
  app.put("/api/admin/assets/:id", authenticateToken, requireAdmin, updateAsset);
  app.delete("/api/admin/assets/:id", authenticateToken, requireAdmin, deleteAsset);
  app.get("/api/admin/assets", authenticateToken, requireAdmin, getAllAssets);

  // Admin analytics and reports
  app.get("/api/admin/analytics", authenticateToken, requireAdmin, getAnalytics);
  app.get("/api/admin/sales-report", authenticateToken, requireAdmin, getSalesReport);
  app.get("/api/admin/users", authenticateToken, requireAdmin, getAllUsers);
  app.get("/api/admin/orders", authenticateToken, requireAdmin, getAllOrders);

  // Admin blog management
  app.post("/api/admin/blogs", authenticateToken, requireAdmin,
    upload.fields([{ name: 'featuredImage', maxCount: 1 }]),
    createBlog
  );
  app.put("/api/admin/blogs/:id", authenticateToken, requireAdmin, updateBlog);
  app.delete("/api/admin/blogs/:id", authenticateToken, requireAdmin, deleteBlog);
  app.get("/api/admin/blogs", authenticateToken, requireAdmin, getAllBlogs);

  // Admin portfolio management
  app.post("/api/admin/portfolios", authenticateToken, requireAdmin,
    upload.fields([{ name: 'image', maxCount: 1 }]),
    createPortfolio
  );
  app.put("/api/admin/portfolios/:id", authenticateToken, requireAdmin, updatePortfolio);
  app.delete("/api/admin/portfolios/:id", authenticateToken, requireAdmin, deletePortfolio);
  app.get("/api/admin/portfolios", authenticateToken, requireAdmin, getAllPortfolios);

  // Admin services management
  app.post("/api/admin/services", authenticateToken, requireAdmin,
    upload.fields([{ name: 'image', maxCount: 1 }]),
    createService
  );
  app.put("/api/admin/services/:id", authenticateToken, requireAdmin, updateService);
  app.delete("/api/admin/services/:id", authenticateToken, requireAdmin, deleteService);
  app.get("/api/admin/services", authenticateToken, requireAdmin, getAllServices);

  // Payment routes
  app.post("/api/payments/checkout", authenticateToken, createCheckoutSession);
  // Note: webhook route is handled above before express.json()
  app.get("/api/payments/orders", authenticateToken, getOrderHistory);
  app.get("/api/payments/orders/:id", authenticateToken, getOrderById);

  return app;
}
