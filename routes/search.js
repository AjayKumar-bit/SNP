const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const onSearchData = require("../data/on_search/grocery.json");

// GET /api/search - Search for items/services
router.get("/", (req, res) => {
  const { query, category, location } = req.query;

  // Mock search results
  const searchResults = [
    {
      id: 1,
      name: "Service Provider A",
      category: category || "general",
      location: location || "New York",
      rating: 4.5,
      price: "$50-100",
    },
    {
      id: 2,
      name: "Service Provider B",
      category: category || "general",
      location: location || "Los Angeles",
      rating: 4.2,
      price: "$75-150",
    },
  ];

  res.json({
    success: true,
    message: "Search completed successfully",
    query: query,
    results: searchResults,
    total: searchResults.length,
  });
});

// POST /api/search - Handle search request and call BAP on_search
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
    console.log(`Received search request for BAP: ${bap_uri}`);

    // Return ACK response immediately
    const ackResponse = {
      message: {
        ack: {
          status: "ACK",
        },
      },
    };

    res.json(ackResponse);

    // After 5 seconds, call BAP on_search endpoint
    setTimeout(async () => {
      try {
        const onSearchUrl = `${bap_uri}/on_search`;
        console.log(`Calling BAP on_search endpoint: ${onSearchUrl}`);

        const response = await fetch(onSearchUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(onSearchData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("BAP on_search response:", responseData);
        } else {
          console.error(
            "BAP on_search failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error calling BAP on_search:", error.message);
      }
    }, 5000); // 5 seconds delay
  } catch (error) {
    console.error("Error in search route:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
