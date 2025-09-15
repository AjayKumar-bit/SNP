const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const onRatingData = require("../data/rating/on_rating.json");

// GET /api/rating - Get ratings and reviews
router.get("/", (req, res) => {
  const { productId, serviceId, userId } = req.query;

  // Mock ratings data
  const ratingsData = {
    productId: productId || "product_123",
    serviceId: serviceId || "service_456",
    averageRating: 4.3,
    totalReviews: 125,
    ratingDistribution: {
      5: 45,
      4: 35,
      3: 25,
      2: 15,
      1: 5,
    },
    recentReviews: [
      {
        id: 1,
        userId: "user_001",
        rating: 5,
        review: "Excellent service! Highly recommended.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        userId: "user_002",
        rating: 4,
        review: "Good quality, fast delivery.",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  };

  res.json({
    success: true,
    message: "Ratings and reviews retrieved",
    ratings: ratingsData,
  });
});

// POST /api/rating - Handle rating request and call BAP on_rating
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
    console.log(`Received rating request for BAP: ${bap_uri}`);

    // Return ACK response immediately
    const ackResponse = {
      message: {
        ack: {
          status: "ACK",
        },
      },
    };

    res.json(ackResponse);

    // After 5 seconds, call BAP on_rating endpoint
    setTimeout(async () => {
      try {
        const onRatingUrl = `${bap_uri}/on_rating`;
        console.log(`Calling BAP on_rating endpoint: ${onRatingUrl}`);

        const response = await fetch(onRatingUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(onRatingData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("BAP on_rating response:", responseData);
        } else {
          console.error(
            "BAP on_rating failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error calling BAP on_rating:", error.message);
      }
    }, 5000); // 5 seconds delay
  } catch (error) {
    console.error("Error in rating route:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET /api/rating/:ratingId - Get specific rating details
router.get("/:ratingId", (req, res) => {
  const { ratingId } = req.params;

  const ratingDetails = {
    id: ratingId,
    productId: "product_123",
    serviceId: "service_456",
    userId: "user_001",
    rating: 5,
    review: "Excellent service! Highly recommended.",
    orderId: "order_12345",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    helpful: 12,
    reported: false,
  };

  res.json({
    success: true,
    message: "Rating details retrieved",
    rating: ratingDetails,
  });
});

// PUT /api/rating/:ratingId - Update rating/review
router.put("/:ratingId", (req, res) => {
  const { ratingId } = req.params;
  const { rating, review } = req.body;

  if (rating && (rating < 1 || rating > 5)) {
    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5",
    });
  }

  res.json({
    success: true,
    message: "Rating updated successfully",
    ratingId: ratingId,
    updatedRating: rating,
    updatedReview: review,
    updatedAt: new Date().toISOString(),
  });
});

// DELETE /api/rating/:ratingId - Delete rating
router.delete("/:ratingId", (req, res) => {
  const { ratingId } = req.params;

  res.json({
    success: true,
    message: "Rating deleted successfully",
    ratingId: ratingId,
    deletedAt: new Date().toISOString(),
  });
});

// POST /api/rating/:ratingId/helpful - Mark rating as helpful
router.post("/:ratingId/helpful", (req, res) => {
  const { ratingId } = req.params;
  const { userId } = req.body;

  res.json({
    success: true,
    message: "Rating marked as helpful",
    ratingId: ratingId,
    userId: userId,
    markedAt: new Date().toISOString(),
  });
});

module.exports = router;
