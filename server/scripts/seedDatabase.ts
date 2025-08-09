import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Asset } from '../models/Asset';
import { Order } from '../models/Order';
import { SupportTicket } from '../models/SupportTicket';
import { Portfolio } from '../models/Portfolio';
import { Service } from '../models/Service';
import { Blog } from '../models/Blog';
import connectDB from '../config/database';

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Asset.deleteMany({});
    await Order.deleteMany({});
    await SupportTicket.deleteMany({});
    await Portfolio.deleteMany({});
    await Service.deleteMany({});
    await Blog.deleteMany({});

    console.log('Cleared existing data');

    // Create demo users
    const adminUser = new User({
      email: 'admin@demo.com',
      password: 'password123',
      name: 'Admin User',
      role: 'admin'
    });

    const regularUser = new User({
      email: 'user@demo.com',
      password: 'password123',
      name: 'Regular User',
      role: 'user'
    });

    await adminUser.save();
    await regularUser.save();

    console.log('Created demo users');

    // Create demo assets
    const demoAssets = [
      {
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
        author: adminUser._id,
        authorName: adminUser.name,
        type: 'premium' as const,
        fileSize: '2.5 MB',
        fileType: 'application/zip'
      },
      {
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
        author: adminUser._id,
        authorName: adminUser.name,
        type: 'free' as const,
        fileSize: '15 MB',
        fileType: 'application/zip'
      },
      {
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
        author: adminUser._id,
        authorName: adminUser.name,
        type: 'premium' as const,
        fileSize: '8.2 MB',
        fileType: 'application/zip'
      },
      {
        title: 'Corporate WordPress Theme',
        description: 'Professional WordPress theme for corporate websites. Includes page builder compatibility and SEO optimization.',
        category: 'Themes',
        price: 25,
        rating: 4.6,
        downloads: 1456,
        image: '/placeholder.svg',
        isPremium: true,
        tags: ['WordPress', 'Corporate', 'Business', 'SEO'],
        author: adminUser._id,
        authorName: adminUser.name,
        type: 'premium' as const,
        fileSize: '12 MB',
        fileType: 'application/zip'
      },
      {
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
        author: adminUser._id,
        authorName: adminUser.name,
        type: 'premium' as const,
        fileSize: '25 MB',
        fileType: 'application/zip'
      },
      {
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
        author: adminUser._id,
        authorName: adminUser.name,
        type: 'free' as const,
        fileSize: '500 KB',
        fileType: 'application/javascript'
      },
      {
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
        author: adminUser._id,
        authorName: adminUser.name,
        type: 'premium' as const,
        fileSize: '18 MB',
        fileType: 'application/zip'
      },
      {
        title: 'Icon Pack - 500 Icons',
        description: 'Comprehensive icon pack with 500+ icons in multiple formats (SVG, PNG, ICO).',
        category: 'Graphics',
        price: 12,
        rating: 4.5,
        downloads: 1678,
        image: '/placeholder.svg',
        isPremium: true,
        tags: ['Icons', 'SVG', 'PNG', 'Design'],
        author: adminUser._id,
        authorName: adminUser.name,
        type: 'premium' as const,
        fileSize: '5 MB',
        fileType: 'application/zip'
      }
    ];

    const createdAssets = await Asset.insertMany(demoAssets);
    console.log(`Created ${createdAssets.length} demo assets`);

    // Create demo portfolio items
    const demoPortfolios = [
      {
        title: 'E-commerce Platform Redesign',
        description: 'Complete redesign of a major e-commerce platform, focusing on user experience and conversion optimization.',
        category: 'Web Development',
        image: '/placeholder.svg',
        projectUrl: 'https://example.com',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
        featured: true,
        status: 'published',
        author: adminUser._id,
        authorName: adminUser.name
      },
      {
        title: 'Mobile Banking App',
        description: 'Secure and intuitive mobile banking application with biometric authentication and real-time transactions.',
        category: 'Mobile App',
        image: '/placeholder.svg',
        projectUrl: 'https://example.com',
        technologies: ['React Native', 'Firebase', 'Biometric SDK'],
        featured: true,
        status: 'published',
        author: adminUser._id,
        authorName: adminUser.name
      },
      {
        title: 'Brand Identity Design',
        description: 'Complete brand identity design for a sustainable fashion startup, including logo, color palette, and guidelines.',
        category: 'Branding',
        image: '/placeholder.svg',
        technologies: ['Adobe Illustrator', 'Figma', 'Photoshop'],
        featured: false,
        status: 'published',
        author: adminUser._id,
        authorName: adminUser.name
      }
    ];

    await Portfolio.insertMany(demoPortfolios);
    console.log(`Created ${demoPortfolios.length} demo portfolio items`);

    // Create demo services
    const demoServices = [
      {
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
        author: adminUser._id,
        authorName: adminUser.name
      },
      {
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile app development for iOS and Android platforms.',
        shortDescription: 'Build stunning mobile apps that engage your users.',
        icon: 'smartphone',
        features: ['iOS & Android', 'Cross-platform', 'Push Notifications', 'App Store Submission', 'Analytics'],
        pricing: {
          basic: 5000,
          pro: 8000,
          enterprise: 15000
        },
        featured: true,
        status: 'published',
        author: adminUser._id,
        authorName: adminUser.name
      },
      {
        title: 'UI/UX Design',
        description: 'User-centered design services focusing on creating intuitive and engaging digital experiences.',
        shortDescription: 'Design experiences that users love.',
        icon: 'palette',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
        pricing: {
          basic: 1500,
          pro: 3000,
          enterprise: 6000
        },
        featured: false,
        status: 'published',
        author: adminUser._id,
        authorName: adminUser.name
      }
    ];

    await Service.insertMany(demoServices);
    console.log(`Created ${demoServices.length} demo services`);

    // Create demo blog posts
    const demoBlogs = [
      {
        title: 'The Future of Web Development in 2024',
        content: 'Exploring the latest trends and technologies that are shaping the future of web development...',
        excerpt: 'Discover the key trends and technologies that will define web development in 2024.',
        slug: 'future-of-web-development-2024',
        featuredImage: '/placeholder.svg',
        tags: ['Web Development', 'Technology', 'Trends'],
        status: 'published',
        views: 1250,
        author: adminUser._id,
        authorName: adminUser.name
      },
      {
        title: '10 Essential Tools for Modern Designers',
        content: 'A comprehensive guide to the tools that every modern designer should have in their toolkit...',
        excerpt: 'Essential design tools that will boost your productivity and creativity.',
        slug: 'essential-tools-modern-designers',
        featuredImage: '/placeholder.svg',
        tags: ['Design', 'Tools', 'Productivity'],
        status: 'published',
        views: 890,
        author: adminUser._id,
        authorName: adminUser.name
      }
    ];

    await Blog.insertMany(demoBlogs);
    console.log(`Created ${demoBlogs.length} demo blog posts`);

    // Create a demo order
    const demoOrder = new Order({
      userId: regularUser._id,
      assets: [
        {
          assetId: createdAssets[0]._id,
          price: createdAssets[0].price,
          title: createdAssets[0].title
        },
        {
          assetId: createdAssets[2]._id,
          price: createdAssets[2].price,
          title: createdAssets[2].title
        }
      ],
      total: createdAssets[0].price + createdAssets[2].price,
      status: 'completed'
    });

    await demoOrder.save();

    // Add purchased assets to user
    await User.findByIdAndUpdate(regularUser._id, {
      $addToSet: { 
        purchasedAssets: { $each: [createdAssets[0]._id, createdAssets[2]._id] },
        downloads: { $each: [createdAssets[1]._id, createdAssets[5]._id] },
        favorites: { $each: [createdAssets[0]._id, createdAssets[1]._id, createdAssets[2]._id] }
      }
    });

    // Create demo support tickets
    const demoTickets = [
      {
        userId: regularUser._id,
        userEmail: regularUser.email,
        userName: regularUser.name,
        subject: 'Unable to download purchased asset',
        message: 'I purchased the Modern React Dashboard but the download link is not working. Could you please help me with this issue?',
        category: 'technical',
        priority: 'high',
        status: 'open'
      },
      {
        userId: regularUser._id,
        userEmail: regularUser.email,
        userName: regularUser.name,
        subject: 'Question about licensing',
        message: 'Hi, I want to use the Social Media Graphics Pack for my client projects. What are the licensing terms for commercial use?',
        category: 'general',
        priority: 'medium',
        status: 'resolved',
        adminResponse: 'Hello! Thank you for your question. Our free assets come with a standard commercial license that allows you to use them in client projects. You can find the full license terms in the asset download folder. Feel free to reach out if you have any other questions!'
      },
      {
        userId: regularUser._id,
        userEmail: regularUser.email,
        userName: regularUser.name,
        subject: 'Payment not processed',
        message: 'I tried to purchase the Music Player App UI but my payment failed. My card was charged but I didn\'t receive access to the download. Order ID: #12345',
        category: 'billing',
        priority: 'urgent',
        status: 'in-progress',
        adminResponse: 'We are looking into this payment issue. Our billing team has been notified and will resolve this within 24 hours. You will receive an email confirmation once access is restored.'
      }
    ];

    await SupportTicket.insertMany(demoTickets);
    console.log(`Created ${demoTickets.length} demo support tickets`);

    console.log('Created demo order and updated user data');
    console.log('\n=== DEMO ACCOUNTS ===');
    console.log('Admin: admin@demo.com / password123');
    console.log('User: user@demo.com / password123');
    console.log('=====================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
