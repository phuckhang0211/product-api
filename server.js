const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware đọc JSON
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Product API is healthy",
  });
});

// Product API
app.use("/api/products", productRoutes);

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
