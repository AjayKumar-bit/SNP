const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const onUpdateData = require("../data/update/on_update.json");

// GET /api/update - Get update information
router.get("/", (req, res) => {
  const { orderId, userId } = req.query;

  // Mock update data
  const updateData = {
    orderId: orderId || "order_12345",
    userId: userId || "user_67890",
    lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    availableUpdates: [
      {
        type: "shipping_address",
        description: "Update shipping address",
        required: false,
      },
      {
        type: "payment_method",
        description: "Update payment method",
        required: false,
      },
      {
        type: "delivery_preferences",
        description: "Update delivery preferences",
        required: false,
      },
    ],
  };

  res.json({
    success: true,
    message: "Update information retrieved",
    update: updateData,
  });
});

// POST /api/update - Handle update request and call BAP on_update
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
    console.log(`Received update request for BAP: ${bap_uri}`);

    // Return ACK response immediately
    const ackResponse = {
      message: {
        ack: {
          status: "ACK",
        },
      },
    };

    res.json(ackResponse);

    // After 5 seconds, call BAP on_update endpoint
    setTimeout(async () => {
      try {
        const onUpdateUrl = `${bap_uri}/on_update`;
        console.log(`Calling BAP on_update endpoint: ${onUpdateUrl}`);

        const response = await fetch(onUpdateUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(onUpdateData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("BAP on_update response:", responseData);
        } else {
          console.error(
            "BAP on_update failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error calling BAP on_update:", error.message);
      }
    }, 5000); // 5 seconds delay
  } catch (error) {
    console.error("Error in update route:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// PUT /api/update/:updateId - Update specific update
router.put("/:updateId", (req, res) => {
  const { updateId } = req.params;
  const { updateData, status } = req.body;

  res.json({
    success: true,
    message: "Update modified successfully",
    updateId: updateId,
    updatedData: updateData,
    updatedStatus: status,
    modifiedAt: new Date().toISOString(),
  });
});

// GET /api/update/:updateId - Get specific update details
router.get("/:updateId", (req, res) => {
  const { updateId } = req.params;

  const updateDetails = {
    updateId: updateId,
    orderId: "order_12345",
    userId: "user_67890",
    updateType: "shipping_address",
    updateData: {
      address: "123 New Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    status: "completed",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    completedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
  };

  res.json({
    success: true,
    message: "Update details retrieved",
    update: updateDetails,
  });
});

// DELETE /api/update/:updateId - Delete update
router.delete("/:updateId", (req, res) => {
  const { updateId } = req.params;

  res.json({
    success: true,
    message: "Update deleted successfully",
    updateId: updateId,
    deletedAt: new Date().toISOString(),
  });
});

module.exports = router;
