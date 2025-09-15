const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const onCancelData = require("../data/cancel/on_cancel.json");

// GET /api/cancel - Get cancellation information
router.get("/", (req, res) => {
  const { orderId, sessionId } = req.query;

  // Mock cancellation data
  const cancellationData = {
    orderId: orderId || "order_12345",
    sessionId: sessionId || "session_67890",
    status: "cancellable",
    cancellationPolicy: {
      refundable: true,
      refundAmount: 50.0,
      cancellationFee: 0.0,
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    },
  };

  res.json({
    success: true,
    message: "Cancellation information retrieved",
    cancellation: cancellationData,
  });
});

// POST /api/cancel - Handle cancel request and call BAP on_cancel
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
    console.log(`Received cancel request for BAP: ${bap_uri}`);

    // Return ACK response immediately
    const ackResponse = {
      message: {
        ack: {
          status: "ACK",
        },
      },
    };

    res.json(ackResponse);

    // After 5 seconds, call BAP on_cancel endpoint
    setTimeout(async () => {
      try {
        const onCancelUrl = `${bap_uri}/on_cancel`;
        console.log(`Calling BAP on_cancel endpoint: ${onCancelUrl}`);

        const response = await fetch(onCancelUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(onCancelData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("BAP on_cancel response:", responseData);
        } else {
          console.error(
            "BAP on_cancel failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error calling BAP on_cancel:", error.message);
      }
    }, 5000); // 5 seconds delay
  } catch (error) {
    console.error("Error in cancel route:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET /api/cancel/:orderId - Get specific cancellation details
router.get("/:orderId", (req, res) => {
  const { orderId } = req.params;

  const cancellationDetails = {
    orderId: orderId,
    status: "cancelled",
    reason: "User requested cancellation",
    cancelledAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    refundAmount: 50.0,
    refundStatus: "processing",
    refundMethod: "credit_card",
    estimatedRefundTime: "3-5 business days",
    cancellationNumber: `CANCEL_${Date.now()}`,
  };

  res.json({
    success: true,
    message: "Cancellation details retrieved",
    cancellation: cancellationDetails,
  });
});

// PUT /api/cancel/:orderId - Update cancellation
router.put("/:orderId", (req, res) => {
  const { orderId } = req.params;
  const { reason, refundMethod } = req.body;

  res.json({
    success: true,
    message: "Cancellation updated successfully",
    orderId: orderId,
    updatedReason: reason,
    updatedRefundMethod: refundMethod,
    updatedAt: new Date().toISOString(),
  });
});

// DELETE /api/cancel/:orderId - Delete cancellation record
router.delete("/:orderId", (req, res) => {
  const { orderId } = req.params;

  res.json({
    success: true,
    message: "Cancellation record deleted successfully",
    orderId: orderId,
    deletedAt: new Date().toISOString(),
  });
});

module.exports = router;
