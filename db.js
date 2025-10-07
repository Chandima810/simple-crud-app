// db.js
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env or Render environment

const pool = new Pool({
  user: process.env.DB_USER,        // Postgres username
  host: process.env.DB_HOST,        // DB host, e.g., localhost or Render host
  database: process.env.DB_DATABASE,// Database name
  password: process.env.DB_PASSWORD,// Postgres password
  port: process.env.DB_PORT,        // Default 5432
});

module.exports = pool;
