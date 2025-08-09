import { RequestHandler } from "express";
import mongoose from 'mongoose';
import { SupportTicket } from "../models/SupportTicket";
import { z } from "zod";

const createTicketSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message too long"),
  category: z.enum(['technical', 'billing', 'general', 'bug-report', 'feature-request']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional()
});

export const createTicket: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: "Database unavailable",
        message: "Support tickets require database connection. Demo mode doesn't support ticket creation."
      });
    }

    // Check if user ID is a valid ObjectId for demo users
    if (!mongoose.Types.ObjectId.isValid(user._id)) {
      return res.status(400).json({
        error: "Invalid user ID",
        message: "Demo users cannot create support tickets."
      });
    }

    const { subject, message, category, priority } = createTicketSchema.parse(req.body);

    const ticket = new SupportTicket({
      userId: user._id,
      userEmail: user.email,
      userName: user.name,
      subject,
      message,
      category,
      priority: priority || 'medium'
    });

    await ticket.save();

    res.status(201).json({
      message: "Support ticket created successfully",
      ticket
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    console.error("Create ticket error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserTickets: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      // Return demo tickets for demo mode
      const demoTickets = [
        {
          _id: 'demo-ticket-1',
          subject: 'Demo Support Ticket',
          message: 'This is a demo support ticket for testing purposes.',
          category: 'general',
          priority: 'medium',
          status: 'open',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      return res.json({
        tickets: demoTickets,
        total: demoTickets.length,
        page: 1,
        pages: 1
      });
    }

    // Check if user ID is a valid ObjectId for demo users
    if (!mongoose.Types.ObjectId.isValid(user._id)) {
      return res.json({
        tickets: [],
        total: 0,
        page: 1,
        pages: 0
      });
    }

    const { page = 1, limit = 10, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query: any = { userId: user._id };
    if (status && status !== 'all') {
      query.status = status;
    }

    const tickets = await SupportTicket.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await SupportTicket.countDocuments(query);

    res.json({
      tickets,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error("Get user tickets error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTicketById: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    if (!user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(404).json({ error: "Ticket not found in demo mode" });
    }

    // Check if user ID is a valid ObjectId for demo users
    if (!mongoose.Types.ObjectId.isValid(user._id)) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const ticket = await SupportTicket.findOne({
      _id: id,
      userId: user._id
    });

    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    res.json({ ticket });
  } catch (error) {
    console.error("Get ticket by ID error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTicketStatus: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { status } = req.body;

    if (!user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: "Database unavailable",
        message: "Ticket updates require database connection. Demo mode doesn't support ticket updates."
      });
    }

    // Check if user ID is a valid ObjectId for demo users
    if (!mongoose.Types.ObjectId.isValid(user._id)) {
      return res.status(400).json({
        error: "Invalid user ID",
        message: "Demo users cannot update support tickets."
      });
    }

    // Only allow users to close their own tickets
    if (status !== 'closed') {
      res.status(403).json({ error: "Users can only close tickets" });
      return;
    }

    const ticket = await SupportTicket.findOneAndUpdate(
      { _id: id, userId: user._id },
      { status },
      { new: true }
    );

    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    res.json({
      message: "Ticket updated successfully",
      ticket
    });
  } catch (error) {
    console.error("Update ticket status error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin routes
export const getAllTickets: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      // Return demo tickets for admin in demo mode
      const demoTickets = [
        {
          _id: 'demo-ticket-1',
          subject: 'Demo Support Ticket 1',
          message: 'This is a demo support ticket for testing admin functionality.',
          category: 'general',
          priority: 'medium',
          status: 'open',
          userEmail: 'user@demo.com',
          userName: 'Demo User',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'demo-ticket-2',
          subject: 'Demo Support Ticket 2',
          message: 'Another demo support ticket with different status.',
          category: 'technical',
          priority: 'high',
          status: 'in-progress',
          userEmail: 'user@demo.com',
          userName: 'Demo User',
          adminResponse: 'Working on this issue.',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      return res.json({
        tickets: demoTickets,
        total: demoTickets.length,
        page: 1,
        pages: 1
      });
    }

    const { page = 1, limit = 20, status, category } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (category && category !== 'all') {
      query.category = category;
    }

    const tickets = await SupportTicket.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('userId', 'name email');

    const total = await SupportTicket.countDocuments(query);

    res.json({
      tickets,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error("Get all tickets error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const respondToTicket: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { response, status } = req.body;
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    const ticket = await SupportTicket.findByIdAndUpdate(
      id,
      { 
        adminResponse: response,
        adminId: user._id,
        status: status || 'in-progress'
      },
      { new: true }
    );

    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    res.json({
      message: "Response sent successfully",
      ticket
    });
  } catch (error) {
    console.error("Respond to ticket error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
