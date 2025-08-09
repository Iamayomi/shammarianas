import mongoose, { Document, Schema } from 'mongoose';

export interface IAsset extends Document {
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  downloads: number;
  image: string;
  fileUrl?: string;
  isPremium: boolean;
  isTrending: boolean;
  isBestSelling: boolean;
  isFeatured: boolean;
  tags: string[];
  author: mongoose.Types.ObjectId;
  authorName: string;
  type: 'free' | 'premium';
  fileSize?: string;
  fileType?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AssetSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['Code', 'Video', 'Audio', 'Plugins', 'Graphics', 'Mobile Apps', 'Themes', '3D Assets', 'Templates']
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  downloads: {
    type: Number,
    default: 0,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  isBestSelling: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['free', 'premium'],
    required: true
  },
  fileSize: {
    type: String
  },
  fileType: {
    type: String
  }
}, {
  timestamps: true
});

// Index for search functionality
AssetSchema.index({ 
  title: 'text', 
  description: 'text', 
  tags: 'text',
  authorName: 'text'
});

AssetSchema.index({ category: 1 });
AssetSchema.index({ price: 1 });
AssetSchema.index({ rating: -1 });
AssetSchema.index({ downloads: -1 });
AssetSchema.index({ createdAt: -1 });

export const Asset = mongoose.model<IAsset>('Asset', AssetSchema);
