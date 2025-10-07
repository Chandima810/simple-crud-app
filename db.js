// db.js
const { Pool } = require('pg');
require('dotenv').config(); // load environment variables

// Use DATABASE_URL if present (Render provides it for external databases)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render DB URL
  ssl: {
    rejectUnauthorized: false, // required for Render PostgreSQL external DB
  },
});

module.exports = pool;
