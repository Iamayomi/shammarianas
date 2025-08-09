import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const checkDatabaseConnection = (req: Request, res: Response, next: NextFunction) => {
  // Check if MongoDB is connected
  if (mongoose.connection.readyState !== 1) {
    // If the route requires database, return demo data or error
    if (req.path.includes('/api/auth') || req.path.includes('/api/admin') || req.path.includes('/api/support')) {
      return res.status(503).json({ 
        error: 'Database unavailable - running in demo mode',
        message: 'This feature requires a database connection. Please configure MongoDB to use full functionality.'
      });
    }
  }
  next();
};

// Demo data for when database is not available
export const getDemoAssets = () => [
  {
    _id: 'demo1',
    title: 'Modern React Dashboard',
    description: 'A complete admin dashboard built with React, TypeScript, and Tailwind CSS.',
    category: 'Code',
    price: 29,
    rating: 4.9,
    downloads: 1240,
    image: '/placeholder.svg',
    isPremium: true,
    isTrending: true,
    isFeatured: true,
    tags: ['React', 'Dashboard', 'TypeScript'],
    author: 'demo-admin',
    authorName: 'Demo Admin',
    type: 'premium',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'demo2',
    title: 'Social Media Graphics Pack',
    description: 'A collection of 50+ social media graphics templates.',
    category: 'Graphics',
    price: 0,
    rating: 4.7,
    downloads: 2100,
    image: '/placeholder.svg',
    isPremium: false,
    isBestSelling: true,
    isFeatured: true,
    tags: ['Instagram', 'Facebook', 'Twitter'],
    author: 'demo-admin',
    authorName: 'Demo Admin',
    type: 'free',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'demo3',
    title: 'Music Player App UI',
    description: 'Beautiful music player app UI kit with dark and light themes.',
    category: 'Mobile Apps',
    price: 39,
    rating: 4.8,
    downloads: 876,
    image: '/placeholder.svg',
    isPremium: true,
    isFeatured: true,
    tags: ['Mobile', 'Music', 'UI Kit'],
    author: 'demo-admin',
    authorName: 'Demo Admin',
    type: 'premium',
    createdAt: new Date().toISOString()
  }
];

export const getDemoCategories = () => [
  'Code', 'Video', 'Audio', 'Plugins', 'Graphics', 
  'Mobile Apps', 'Themes', '3D Assets', 'Templates'
];
