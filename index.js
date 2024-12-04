const express = require("express");
const mongoose = require("mongoose");
const { Client } = require("pg");
const authRoutes = require("./routes/authRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());


// Routes
app.use("/auth", authRoutes);
app.use("/rewards", rewardRoutes);
app.use("/users", userRoutes);

// PostgreSQL connection
const client = new Client({
  user: 'germane_swift',
  host: 'swiftdb.c5k0kmyg2vmm.eu-north-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'Swift_123',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    throw err;
  }
  console.log('Connected to PostgreSQL database.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
