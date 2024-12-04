const express = require("express");
const { Client } = require("pg");
const authRoutes = require("./routes/authRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const userRoutes = require("./routes/userRoutes");
// const badgesRouter = require("./routes/badges");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// PostgreSQL connection configuration
const client = new Client({
  user: "germane_swift",
  host: "swiftdb.c5k0kmyg2vmm.eu-north-1.rds.amazonaws.com",
  database: "postgres",
  password: "Swift_123",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Connect to PostgreSQL
client.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.stack);
    process.exit(1);
  }
  console.log("Connected to PostgreSQL database.");
});

// Utility function to fetch and log data
const fetchAndLogData = async (query, description) => {
  try {
    const res = await client.query(query);
    console.log(`${description} data:`, res.rows);
  } catch (err) {
    console.error(`Error fetching ${description} data:`, err.stack);
  }
};

// Fetch and log initial data
const initialDataQueries = [
  { query: "SELECT * FROM user_badges LIMIT 10;", description: "User Badges" },
  {
    query: "SELECT * FROM badge_master LIMIT 10;",
    description: "Badge Master",
  },
  // {
  //   query: "SELECT * FROM spinwheel_offers LIMIT 10;",
  //   description: "Spin Wheel Offers",
  // },
  // {
  //   query: "SELECT * FROM spinwheel_config LIMIT 10;",
  //   description: "Spin Wheel Config",
  // },
  // {
  //   query: "SELECT * FROM user_info LIMIT 10;",
  //   description: "user table",
  // },
];

initialDataQueries.forEach(({ query, description }) =>
  fetchAndLogData(query, description)
);

// Routes
// app.use("/api", badgeRouter);
app.use("/auth", authRoutes);
app.use("/rewards", rewardRoutes);
app.use("/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
