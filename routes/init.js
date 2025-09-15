const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const onInitData = require("../data/init/on_init.json");

// GET /init - Initialize session or service
router.get("/", (req, res) => {
  const { sessionId, serviceType } = req.query;

  // Mock initialization data
  const initData = {
    sessionId: sessionId || `session_${Date.now()}`,
    serviceType: serviceType || "default",
    status: "initialized",
    timestamp: new Date().toISOString(),
    config: {
      timeout: 300000, // 5 minutes
      maxRetries: 3,
      features: ["search", "select", "confirm"],
    },
  };

  res.json({
    success: true,
    message: "Service initialized successfully",
    data: initData,
  });
});

// POST /init - Handle init request and call BPP on_init
router.post("/", async (req, res) => {
  try {
    // Extract BPP URI from context
    const { context } = req.body;

    if (!context || !context.bpp_uri) {
      return res.status(400).json({
        success: false,
        message: "BPP URI not found in context",
      });
    }

    const bap_uri = context.bap_uri;
    console.log(`Received init request for BAP: ${bap_uri}`);

    // Return ACK response immediately
    const ackResponse = {
      message: {
        ack: {
          status: "ACK",
        },
      },
    };

    res.json(ackResponse);

    // After 5 seconds, call BPP on_init endpoint
    setTimeout(async () => {
      try {
        const onInitUrl = `${bap_uri}/on_init`;
        console.log(`Calling BPP on_init endpoint: ${onInitUrl}`);

        const response = await fetch(onInitUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(onInitData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("BPP on_init response:", responseData);
        } else {
          console.error(
            "BPP on_init failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error calling BPP on_init:", error.message);
      }
    }, 5000); // 5 seconds delay
  } catch (error) {
    console.error("Error in init route:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// PUT /init/:sessionId - Update initialization
router.put("/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  const { config, preferences } = req.body;

  res.json({
    success: true,
    message: "Initialization updated successfully",
    sessionId: sessionId,
    updatedConfig: config,
    updatedPreferences: preferences,
    updatedAt: new Date().toISOString(),
  });
});

module.exports = router;
