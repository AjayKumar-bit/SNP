const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// GET /order - Return dummy order data
router.get("/orderId/:orderId", (req, res) => {
  const filePath = path.join(__dirname, "../data/dummyorder.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to read dummy order data",
        error: err.message
      });
    }
    try {
      const orders = JSON.parse(data);
      console.log("Fetched Orders:", orders);
      res.json(orders);
    } catch (parseErr) {
      res.status(500).json({
        success: false,
        message: "Failed to parse dummy order data",
        error: parseErr.message
      });
    }
  });
});

module.exports = router;
