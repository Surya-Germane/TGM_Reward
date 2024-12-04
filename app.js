const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb://suryabhoopendranath:Suryanarayanan1@cluster0-shard-00-00.uhfsb.mongodb.net:27017,cluster0-shard-00-01.uhfsb.mongodb.net:27017,cluster0-shard-00-02.uhfsb.mongodb.net:27017/?ssl=true&replicaSet=atlas-v0by6w-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/auth", authRoutes);
app.use("/rewards", rewardRoutes);
app.use("/users", userRoutes);

module.exports = app;
