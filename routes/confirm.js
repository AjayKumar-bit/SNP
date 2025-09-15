const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const onConfirmData = require("../data/confirm/on_confirm.json");

// GET /confirm - Get confirmation details
router.get("/", (req, res) => {
  const { orderId, sessionId } = req.query;

  // Mock confirmation data
  const confirmationData = {
    orderId: orderId || "order_12345",
    sessionId: sessionId || "session_67890",
    status: "pending_confirmation",
    items: [
      {
        id: 1,
        name: "Service A",
        quantity: 1,
        price: 50.0,
      },
    ],
    total: 50.0,
    currency: "USD",
    createdAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    message: "Confirmation details retrieved",
    confirmation: confirmationData,
  });
});

// POST /confirm - Handle confirm request and call BAP on_confirm
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
    console.log(`Received confirm request for BAP: ${bap_uri}`);

    // Return ACK response immediately
    const ackResponse = {
      message: {
        ack: {
          status: "ACK",
        },
      },
    };

    res.json(ackResponse);

    // After 5 seconds, call BAP on_confirm endpoint
    setTimeout(async () => {
      try {
        const onConfirmUrl = `${bap_uri}/on_confirm`;
        console.log(`Calling BAP on_confirm endpoint: ${onConfirmUrl}`);

        const response = await fetch(onConfirmUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(onConfirmData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("BAP on_confirm response:", responseData);
        } else {
          console.error(
            "BAP on_confirm failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error calling BAP on_confirm:", error.message);
      }
    }, 5000); // 5 seconds delay
  } catch (error) {
    console.error("Error in confirm route:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// PUT /confirm/:orderId - Update confirmation
router.put("/:orderId", (req, res) => {
  const { orderId } = req.params;
  const { paymentMethod, shippingAddress } = req.body;

  res.json({
    success: true,
    message: "Confirmation updated successfully",
    orderId: orderId,
    updatedPaymentMethod: paymentMethod,
    updatedShippingAddress: shippingAddress,
    updatedAt: new Date().toISOString(),
  });
});

// DELETE /confirm/:orderId - Cancel confirmation
router.delete("/:orderId", (req, res) => {
  const { orderId } = req.params;

  res.json({
    success: true,
    message: "Confirmation cancelled successfully",
    orderId: orderId,
    cancelledAt: new Date().toISOString(),
  });
});

module.exports = router;
