const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:9001",
    "https://localhost:9001",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route modules
const searchRoutes = require("./routes/search");
const selectRoutes = require("./routes/select");
const initRoutes = require("./routes/init");
const confirmRoutes = require("./routes/confirm");
const trackingRoutes = require("./routes/tracking");
const cancelRoutes = require("./routes/cancel");
const updateRoutes = require("./routes/update");
const statusRoutes = require("./routes/status");
const ratingRoutes = require("./routes/rating");
const supportRoutes = require("./routes/support");

// Use routes
app.use("/search", searchRoutes);
app.use("/select", selectRoutes);
app.use("/init", initRoutes);
app.use("/confirm", confirmRoutes);
app.use("/track", trackingRoutes);
app.use("/cancel", cancelRoutes);
app.use("/update", updateRoutes);
app.use("/status", statusRoutes);
app.use("/rating", ratingRoutes);
app.use("/support", supportRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "SNP Express Server is running!",
    version: "1.0.0",
    endpoints: {
      search: "/search",
      select: "/select",
      init: "/init",
      confirm: "/confirm",
      tracking: "/tracking",
      cancel: "/cancel",
      update: "/update",
      status: "/status",
      rating: "/rating",
      support: "/support",
    },
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `The route ${req.originalUrl} does not exist`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see available endpoints`);
});

module.exports = app;
