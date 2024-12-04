// const { Client } = require("pg");

// const client = new Client({
//   user: "germane_swift",
//   host: "swiftdb.c5k0kmyg2vmm.eu-north-1.rds.amazonaws.com",
//   database: "postgres",
//   password: "Swift_123",
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// async function updateUserBadge(userId, points) {
//   try {
//     await client.connect();

//     // Determine badge_id based on points
//     let newBadgeId = 1; // Default Bronze
//     if (points >= 100) {
//       newBadgeId = 2; // Silver
//     }

//     const query = `
//       WITH updated_badge AS (
//         UPDATE user_badges
//         SET badge_id = $2,
//             earned_at = NOW()
//         WHERE user_id = $1
//         RETURNING *
//       )
//       SELECT ub.*, bm.badge_name, bm.badge_description
//       FROM updated_badge ub
//       JOIN badge_master bm ON ub.badge_id = bm.badge_id;
//     `;

//     const values = [userId, newBadgeId];
//     const result = await client.query(query, values);
//     console.log('User badge updated:', result.rows[0]);
//     return result.rows[0];

//   } catch (error) {
//     console.error('Error updating user badge:', error.message);
//     throw error;
//   } finally {
//     await client.end();
//   }
// }

// // Example usage
// updateUserBadge('8509350573', 100);

// const { Client } = require("pg");

// const client = new Client({
//   user: "germane_swift",
//   host: "swiftdb.c5k0kmyg2vmm.eu-north-1.rds.amazonaws.com",
//   database: "postgres",
//   password: "Swift_123",
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// async function updateUserBadge(userId, points) {
//   try {
//     await client.connect();

//     // Dynamic badge assignment based on points
//     let newBadgeId;
//     if (points >= 150) {
//       newBadgeId = 3; // Gold
//     } else if (points >= 100) {
//       newBadgeId = 2; // Silver
//     } else {
//       newBadgeId = 1; // Bronze
//     }

//     const query = `
//       WITH updated_badge AS (
//         UPDATE user_badges
//         SET badge_id = $2,
//             earned_at = NOW()
//         WHERE user_id = $1
//         RETURNING *
//       )
//       SELECT ub.*, bm.badge_name, bm.badge_description
//       FROM updated_badge ub
//       JOIN badge_master bm ON ub.badge_id = bm.badge_id;
//     `;

//     const values = [userId, newBadgeId];
//     const result = await client.query(query, values);
//     console.log('User badge updated:', result.rows[0]);
//     return result.rows[0];

//   } catch (error) {
//     console.error('Error updating user badge:', error.message);
//     throw error;
//   } finally {
//     await client.end();
//   }
// }

// // Example usage
// updateUserBadge('8509350573', 150);

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

async function updateUserBadge(userId, points) {
  try {
    await client.connect();

    // First update the badge_master names if needed
    const updateBadgeMasterQuery = `
      UPDATE badge_master 
      SET badge_name = 
        CASE 
          WHEN badge_id = 1 THEN 'Bronze Badge'
          WHEN badge_id = 2 THEN 'Silver Badge'
          WHEN badge_id = 3 THEN 'Gold Badge'
        END
      WHERE badge_id IN (1, 2, 3);
    `;

    await client.query(updateBadgeMasterQuery);

    // Dynamic badge assignment based on points
    let newBadgeId;
    if (points >= 150) {
      newBadgeId = 3; // Gold
    } else if (points >= 100) {
      newBadgeId = 2; // Silver
    } else {
      newBadgeId = 1; // Bronze
    }

    const query = `
      WITH updated_badge AS (
        UPDATE user_badges 
        SET badge_id = $2,
            earned_at = NOW()
        WHERE user_id = $1
        RETURNING *
      )
      SELECT ub.*, bm.badge_name, bm.badge_description 
      FROM updated_badge ub
      JOIN badge_master bm ON ub.badge_id = bm.badge_id;
    `;

    const values = [userId, newBadgeId];
    const result = await client.query(query, values);
    console.log("User badge updated:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user badge:", error.message);
    throw error;
  } finally {
    await client.end();
  }
}

updateUserBadge("9316124362", 100);
