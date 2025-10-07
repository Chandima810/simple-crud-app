// server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // PostgreSQL connection
require('dotenv').config();

const app = express();

// ===== CORS CONFIGURATION =====
// Allow requests from your GitHub Pages frontend
const corsOptions = {
  origin: 'https://chandima810.github.io', // frontend URL
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// ===== MIDDLEWARE =====
app.use(express.json()); // parse JSON bodies

// ===== PORT =====
const PORT = process.env.PORT || 5000;

// ===== TEST ROUTE =====
app.get('/api', (req, res) => {
  res.send('Backend is running!');
});

// ===== USERS ROUTES =====
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, contact_number, discipline } = req.body;
    const newUser = await pool.query(
      `INSERT INTO users (name, email, contact_number, discipline) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, contact_number, discipline]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ===== CREATIVITY PATHS ROUTES =====
app.post('/api/creativity-paths', async (req, res) => {
  try {
    const { user_id, misfit, recall, flow, wide_path, spark, strategic_flow, narrow_path, bright_spark, ahh } = req.body;
    const newPath = await pool.query(
      `INSERT INTO creativity_paths 
       (user_id, misfit, recall, flow, wide_path, spark, strategic_flow, narrow_path, bright_spark, ahh)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [user_id, misfit, recall, flow, wide_path, spark, strategic_flow, narrow_path, bright_spark, ahh]
    );
    res.json(newPath.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/creativity-paths', async (req, res) => {
  try {
    const paths = await pool.query('SELECT * FROM creativity_paths ORDER BY id ASC');
    res.json(paths.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.delete('/api/creativity-paths/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM creativity_paths WHERE id = $1', [id]);
    res.json({ message: 'Creativity path deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
