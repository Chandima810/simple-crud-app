// db.js
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env or Render environment

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the Render DATABASE_URL
  ssl: {
    rejectUnauthorized: false, // Required for Render external Postgres
  },
});

module.exports = pool;
