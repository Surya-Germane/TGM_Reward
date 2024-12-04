const { Client } = require("pg");

// Database configuration
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

const tableName = "badge_master"; // Change this to the table you want to inspect

// Function to get table attributes
async function getTableAttributes() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database.");

    // Query to fetch column details
    const query = `
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = $1;
    `;

    const res = await client.query(query, [tableName]);

    console.log(`Attributes of table '${tableName}':`);
    res.rows.forEach((row) => {
      console.log(
        `Column: ${row.column_name}, Type: ${row.data_type}, Nullable: ${row.is_nullable}`
      );
    });
  } catch (err) {
    console.error("Error fetching table attributes:", err.stack);
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
}

// Call the function
getTableAttributes();
