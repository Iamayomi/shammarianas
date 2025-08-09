import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  assets: {
    assetId: mongoose.Types.ObjectId;
    price: number;
    title: string;
  }[];
  total: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assets: [{
    assetId: {
      type: Schema.Types.ObjectId,
      ref: 'Asset',
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    title: {
      type: String,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  stripeSessionId: {
    type: String
  },
  stripePaymentIntentId: {
    type: String
  }
}, {
  timestamps: true
});

OrderSchema.index({ userId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
