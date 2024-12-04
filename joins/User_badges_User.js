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

async function createUserBadge() {
  try {
    await client.connect();
    
    const query = `
      INSERT INTO user_badges 
      (user_id, badge_id, earned_at, is_active)
      VALUES ($1, $2, NOW(), TRUE)
      RETURNING *;
    `;

    const values = ['9316124362', 1]; // Using the user_id from the user_info record
    const result = await client.query(query, values);
    console.log('User badge created:', result.rows[0]);
    return result.rows[0];
    
  } catch (error) {
    console.error('Error creating user badge:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

// Execute the function
createUserBadge();


