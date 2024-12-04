const { Client } = require("pg");

// Set up the connection configuration
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

client
  .connect()
  .then(() => {
    console.log("Connected to the database.");

    // Insert query for the Copper Badge
    const query = `
      INSERT INTO badge_master (badge_id, badge_name, badge_icon_url, badge_description, badge_criteria, created_at, updated_at)
      VALUES
          (0, 'Copper Badge', 'https://5.imimg.com/data5/HK/HE/RD/SELLER-16725453/copper-badges-500x500.jpg',
          'The Copper Badge is a recognition for early-stage or initial achievements, awarded to users who accumulate at least 10 points. This badge represents growth and the start of a journey in demonstrating commitment and skills. Users who earn this badge are encouraged to continue striving for higher achievements and set their sights on more advanced accolades.',
          'Awarded for achieving 10 points in performance or contributions',
          CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `;

    return client.query(query);
  })
  .then(() => {
    console.log("Copper Badge inserted successfully.");
  })
  .catch((err) => {
    console.error("Error inserting data:", err);
  })
  .finally(() => {
    client.end();
  });
