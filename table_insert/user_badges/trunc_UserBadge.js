const { Client } = require("pg");

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

async function truncateUserBadges() {
  try {
    await client.connect();

    const query = `TRUNCATE TABLE user_badges;`;
    await client.query(query);

    console.log("Successfully truncated user_badges table");
    return { success: true, message: "User badges data cleared successfully" };
  } catch (error) {
    console.error("Error truncating user_badges:", error.message);
    throw error;
  } finally {
    await client.end();
  }
}

// Execute the function
truncateUserBadges();
