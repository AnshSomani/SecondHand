require("dotenv").config();           // <-- YOU MISSED THIS LINE

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});