import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://E-commerceNG:Ade678@cluster0.8114dlp.mongodb.net/shammarians_new?retryWrites=true&w=majority';
    
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed, running in demo mode without database');
    console.warn('📝 Note: Some features may not work without database connection');
    // Don't exit the process, let the app continue without database
  }
};

export default connectDB;
