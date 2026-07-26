require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

// Initialize Database Table
async function initDb() {
  if (!process.env.DATABASE_URL) {
    console.warn("WARNING: DATABASE_URL is not set. Database operations will fail.");
    return;
  }
  
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      project VARCHAR(255),
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await pool.query(createTableQuery);
    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

initDb();

// --- API ROUTES ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Kivex CRM API is running' });
});

// POST new lead
app.post('/api/leads', async (req, res) => {
  const { name, email, project, message } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const insertQuery = `
      INSERT INTO leads (name, email, project, message) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const values = [name, email, project, message];
    const result = await pool.query(insertQuery, values);
    
    res.status(201).json({ success: true, lead: result.rows[0] });
  } catch (err) {
    console.error("Error inserting lead:", err);
    res.status(500).json({ error: 'Failed to save lead.' });
  }
});

// GET all leads (Protected)
app.get('/api/leads', async (req, res) => {
  const adminPassword = req.headers['x-admin-password'];
  
  // Basic security check
  if (!process.env.ADMIN_PASSWORD || adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized. Invalid admin password.' });
  }

  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json({ success: true, leads: result.rows });
  } catch (err) {
    console.error("Error fetching leads:", err);
    res.status(500).json({ error: 'Failed to fetch leads.' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
