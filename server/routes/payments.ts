import { RequestHandler } from "express";
import mongoose from 'mongoose';
import Stripe from "stripe";
import { Asset } from "../models/Asset";
import { Order } from "../models/Order";
import { User } from "../models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_your_stripe_secret_key', {
  apiVersion: '2024-11-20.acacia'
});

export const createCheckoutSession: RequestHandler = async (req, res) => {
  try {
    const { assetIds } = req.body;
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: "Database unavailable",
        message: "Checkout requires database connection. Demo mode doesn't support payments."
      });
    }

    if (!assetIds || !Array.isArray(assetIds) || assetIds.length === 0) {
      res.status(400).json({ error: "Asset IDs required" });
      return;
    }

    // Get asset details
    const assets = await Asset.find({ _id: { $in: assetIds } });
    
    if (assets.length !== assetIds.length) {
      res.status(400).json({ error: "Some assets not found" });
      return;
    }

    // Check if user already owns any premium assets
    const userDoc = await User.findById(user._id);
    const premiumAssets = assets.filter(asset => asset.isPremium);
    const alreadyOwned = premiumAssets.filter(asset => 
      userDoc?.purchasedAssets.includes(asset._id)
    );

    if (alreadyOwned.length > 0) {
      res.status(400).json({ 
        error: `You already own: ${alreadyOwned.map(a => a.title).join(', ')}` 
      });
      return;
    }

    // Create order
    const orderAssets = assets.map(asset => ({
      assetId: asset._id,
      price: asset.price,
      title: asset.title
    }));

    const total = assets.reduce((sum, asset) => sum + asset.price, 0);

    if (total === 0) {
      // Free assets - no payment needed
      const order = new Order({
        userId: user._id,
        assets: orderAssets,
        total: 0,
        status: 'completed'
      });

      await order.save();

      // Add free assets to user's purchased assets
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { purchasedAssets: { $each: assetIds } }
      });

      res.json({
        success: true,
        message: "Free assets added to your account",
        orderId: order._id
      });
      return;
    }

    const order = new Order({
      userId: user._id,
      assets: orderAssets,
      total,
      status: 'pending'
    });

    await order.save();

    // Create Stripe checkout session
    const lineItems = assets.map(asset => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: asset.title,
          description: asset.description,
          images: [asset.image]
        },
        unit_amount: Math.round(asset.price * 100) // Stripe expects cents
      },
      quantity: 1
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/dashboard?payment=success&order=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard?payment=cancelled`,
      metadata: {
        orderId: order._id.toString(),
        userId: user._id.toString()
      }
    });

    // Update order with session ID
    order.stripeSessionId = session.id;
    await order.save();

    res.json({
      sessionUrl: session.url,
      sessionId: session.id,
      orderId: order._id
    });
  } catch (error) {
    console.error("Create checkout session error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleWebhook: RequestHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Stripe webhook secret not configured');
    res.status(400).json({ error: 'Webhook secret not configured' });
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    res.status(400).json({ error: 'Invalid signature' });
    return;
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        const userId = session.metadata?.userId;

        if (orderId && userId) {
          // Update order status
          const order = await Order.findByIdAndUpdate(
            orderId,
            { 
              status: 'completed',
              stripePaymentIntentId: session.payment_intent as string
            },
            { new: true }
          );

          if (order) {
            // Add purchased assets to user's account
            const assetIds = order.assets.map(asset => asset.assetId);
            await User.findByIdAndUpdate(userId, {
              $addToSet: { purchasedAssets: { $each: assetIds } }
            });

            console.log(`Order ${orderId} completed for user ${userId}`);
          }
        }
        break;

      case 'checkout.session.expired':
      case 'payment_intent.payment_failed':
        const failedSession = event.data.object as Stripe.Checkout.Session;
        const failedOrderId = failedSession.metadata?.orderId;

        if (failedOrderId) {
          await Order.findByIdAndUpdate(failedOrderId, {
            status: 'failed'
          });
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
};

export const getOrderHistory: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      // Return empty orders for demo mode
      return res.json({ orders: [] });
    }

    const orders = await Order.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .populate('assets.assetId', 'title image');

    res.json({ orders });
  } catch (error) {
    console.error("Get order history error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrderById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(404).json({ error: "Order not found in demo mode" });
    }

    const order = await Order.findOne({ _id: id, userId: user._id })
      .populate('assets.assetId', 'title image description fileUrl');

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json({ order });
  } catch (error) {
    console.error("Get order by ID error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
