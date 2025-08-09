import { ObjectId } from 'mongodb';

// Demo asset data
export const demoAssets = [
  {
    _id: new ObjectId(),
    title: 'Modern React Dashboard',
    description: 'A complete admin dashboard built with React, TypeScript, and Tailwind CSS. Features charts, tables, forms, and a responsive design.',
    category: 'Code',
    price: 29,
    originalPrice: 49,
    rating: 4.9,
    downloads: 1240,
    image: '/placeholder.svg',
    isPremium: true,
    isTrending: true,
    isFeatured: true,
    tags: ['React', 'Dashboard', 'Admin Panel', 'TypeScript'],
    author: 'demo-admin-id',
    authorName: 'Demo Admin',
    type: 'premium' as const,
    fileSize: '2.5 MB',
    fileType: 'application/zip',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId(),
    title: 'Social Media Graphics Pack',
    description: 'A collection of 50+ social media graphics templates for Instagram, Facebook, and Twitter. Fully customizable in Figma.',
    category: 'Graphics',
    price: 0,
    rating: 4.7,
    downloads: 2100,
    image: '/placeholder.svg',
    isPremium: false,
    isBestSelling: true,
    isFeatured: true,
    tags: ['Instagram', 'Facebook', 'Twitter', 'Figma'],
    author: 'demo-admin-id',
    authorName: 'Demo Admin',
    type: 'free' as const,
    fileSize: '15 MB',
    fileType: 'application/zip',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId(),
    title: 'Music Player App UI',
    description: 'Beautiful music player app UI kit with dark and light themes. Perfect for iOS and Android apps.',
    category: 'Mobile Apps',
    price: 39,
    rating: 4.8,
    downloads: 876,
    image: '/placeholder.svg',
    isPremium: true,
    isFeatured: true,
    tags: ['Mobile', 'Music', 'iOS', 'Android', 'UI Kit'],
    author: 'demo-admin-id',
    authorName: 'Demo Admin',
    type: 'premium' as const,
    fileSize: '8.2 MB',
    fileType: 'application/zip',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId(),
    title: 'Corporate WordPress Theme',
    description: 'Professional WordPress theme for corporate websites. Includes page builder compatibility and SEO optimization.',
    category: 'Themes',
    price: 25,
    rating: 4.6,
    downloads: 1456,
    image: '/placeholder.svg',
    isPremium: true,
    tags: ['WordPress', 'Corporate', 'Business', 'SEO'],
    author: 'demo-admin-id',
    authorName: 'Demo Admin',
    type: 'premium' as const,
    fileSize: '12 MB',
    fileType: 'application/zip',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId(),
    title: '3D Character Models',
    description: 'High-quality 3D character models for games and animations. Includes rigged and textured models.',
    category: '3D Assets',
    price: 15,
    rating: 4.9,
    downloads: 543,
    image: '/placeholder.svg',
    isPremium: true,
    isTrending: true,
    tags: ['3D', 'Character', 'Animation', 'Game'],
    author: 'demo-admin-id',
    authorName: 'Demo Admin',
    type: 'premium' as const,
    fileSize: '25 MB',
    fileType: 'application/zip',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId(),
    title: 'JavaScript Animations Library',
    description: 'Lightweight JavaScript library for smooth animations. Easy to use with excellent performance.',
    category: 'Code',
    price: 0,
    rating: 4.8,
    downloads: 3200,
    image: '/placeholder.svg',
    isPremium: false,
    isFeatured: true,
    tags: ['JavaScript', 'Animation', 'Library', 'Performance'],
    author: 'demo-admin-id',
    authorName: 'Demo Admin',
    type: 'free' as const,
    fileSize: '500 KB',
    fileType: 'application/javascript',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId(),
    title: 'E-commerce Website Template',
    description: 'Complete e-commerce website template with shopping cart, product pages, and checkout flow.',
    category: 'Templates',
    price: 45,
    rating: 4.7,
    downloads: 892,
    image: '/placeholder.svg',
    isPremium: true,
    isBestSelling: true,
    tags: ['E-commerce', 'Shopping', 'Website', 'HTML'],
    author: 'demo-admin-id',
    authorName: 'Demo Admin',
    type: 'premium' as const,
    fileSize: '18 MB',
    fileType: 'application/zip',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId(),
    title: 'Icon Pack - 500 Icons',
    description: 'Comprehensive icon pack with 500+ icons in multiple formats (SVG, PNG, ICO).',
    category: 'Graphics',
    price: 12,
    rating: 4.5,
    downloads: 1678,
    image: '/placeholder.svg',
    isPremium: true,
    tags: ['Icons', 'SVG', 'PNG', 'Design'],
    author: 'demo-admin-id',
    authorName: 'Demo Admin',
    type: 'premium' as const,
    fileSize: '5 MB',
    fileType: 'application/zip',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Demo categories
export const demoCategories = [
  'Code',
  'Video',
  'Audio',
  'Plugins',
  'Graphics',
  'Mobile Apps',
  'Themes',
  '3D Assets',
  'Templates'
];

// Demo users
export const demoUsers = {
  'admin@demo.com': {
    _id: 'demo-admin-id',
    email: 'admin@demo.com',
    name: 'Demo Admin',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    favorites: [],
    downloads: [],
    purchasedAssets: []
  },
  'user@demo.com': {
    _id: 'demo-user-id',
    email: 'user@demo.com',
    name: 'Demo User',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    favorites: [demoAssets[0]._id, demoAssets[1]._id, demoAssets[2]._id],
    downloads: [demoAssets[1]._id, demoAssets[5]._id],
    purchasedAssets: [demoAssets[0]._id, demoAssets[2]._id]
  }
};

// Demo orders
export const demoOrders = [
  {
    _id: new ObjectId(),
    userId: 'demo-user-id',
    assets: [
      {
        assetId: demoAssets[0]._id,
        price: demoAssets[0].price,
        title: demoAssets[0].title
      },
      {
        assetId: demoAssets[2]._id,
        price: demoAssets[2].price,
        title: demoAssets[2].title
      }
    ],
    total: demoAssets[0].price + demoAssets[2].price,
    status: 'completed',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Demo support tickets
export const demoSupportTickets = [
  {
    _id: 'demo-ticket-1',
    userId: 'demo-user-id',
    userEmail: 'user@demo.com',
    userName: 'Demo User',
    subject: 'Unable to download purchased asset',
    message: 'I purchased the Modern React Dashboard but the download link is not working. Could you please help me with this issue?',
    category: 'technical',
    priority: 'high',
    status: 'open',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'demo-ticket-2',
    userId: 'demo-user-id',
    userEmail: 'user@demo.com',
    userName: 'Demo User',
    subject: 'Question about licensing',
    message: 'Hi, I want to use the Social Media Graphics Pack for my client projects. What are the licensing terms for commercial use?',
    category: 'general',
    priority: 'medium',
    status: 'resolved',
    adminResponse: 'Hello! Thank you for your question. Our free assets come with a standard commercial license that allows you to use them in client projects. You can find the full license terms in the asset download folder. Feel free to reach out if you have any other questions!',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date()
  },
  {
    _id: 'demo-ticket-3',
    userId: 'demo-user-id',
    userEmail: 'user@demo.com',
    userName: 'Demo User',
    subject: 'Payment not processed',
    message: 'I tried to purchase the Music Player App UI but my payment failed. My card was charged but I didn\'t receive access to the download. Order ID: #12345',
    category: 'billing',
    priority: 'urgent',
    status: 'in-progress',
    adminResponse: 'We are looking into this payment issue. Our billing team has been notified and will resolve this within 24 hours. You will receive an email confirmation once access is restored.',
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date()
  }
];

// Demo analytics
export const demoAnalytics = {
  totalAssets: demoAssets.length,
  totalUsers: Object.keys(demoUsers).length,
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

// Demo portfolio items
export const demoPortfolios = [
  {
    _id: new ObjectId(),
    title: 'E-commerce Platform Redesign',
    description: 'Complete redesign of a major e-commerce platform, focusing on user experience and conversion optimization.',
    category: 'Web Development',
    image: '/placeholder.svg',
    projectUrl: 'https://example.com',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    featured: true,
    status: 'published',
    author: 'demo-admin-id',
    authorName: 'Demo Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId(),
    title: 'Mobile Banking App',
    description: 'Secure and intuitive mobile banking application with biometric authentication and real-time transactions.',
    category: 'Mobile App',
    image: '/placeholder.svg',
    projectUrl: 'https://example.com',
    technologies: ['React Native', 'Firebase', 'Biometric SDK'],
    featured: true,
    status: 'published',
    author: 'demo-admin-id',
    authorName: 'Demo Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Demo services
export const demoServices = [
  {
    _id: new ObjectId(),
    title: 'Custom Web Development',
    description: 'Full-stack web development services using modern technologies like React, Node.js, and cloud platforms.',
    shortDescription: 'Professional web development services tailored to your business needs.',
    icon: 'code',
    image: '/placeholder.svg',
    features: ['Custom Design', 'Responsive Layout', 'SEO Optimization', 'Performance Tuning', 'Maintenance'],
    pricing: {
      basic: 2500,
      pro: 5000,
      enterprise: 10000
    },
    featured: true,
    status: 'published',
    author: 'demo-admin-id',
    authorName: 'Demo Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Demo blog posts
export const demoBlogs = [
  {
    _id: new ObjectId(),
    title: 'The Future of Web Development in 2024',
    content: 'Exploring the latest trends and technologies that are shaping the future of web development...',
    excerpt: 'Discover the key trends and technologies that will define web development in 2024.',
    slug: 'future-of-web-development-2024',
    featuredImage: '/placeholder.svg',
    tags: ['Web Development', 'Technology', 'Trends'],
    status: 'published',
    views: 1250,
    author: 'demo-admin-id',
    authorName: 'Demo Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Helper function to get demo data based on user role
export const getDemoData = (userRole: string = 'user') => {
  return {
    assets: demoAssets,
    categories: demoCategories,
    users: Object.values(demoUsers),
    orders: demoOrders,
    supportTickets: demoSupportTickets,
    analytics: demoAnalytics,
    portfolios: demoPortfolios,
    services: demoServices,
    blogs: demoBlogs
  };
};
