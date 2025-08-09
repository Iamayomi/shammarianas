import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolio extends Document {
  title: string;
  description: string;
  category: string;
  image: string;
  projectUrl?: string;
  technologies: string[];
  featured: boolean;
  status: 'draft' | 'published';
  author: mongoose.Types.ObjectId;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
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
    enum: ['Web Development', 'Mobile App', 'UI/UX Design', 'Branding', 'E-commerce', 'Other']
  },
  image: {
    type: String,
    required: true
  },
  projectUrl: {
    type: String,
    trim: true
  },
  technologies: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

PortfolioSchema.index({ status: 1 });
PortfolioSchema.index({ featured: 1 });
PortfolioSchema.index({ createdAt: -1 });

export const Portfolio = mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
