const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const onStatusData = require("../data/status/on_status.json");

// GET /api/status - Get status information
router.get("/", (req, res) => {
  const { orderId, userId, sessionId } = req.query;

  // Mock status data
  const statusData = {
    orderId: orderId || "order_12345",
    userId: userId || "user_67890",
    sessionId: sessionId || "session_99999",
    status: "processing",
    currentStep: "payment_verification",
    progress: 75,
    estimatedCompletion: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
    lastUpdated: new Date().toISOString(),
    steps: [
      {
        step: "order_placed",
        status: "completed",
        completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        step: "payment_processing",
        status: "completed",
        completedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        step: "payment_verification",
        status: "in_progress",
        startedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
      {
        step: "order_confirmation",
        status: "pending",
      },
    ],
  };

  res.json({
    success: true,
    message: "Status information retrieved",
    status: statusData,
  });
});

// GET /api/status/:orderId - Get specific order status
router.get("/:orderId", (req, res) => {
  const { orderId } = req.params;

  const orderStatus = {
    orderId: orderId,
    status: "confirmed",
    orderDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    estimatedDelivery: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    ).toISOString(), // 5 days
    total: 150.0,
    currency: "USD",
    items: [
      {
        id: 1,
        name: "Product A",
        quantity: 2,
        price: 75.0,
        status: "confirmed",
      },
    ],
    shipping: {
      method: "Standard Shipping",
      status: "pending",
      trackingNumber: null,
    },
    payment: {
      method: "Credit Card",
      status: "completed",
      amount: 150.0,
    },
  };

  res.json({
    success: true,
    message: "Order status retrieved",
    orderStatus: orderStatus,
  });
});

// POST /api/status - Handle status request and call BAP on_status
router.post("/", async (req, res) => {
  try {
    // Extract BAP URI from context
    const { context } = req.body;

    if (!context || !context.bap_uri) {
      return res.status(400).json({
        success: false,
        message: "BAP URI not found in context",
      });
    }

    const bap_uri = context.bap_uri;
    console.log(`Received status request for BAP: ${bap_uri}`);

    // Return ACK response immediately
    const ackResponse = {
      message: {
        ack: {
          status: "ACK",
        },
      },
    };

    res.json(ackResponse);

    // After 5 seconds, call BAP on_status endpoint
    setTimeout(async () => {
      try {
        const onStatusUrl = `${bap_uri}/on_status`;
        console.log(`Calling BAP on_status endpoint: ${onStatusUrl}`);

        const response = await fetch(onStatusUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(onStatusData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("BAP on_status response:", responseData);
        } else {
          console.error(
            "BAP on_status failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error calling BAP on_status:", error.message);
      }
    }, 5000); // 5 seconds delay
  } catch (error) {
    console.error("Error in status route:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// PUT /api/status/:orderId - Update order status
router.put("/:orderId", (req, res) => {
  const { orderId } = req.params;
  const { status, details, progress } = req.body;

  res.json({
    success: true,
    message: "Order status updated successfully",
    orderId: orderId,
    updatedStatus: status,
    updatedDetails: details,
    updatedProgress: progress,
    updatedAt: new Date().toISOString(),
  });
});

module.exports = router;
