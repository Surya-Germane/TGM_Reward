const { Pool } = require("pg");

const pool = new Pool({
  user: "your-db-user",
  host: "localhost",
  database: "your-database",
  password: "your-db-password",
  port: 5432, // Change if using a different port
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};
