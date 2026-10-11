import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET: List projects (optionally filtered by client_email)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientEmail = searchParams.get("clientEmail");

    let projects;
    if (clientEmail) {
      projects = await sql`
        SELECT * FROM projects
        WHERE LOWER(client_email) = LOWER(${clientEmail})
        ORDER BY created_at DESC;
      `;
    } else {
      projects = await sql`
        SELECT * FROM projects
        ORDER BY created_at DESC;
      `;
    }

    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch projects" }, { status: 500 });
  }
}

// POST: Create a new project (by Admin or from Inbound Lead conversion)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, clientEmail, clientName, category, price, milestones, stagingUrl } = body;

    if (!title || !clientEmail || !clientName) {
      return NextResponse.json(
        { error: "Title, clientEmail, and clientName are required" },
        { status: 400 }
      );
    }

    // Generate readable Project Code: KVX-{RANDOM_4_DIGIT}
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const projectCode = `KVX-${randomCode}`;

    const defaultMilestones = milestones || [
      { id: "m1", title: "Discovery & Architecture Brief", completed: true, date: "Initiated" },
      { id: "m2", title: "UI/UX Design & High-Fidelity Prototypes", completed: false, date: "In Progress" },
      { id: "m3", title: "Frontend & API Core Development", completed: false, date: "Upcoming" },
      { id: "m4", title: "Client Staging Review & Triage", completed: false, date: "Upcoming" },
      { id: "m5", title: "Production Deployment & Go-Live", completed: false, date: "Upcoming" },
    ];

    const result = await sql`
      INSERT INTO projects (
        project_code, title, client_email, client_name, category, 
        status, progress, milestones, price, staging_url
      )
      VALUES (
        ${projectCode}, ${title}, ${clientEmail}, ${clientName}, ${category || 'Custom Project'},
        'PENDING_PAYMENT', 15, ${JSON.stringify(defaultMilestones)}::jsonb, ${price || 0}, ${stagingUrl || ""}
      )
      RETURNING *;
    `;

    return NextResponse.json({ success: true, project: result[0] }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}

// PATCH: Update project status, progress, milestones, or staging URL
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, progress, milestones, stagingUrl, price } = body;

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const result = await sql`
      UPDATE projects
      SET
        status = COALESCE(${status}, status),
        progress = COALESCE(${progress}, progress),
        milestones = CASE WHEN ${milestones ? true : false} THEN ${JSON.stringify(milestones || [])}::jsonb ELSE milestones END,
        staging_url = COALESCE(${stagingUrl}, staging_url),
        price = COALESCE(${price}, price),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json({ success: true, project: result[0] });
  } catch (error: any) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: error.message || "Failed to update project" }, { status: 500 });
  }
}

// DELETE: Super Admin deletes a project
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    await sql`
      DELETE FROM projects
      WHERE id = ${parseInt(id, 10)};
    `;

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: error.message || "Failed to delete project" }, { status: 500 });
  }
}

