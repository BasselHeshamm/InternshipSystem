const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "internship_db",
  user: "postgres",
  password: "Elfouad!2004",
});

const connectPG = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL connected");
    client.release();
  } catch (err) {
    console.error("PostgreSQL connection error:", err.message);
    process.exit(1);
  }
};

module.exports = { pool, connectPG };
