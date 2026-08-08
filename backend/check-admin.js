require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    console.log("Checking users table...");
    const result = await pool.query('SELECT * FROM users');
    console.log(`Found ${result.rows.length} users.`);

    let adminExists = false;
    for (let u of result.rows) {
      console.log(`- Username: ${u.username}, Role: ${u.role}`);
      if (u.username === 'admin') adminExists = true;
    }

    if (!adminExists) {
      console.log("Admin user not found. Creating default admin...");
      const hash = await bcrypt.hash('password123', 10);
      await pool.query(
        `INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)`,
        ['admin', hash, 'admin']
      );
      console.log("Created 'admin' with password 'password123'");
    } else {
        console.log("Admin user already exists. Overwriting password to 'password123'...");
        const hash = await bcrypt.hash('password123', 10);
        await pool.query('UPDATE users SET password_hash = $1 WHERE username = $2', [hash, 'admin']);
        console.log("Password reset successfully.");
    }

  } catch (err) {
    console.error("Database error:", err);
  } finally {
    pool.end();
  }
}

run();
