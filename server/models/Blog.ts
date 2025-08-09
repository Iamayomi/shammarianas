import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: mongoose.Types.ObjectId;
  authorName: string;
  slug: string;
  tags: string[];
  status: 'draft' | 'published';
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  featuredImage: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Only add indexes once - remove duplicate index definitions
BlogSchema.index({ title: 'text', content: 'text', tags: 'text' });
BlogSchema.index({ status: 1 });
BlogSchema.index({ createdAt: -1 });

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
