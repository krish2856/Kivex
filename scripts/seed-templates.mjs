import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_mI7FeMEjvaz4@ep-sweet-snow-b46w9xll-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function main() {
  const sql = neon(databaseUrl);

  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ DEFAULT NOW();`;
  console.log("✓ users table updated with last_login");

  const templates = [
    {
      category: "DENTAL",
      title: "Dental Prime Studio & Clinic",
      tagline: "Flagship Dental Practice",
      badge: "DENTAL / FLAGSHIP PRACTICE",
      description: "A flagship clinical portal and patient acquisition system. Features instant appointment triage, cosmetic smile assessments, doctor bios, and high-converting consultation flows.",
      technologies: ["NEXT.JS", "TAILWIND CSS", "APPOINTMENT ENGINE"],
      image_url: "/dental/templates/dental-prime-eight.png",
      demo_url: "https://dentalprime-eight.vercel.app/",
      display_order: 1,
    },
    {
      category: "DENTAL",
      title: "Smile Dental Care & Aesthetics",
      tagline: "Modern Family & Cosmetic Clinic",
      badge: "DENTAL / FAMILY & COSMETIC",
      description: "Modern family and cosmetic dentistry portal with interactive treatment previews, doctor credentials, before-and-after smile galleries, and instant appointment triage.",
      technologies: ["NEXT.JS", "RESPONSIVE UX", "APPOINTMENT TRIAGE"],
      image_url: "/dental/templates/premium-dental-care.png",
      demo_url: "https://premium-dental-care-fwlt.vercel.app/",
      display_order: 2,
    },
    {
      category: "DENTAL",
      title: "Denta Bio-Aesthetic & Implant Center",
      tagline: "Implantology & Surgery",
      badge: "DENTAL / SURGICAL & IMPLANTS",
      description: "Comprehensive implant, surgical, and restorative dental suite with transparent procedural pricing, step-by-step care pathways, and digital diagnostic overviews.",
      technologies: ["NEXT.JS", "FRAMER MOTION", "INTERACTIVE SHOWCASE"],
      image_url: "/dental/templates/denta-bio-implant.png",
      demo_url: "https://dentabioimplant.vercel.app/",
      display_order: 3,
    },
    {
      category: "DENTAL",
      title: "Swiss Dental Precision & Implantology",
      tagline: "Minimalist Swiss Clinical",
      badge: "DENTAL / SWISS CLINICAL",
      description: "Minimalist Swiss-standard clinical experience emphasizing sterilization protocols, high-precision CAD/CAM prosthetics, and frictionless new-patient onboarding.",
      technologies: ["TYPESCRIPT", "TAILWIND CSS", "CLINICAL PROTOCOLS"],
      image_url: "/dental/templates/dentalclinical-theta.png",
      demo_url: "https://dentalclinical-theta.vercel.app/",
      display_order: 4,
    },
    {
      category: "DENTAL",
      title: "Denta Luxe Care Studio",
      tagline: "Luxury Restorative Care",
      badge: "DENTAL / BOUTIQUE CARE",
      description: "Calm, reassuring dental sanctuary design engineered to alleviate patient dental anxiety through soft aesthetics, interactive treatment exploration, and one-tap consultation booking.",
      technologies: ["REACT", "MODERN CSS", "LEAD GENERATION"],
      image_url: "/dental/templates/denta2-gules.png",
      demo_url: "https://denta2-gules.vercel.app/",
      display_order: 5,
    },
    {
      category: "DENTAL",
      title: "Denta Clear Aligners & Ortho",
      tagline: "Orthodontics & Clear Aligners",
      badge: "ORTHODONTICS / COSMETIC",
      description: "Specialized clear aligner and smile makeover studio showcasing digital before-and-after smile transformations, bite analysis tools, and financing calculators.",
      technologies: ["NEXT.JS", "ANIMATED UI", "SMILE ASSESSMENT"],
      image_url: "/dental/templates/denta-website.png",
      demo_url: "https://denta-website.vercel.app/",
      display_order: 6,
    },
    {
      category: "DENTAL",
      title: "DentaCare 3D Anatomy & Clinic",
      tagline: "3D Interactive Dentistry",
      badge: "3D DENTAL / ADVANCED TECH",
      description: "Futuristic 3D dental anatomy visualizer and interactive clinical experience allowing patients to explore tooth structures, dental procedures, and treatment benefits.",
      technologies: ["THREE.JS / WEBGL", "NEXT.JS", "3D VISUALIZER"],
      image_url: "/dental/templates/dentalcareclinic3d-eta.png",
      demo_url: "https://dentalcareclinic3d-eta.vercel.app/",
      display_order: 7,
    },
    {
      category: "DENTAL",
      title: "DentalCare Multi-Operatory Clinic",
      tagline: "Multi-Location Dental Group",
      badge: "DENTAL / MULTI-PROVIDER",
      description: "Enterprise-ready multi-provider dental platform with location selector, doctor specialty matching, real-time insurance verification, and automated recall reminders.",
      technologies: ["REACT", "TAILWIND CSS", "MULTI-LOCATION"],
      image_url: "/dental/templates/dentalcare1234-delta.png",
      demo_url: "https://dentalcare1234-delta.vercel.app/",
      display_order: 8,
    },
    {
      category: "DENTAL",
      title: "DentalCare Guided 3D Implant Center",
      tagline: "Digital Implant Planning",
      badge: "3D SURGICAL / IMPLANTS",
      description: "Cutting-edge digital implantology portal integrating 3D CBCT guided surgery visuals, patient education modules, and specialized implant consultation booking.",
      technologies: ["WEBGL / 3D", "REACT", "DIGITAL WORKFLOW"],
      image_url: "/dental/templates/3ddental4-seven.png",
      demo_url: "https://3ddental4-seven.vercel.app/",
      display_order: 9,
    },
    {
      category: "DENTAL",
      title: "Aura Dental Atelier",
      tagline: "Biomimetic Prosthodontics & Implants",
      badge: "SWISS DENTAL / ROBOTIC IMPLANTS",
      description: "Next-generation biomimetic dentistry studio integrating precision robotics, ultra-thin veneers, and painless anesthesia protocols.",
      technologies: ["NEXT.JS", "TAILWIND CSS", "BIOMIMETIC"],
      image_url: "/dental/templates/denta1234.png",
      demo_url: "https://denta1234.vercel.app/",
      display_order: 10,
    },
    {
      category: "REAL_ESTATE",
      title: "Aastha Realty Prime Collection",
      tagline: "High-Velocity Luxury Brokerage",
      badge: "REAL ESTATE / FLAGSHIP",
      description: "Luxury residential and commercial property portal featuring instant MLS property search, WhatsApp broker routing, and interactive floor plans.",
      technologies: ["NEXT.JS", "MAPS API", "LEAD ROUTING"],
      image_url: "/dental/templates/denta-bio-implant.png",
      demo_url: "https://aastharealty.in/",
      display_order: 1,
    },
    {
      category: "SAAS",
      title: "OmniCRM & Multi-Tenant Engine",
      tagline: "Enterprise SaaS Architecture",
      badge: "SAAS / MULTI-TENANT",
      description: "Scalable cloud SaaS management suite with billing ledger, staff role delegation, and real-time event analytics.",
      technologies: ["NEXT.JS", "NEON POSTGRESQL", "TAILWIND CSS"],
      image_url: "/dental/templates/dentalclinical-theta.png",
      demo_url: "https://kivextechnology.com/crm",
      display_order: 1,
    },
  ];

  for (const t of templates) {
    const exists = await sql`SELECT id FROM showcase_templates WHERE title = ${t.title} LIMIT 1;`;
    if (exists.length === 0) {
      await sql`
        INSERT INTO showcase_templates (category, title, tagline, badge, description, technologies, image_url, demo_url, display_order, is_active)
        VALUES (${t.category}, ${t.title}, ${t.tagline}, ${t.badge}, ${t.description}, ${t.technologies}, ${t.image_url}, ${t.demo_url}, ${t.display_order}, TRUE);
      `;
      console.log("✓ Seeded:", t.title);
    } else {
      // Update with exact latest demo url
      await sql`
        UPDATE showcase_templates
        SET demo_url = ${t.demo_url}, image_url = ${t.image_url}
        WHERE id = ${exists[0].id};
      `;
      console.log("✓ Refreshed:", t.title);
    }
  }

  const count = await sql`SELECT COUNT(*) FROM showcase_templates;`;
  console.log("Total showcase templates in Neon DB:", count[0].count);
}

main().catch(console.error);
