const express = require("express");
const router = express.Router();

// GET /api/support - Get support information
router.get("/", (req, res) => {
  const { userId, ticketId } = req.query;

  // Mock support data
  const supportData = {
    userId: userId || "user_123",
    ticketId: ticketId || "ticket_456",
    supportChannels: [
      {
        type: "chat",
        name: "Live Chat",
        available: true,
        waitTime: "2 minutes",
      },
      {
        type: "email",
        name: "Email Support",
        available: true,
        responseTime: "24 hours",
      },
      {
        type: "phone",
        name: "Phone Support",
        available: true,
        number: "1-800-SUPPORT",
      },
    ],
    faq: [
      {
        id: 1,
        question: "How do I track my order?",
        answer:
          "You can track your order using the tracking number provided in your confirmation email.",
      },
      {
        id: 2,
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items.",
      },
    ],
  };

  res.json({
    success: true,
    message: "Support information retrieved",
    support: supportData,
  });
});

// POST /api/support - Create support ticket
router.post("/", (req, res) => {
  const { userId, subject, description, priority, category } = req.body;

  if (!userId || !subject || !description) {
    return res.status(400).json({
      success: false,
      message: "User ID, subject, and description are required",
    });
  }

  const ticket = {
    id: `ticket_${Date.now()}`,
    userId: userId,
    subject: subject,
    description: description,
    priority: priority || "medium",
    category: category || "general",
    status: "open",
    createdAt: new Date().toISOString(),
    assignedTo: null,
    estimatedResponse: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
  };

  res.json({
    success: true,
    message: "Support ticket created successfully",
    ticket: ticket,
  });
});

// GET /api/support/:ticketId - Get specific ticket details
router.get("/:ticketId", (req, res) => {
  const { ticketId } = req.params;

  const ticketDetails = {
    id: ticketId,
    userId: "user_123",
    subject: "Order delivery issue",
    description:
      "My order was supposed to be delivered yesterday but it hasn't arrived yet.",
    priority: "high",
    category: "delivery",
    status: "in_progress",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    assignedTo: "support_agent_001",
    estimatedResponse: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours
    messages: [
      {
        id: 1,
        sender: "user_123",
        message:
          "My order was supposed to be delivered yesterday but it hasn't arrived yet.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        sender: "support_agent_001",
        message:
          "I apologize for the inconvenience. Let me check the status of your order.",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
    ],
  };

  res.json({
    success: true,
    message: "Ticket details retrieved",
    ticket: ticketDetails,
  });
});

// PUT /api/support/:ticketId - Update ticket
router.put("/:ticketId", (req, res) => {
  const { ticketId } = req.params;
  const { status, priority, assignedTo } = req.body;

  res.json({
    success: true,
    message: "Ticket updated successfully",
    ticketId: ticketId,
    updatedStatus: status,
    updatedPriority: priority,
    updatedAssignedTo: assignedTo,
    updatedAt: new Date().toISOString(),
  });
});

// POST /api/support/:ticketId/message - Add message to ticket
router.post("/:ticketId/message", (req, res) => {
  const { ticketId } = req.params;
  const { sender, message } = req.body;

  if (!sender || !message) {
    return res.status(400).json({
      success: false,
      message: "Sender and message are required",
    });
  }

  const newMessage = {
    id: `msg_${Date.now()}`,
    ticketId: ticketId,
    sender: sender,
    message: message,
    timestamp: new Date().toISOString(),
  };

  res.json({
    success: true,
    message: "Message added to ticket successfully",
    message: newMessage,
  });
});

// DELETE /api/support/:ticketId - Close ticket
router.delete("/:ticketId", (req, res) => {
  const { ticketId } = req.params;

  res.json({
    success: true,
    message: "Ticket closed successfully",
    ticketId: ticketId,
    closedAt: new Date().toISOString(),
  });
});

module.exports = router;
