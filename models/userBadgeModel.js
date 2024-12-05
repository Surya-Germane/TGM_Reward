const db = require("../../config/db");

const assignBadgeToUser = async (user_id, badge_id) => {
  const query = `INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2) RETURNING *;`;
  const values = [user_id, badge_id];

  try {
    const result = await db.query(query, values);
    return result.rows[0]; // Return the assigned badge record
  } catch (err) {
    console.error("Error assigning badge to user:", err);
    throw err;
  }
};

const getBadgesByUserId = async (user_id) => {
  const query = `
    SELECT bm.badge_name
    FROM user_badges ub
    JOIN badge_master bm ON ub.badge_id = bm.badge_id
    WHERE ub.user_id = $1;
  `;
  const values = [user_id];

  try {
    const result = await db.query(query, values);
    return result.rows; // Return the list of badge names
  } catch (err) {
    console.error("Error fetching badges for user:", err);
    throw err; // Propagate the error for further handling
  }
};

module.exports = {
  assignBadgeToUser,
  getBadgesByUserId,
};
