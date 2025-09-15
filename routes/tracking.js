const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const onTrackData = require("../data/track/on_track.json");

// GET /api/tracking - Get tracking information
router.get("/", (req, res) => {
  const { orderId, trackingNumber } = req.query;

  // Mock tracking data
  const trackingData = {
    orderId: orderId || "order_12345",
    trackingNumber: trackingNumber || "TRK123456789",
    status: "in_transit",
    currentLocation: "Distribution Center",
    estimatedDelivery: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000
    ).toISOString(),
    history: [
      {
        status: "order_confirmed",
        location: "Warehouse",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Order has been confirmed and is being processed",
      },
      {
        status: "shipped",
        location: "Distribution Center",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Package has been shipped and is in transit",
      },
    ],
  };

  res.json({
    success: true,
    message: "Tracking information retrieved",
    tracking: trackingData,
  });
});

// GET /api/tracking/:trackingNumber - Get specific tracking details
router.get("/:trackingNumber", (req, res) => {
  const { trackingNumber } = req.params;

  const trackingDetails = {
    trackingNumber: trackingNumber,
    orderId: "order_12345",
    status: "in_transit",
    currentLocation: "Distribution Center",
    estimatedDelivery: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000
    ).toISOString(),
    carrier: "Express Shipping Co.",
    service: "Standard Delivery",
    history: [
      {
        status: "order_confirmed",
        location: "Warehouse",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Order has been confirmed and is being processed",
      },
      {
        status: "shipped",
        location: "Distribution Center",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Package has been shipped and is in transit",
      },
    ],
  };

  res.json({
    success: true,
    message: "Tracking details retrieved",
    tracking: trackingDetails,
  });
});

// POST /api/tracking - Handle track request and call BAP on_track
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
    console.log(`Received track request for BAP: ${bap_uri}`);

    // Return ACK response immediately
    const ackResponse = {
      message: {
        ack: {
          status: "ACK",
        },
      },
    };

    res.json(ackResponse);

    // After 5 seconds, call BAP on_track endpoint
    setTimeout(async () => {
      try {
        const onTrackUrl = `${bap_uri}/on_track`;
        console.log(`Calling BAP on_track endpoint: ${onTrackUrl}`);

        const response = await fetch(onTrackUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(onTrackData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("BAP on_track response:", responseData);
        } else {
          console.error(
            "BAP on_track failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error calling BAP on_track:", error.message);
      }
    }, 5000); // 5 seconds delay
  } catch (error) {
    console.error("Error in tracking route:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// PUT /api/tracking/:trackingNumber - Update tracking status
router.put("/:trackingNumber", (req, res) => {
  const { trackingNumber } = req.params;
  const { status, location, description } = req.body;

  res.json({
    success: true,
    message: "Tracking status updated successfully",
    trackingNumber: trackingNumber,
    updatedStatus: status,
    updatedLocation: location,
    updatedDescription: description,
    updatedAt: new Date().toISOString(),
  });
});

module.exports = router;
