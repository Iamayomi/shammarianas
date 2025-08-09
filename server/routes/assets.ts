import { RequestHandler } from "express";
import mongoose from 'mongoose';
import { Asset } from "../models/Asset";
import { User } from "../models/User";
import { demoAssets, demoCategories } from "../data/demoData";

export const getAssets: RequestHandler = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      // Return demo data
      const {
        category,
        search,
        priceFilter,
        sortBy = 'popular',
        page = 1,
        limit = 12
      } = req.query;

      let filteredAssets = [...demoAssets];

      // Apply filters to demo data
      if (category && category !== 'All Categories') {
        filteredAssets = filteredAssets.filter(asset => asset.category === category);
      }

      if (search) {
        const searchTerm = (search as string).toLowerCase();
        filteredAssets = filteredAssets.filter(asset => 
          asset.title.toLowerCase().includes(searchTerm) ||
          asset.description.toLowerCase().includes(searchTerm)
        );
      }

      if (priceFilter === 'free') {
        filteredAssets = filteredAssets.filter(asset => asset.price === 0);
      } else if (priceFilter === 'paid') {
        filteredAssets = filteredAssets.filter(asset => asset.price > 0);
      }

      return res.json({
        assets: filteredAssets,
        total: filteredAssets.length,
        page: Number(page),
        pages: Math.ceil(filteredAssets.length / Number(limit))
      });
    }

    // Normal database operation
    const {
      category,
      search,
      priceFilter,
      sortBy = 'popular',
      page = 1,
      limit = 12
    } = req.query;

    const query: any = {};
    
    if (category && category !== 'All Categories') {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search as string };
    }

    if (priceFilter === 'free') {
      query.price = 0;
    } else if (priceFilter === 'paid') {
      query.price = { $gt: 0 };
    }

    let sortOptions: any = {};
    switch (sortBy) {
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'price-low':
        sortOptions = { price: 1 };
        break;
      case 'price-high':
        sortOptions = { price: -1 };
        break;
      case 'rating':
        sortOptions = { rating: -1 };
        break;
      default:
        sortOptions = { downloads: -1 };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const assets = await Asset.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .populate('author', 'name');

    const total = await Asset.countDocuments(query);

    res.json({
      assets,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error("Get assets error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAssetById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      const asset = demoAssets.find(a => a._id.toString() === id);
      
      if (!asset) {
        return res.status(404).json({ error: "Asset not found" });
      }

      return res.json({ asset });
    }
    
    const asset = await Asset.findById(id).populate('author', 'name');
    
    if (!asset) {
      res.status(404).json({ error: "Asset not found" });
      return;
    }

    res.json({ asset });
  } catch (error) {
    console.error("Get asset by ID error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFeaturedAssets: RequestHandler = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      const featuredAssets = demoAssets.filter(asset => asset.isFeatured);
      return res.json({ assets: featuredAssets });
    }

    const assets = await Asset.find({ isFeatured: true })
      .limit(8)
      .populate('author', 'name');

    res.json({ assets });
  } catch (error) {
    console.error("Get featured assets error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTrendingAssets: RequestHandler = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      const trendingAssets = demoAssets.filter(asset => asset.isTrending);
      return res.json({ assets: trendingAssets });
    }

    const assets = await Asset.find({ isTrending: true })
      .limit(8)
      .populate('author', 'name');

    res.json({ assets });
  } catch (error) {
    console.error("Get trending assets error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBestSellingAssets: RequestHandler = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      const bestSellingAssets = demoAssets.filter(asset => asset.isBestSelling);
      return res.json({ assets: bestSellingAssets });
    }

    const assets = await Asset.find({ isBestSelling: true })
      .limit(8)
      .populate('author', 'name');

    res.json({ assets });
  } catch (error) {
    console.error("Get best selling assets error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFreeAssets: RequestHandler = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      const freeAssets = demoAssets.filter(asset => asset.price === 0);
      return res.json({ assets: freeAssets });
    }

    const assets = await Asset.find({ price: 0 })
      .sort({ downloads: -1 })
      .limit(8)
      .populate('author', 'name');

    res.json({ assets });
  } catch (error) {
    console.error("Get free assets error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategories: RequestHandler = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({ categories: demoCategories });
    }

    const categories = await Asset.distinct('category');
    res.json({ categories });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const downloadAsset: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        downloadUrl: "#demo-download",
        message: "Demo download - database required for actual downloads"
      });
    }

    const asset = await Asset.findById(id);
    if (!asset) {
      res.status(404).json({ error: "Asset not found" });
      return;
    }

    // Check if user owns the asset (for premium assets)
    if (asset.isPremium) {
      const userDoc = await User.findById(user._id);
      if (!userDoc?.purchasedAssets.includes(asset._id)) {
        res.status(403).json({ error: "Asset not purchased" });
        return;
      }
    }

    // Increment download count
    await Asset.findByIdAndUpdate(id, { $inc: { downloads: 1 } });

    // Add to user's downloads
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { downloads: asset._id }
    });

    res.json({
      downloadUrl: asset.fileUrl || "#",
      message: "Download started"
    });
  } catch (error) {
    console.error("Download asset error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
