import { neon } from "@neondatabase/serverless";

const databaseUrl = "postgresql://neondb_owner:npg_mI7FeMEjvaz4@ep-sweet-snow-b46w9xll-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function main() {
  console.log("Connecting to Neon DB...");
  const sql = neon(databaseUrl);
  
  const result = await sql`SELECT NOW() as current_time;`;
  console.log("Connected successfully! Server time:", result[0].current_time);

  console.log("Creating tables if not exist...");
  
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
  console.log("✓ inquiries table checked.");

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
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  console.log("✓ users table checked.");

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
  console.log("✓ projects table checked.");

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
  console.log("✓ payments table checked.");

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
  console.log("✓ showcase_templates table checked.");

  // Check if super admin user exists, if not seed initial admin
  const adminCheck = await sql`SELECT id FROM users WHERE role = 'SUPER_ADMIN' LIMIT 1;`;
  if (adminCheck.length === 0) {
    await sql`
      INSERT INTO users (name, email, password_hash, role, branch_code, phone)
      VALUES (
        'Kivex Super Admin',
        'admin@kivex.com',
        'admin123',
        'SUPER_ADMIN',
        'KIVEX_01002856',
        '+91 9999999999'
      );
    `;
    console.log("✓ Initial Super Admin seeded: admin@kivex.com / admin123 (Branch: KIVEX_01002856)");
  }

  // Seed default dental templates if table empty
  const templateCheck = await sql`SELECT id FROM showcase_templates LIMIT 1;`;
  if (templateCheck.length === 0) {
    await sql`
      INSERT INTO showcase_templates (category, title, tagline, badge, description, technologies, image_url, demo_url, display_order)
      VALUES 
      (
        'DENTAL',
        'Dental Prime Studio & Clinic',
        'Flagship Dental Practice',
        'DENTAL / FLAGSHIP PRACTICE',
        'A flagship clinical portal and patient acquisition system. Features instant appointment triage, cosmetic smile assessments, doctor bios, and high-converting consultation flows.',
        ARRAY['NEXT.JS', 'TAILWIND CSS', 'APPOINTMENT ENGINE'],
        '/dental/templates/dental-prime-eight.png',
        'https://dentalprime-eight.vercel.app/',
        1
      ),
      (
        'DENTAL',
        'Smile Dental Care & Aesthetics',
        'Modern Family & Cosmetic Clinic',
        'DENTAL / FAMILY & COSMETIC',
        'Modern family and cosmetic dentistry portal with interactive treatment previews, doctor credentials, before-and-after smile galleries, and instant appointment triage.',
        ARRAY['NEXT.JS', 'RESPONSIVE UX', 'APPOINTMENT TRIAGE'],
        '/dental/templates/premium-dental-care.png',
        'https://premium-dental-care-fwlt.vercel.app/',
        2
      ),
      (
        'DENTAL',
        'Denta Bio-Aesthetic & Implant Center',
        'Implantology & Surgery',
        'DENTAL / SURGICAL & IMPLANTS',
        'Comprehensive implant, surgical, and restorative dental suite with transparent procedural pricing, step-by-step care pathways, and digital diagnostic overviews.',
        ARRAY['NEXT.JS', 'FRAMER MOTION', 'INTERACTIVE SHOWCASE'],
        '/dental/templates/denta-bio-implant.png',
        'https://dentabioimplant.vercel.app/',
        3
      );
    `;
    console.log("✓ Default dental showcase templates seeded.");
  }

  console.log("All database tables and seed records verified successfully!");
}

main().catch(err => {
  console.error("Database initialization failed:", err);
  process.exit(1);
});
