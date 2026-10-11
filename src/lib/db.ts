import { neon, neonConfig } from "@neondatabase/serverless";

// Optional Neon client configuration
neonConfig.fetchConnectionCache = true;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("⚠️ Warning: DATABASE_URL is not set in environment.");
}

// Export the neon SQL query execution instance
export const sql = neon(databaseUrl || "");

/**
 * Initializes required tables in Neon PostgreSQL if they do not already exist.
 * Safe to call idempotently on server start or via API.
 */
export async function initDatabase() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined in environment.");
  }

  // 1. Inquiries Table (from 'Start Project' modal)
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      business_description TEXT NOT NULL,
      services TEXT NOT NULL,
      summary TEXT,
      status VARCHAR(50) DEFAULT 'NEW',
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  // 2. Users Table (Staff, Super Admin, and Clients)
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255),
      role VARCHAR(50) DEFAULT 'CLIENT',
      branch_code VARCHAR(100),
      avatar_url TEXT,
      phone VARCHAR(100),
      last_login TIMESTAMPTZ DEFAULT NOW(),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  // Ensure last_login column exists if table was created previously
  await sql`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ DEFAULT NOW();
  `;

  // Seed default super admin user if not exists
  await sql`
    INSERT INTO users (name, email, password_hash, role, branch_code)
    VALUES ('Kivex Super Admin', 'admin@kivex.com', 'admin123', 'SUPER_ADMIN', 'KIVEX_01002856')
    ON CONFLICT (email) DO NOTHING;
  `;

  // 3. Projects Table
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      project_code VARCHAR(100) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      client_email VARCHAR(255) NOT NULL,
      client_name VARCHAR(255) NOT NULL,
      category VARCHAR(100) DEFAULT 'Custom Project',
      status VARCHAR(50) DEFAULT 'PENDING_PAYMENT',
      progress INTEGER DEFAULT 0,
      milestones JSONB DEFAULT '[]'::jsonb,
      price NUMERIC(12, 2) DEFAULT 0,
      staging_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  // 4. Payments Table (with screenshot & UTR verification)
  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
      client_email VARCHAR(255) NOT NULL,
      amount NUMERIC(12, 2) NOT NULL,
      utr_number VARCHAR(255) NOT NULL,
      screenshot_url TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'PENDING_APPROVAL',
      rejection_reason TEXT,
      approved_by VARCHAR(255),
      payment_date TIMESTAMPTZ DEFAULT NOW(),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  // 5. Showcase Templates Table (for dynamic Dental, Real Estate, SaaS showcase updates)
  await sql`
    CREATE TABLE IF NOT EXISTS showcase_templates (
      id SERIAL PRIMARY KEY,
      category VARCHAR(50) NOT NULL,
      title VARCHAR(255) NOT NULL,
      tagline VARCHAR(255),
      badge VARCHAR(100),
      description TEXT,
      technologies TEXT[] DEFAULT '{}',
      image_url TEXT NOT NULL,
      demo_url TEXT NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  // 6. Company Settings Table (Enterprise Profile, Payment QR, Banking, Notifications)
  await sql`
    CREATE TABLE IF NOT EXISTS company_settings (
      id SERIAL PRIMARY KEY,
      company_name VARCHAR(255) DEFAULT 'KIVEX TECHNOLOGY PRIVATE LIMITED',
      gstin VARCHAR(100) DEFAULT '24AAACK1028M1Z8',
      email VARCHAR(255) DEFAULT 'contact@kivextechnology.com',
      phone VARCHAR(100) DEFAULT '+91 9999999999',
      address TEXT DEFAULT 'Surat, Gujarat, India',
      upi_id VARCHAR(255) DEFAULT 'kivex@hdfcbank',
      beneficiary_name VARCHAR(255) DEFAULT 'Kivex Technology Private Limited',
      bank_name VARCHAR(255) DEFAULT 'HDFC Bank',
      account_number VARCHAR(100) DEFAULT '50200084920194',
      ifsc_code VARCHAR(100) DEFAULT 'HDFC0001028',
      qr_image_url TEXT,
      branch_code VARCHAR(100) DEFAULT 'KIVEX_01002856',
      advance_percentage INTEGER DEFAULT 50,
      whatsapp_notifications BOOLEAN DEFAULT TRUE,
      google_client_id TEXT DEFAULT '',
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS google_client_id TEXT DEFAULT '';
  `;

  // Seed default settings row if empty
  const settingsCheck = await sql`SELECT id FROM company_settings LIMIT 1;`;
  if (settingsCheck.length === 0) {
    await sql`
      INSERT INTO company_settings (
        company_name, gstin, email, phone, address, upi_id, beneficiary_name,
        bank_name, account_number, ifsc_code, branch_code, advance_percentage
      )
      VALUES (
        'KIVEX TECHNOLOGY PRIVATE LIMITED',
        '24AAACK1028M1Z8',
        'contact@kivextechnology.com',
        '+91 9999999999',
        'Surat, Gujarat, India',
        'kivex@hdfcbank',
        'Kivex Technology Private Limited',
        'HDFC Bank',
        '50200084920194',
        'HDFC0001028',
        'KIVEX_01002856',
        50
      );
    `;
  }

  return { success: true, message: "Neon DB tables verified successfully." };
}
