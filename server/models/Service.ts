import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  image?: string;
  features: string[];
  pricing?: {
    basic?: number;
    pro?: number;
    enterprise?: number;
  };
  featured: boolean;
  status: 'draft' | 'published';
  author: mongoose.Types.ObjectId;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  icon: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  features: [{
    type: String,
    trim: true
  }],
  pricing: {
    basic: { type: Number, min: 0 },
    pro: { type: Number, min: 0 },
    enterprise: { type: Number, min: 0 }
  },
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

ServiceSchema.index({ status: 1 });
ServiceSchema.index({ featured: 1 });
ServiceSchema.index({ createdAt: -1 });

export const Service = mongoose.model<IService>('Service', ServiceSchema);
