const db = require("../../config/db");

const getBadges = async () => {
  const query = "SELECT * FROM badge_master LIMIT 10;";
  try {
    const res = await db.query(query);
    return res.rows;
  } catch (err) {
    console.error("Database query error", err);
    throw err;
  }
};

const getUserBadges = async (badge_id) => {
  const query = `SELECT * FROM badge_master WHERE badge_id = $1;`;
  const values = [badge_id];

  try {
    const result = await db.query(query, values);
    return result.rows.length > 0 ? result.rows[0] : null; // Returns badge if exists
  } catch (err) {
    console.error("Error fetching badge:", err);
    throw err;
  }
};

module.exports = {
  getBadges,
  getUserBadges,
};
