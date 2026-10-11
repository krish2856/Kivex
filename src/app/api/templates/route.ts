import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET: Fetch templates (by category or all)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let templates;
    if (category) {
      templates = await sql`
        SELECT * FROM showcase_templates
        WHERE UPPER(category) = UPPER(${category}) AND is_active = TRUE
        ORDER BY display_order ASC, created_at DESC;
      `;
    } else {
      templates = await sql`
        SELECT * FROM showcase_templates
        ORDER BY category ASC, display_order ASC, created_at DESC;
      `;
    }

    return NextResponse.json({ success: true, templates });
  } catch (error: any) {
    console.error("Error fetching templates:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch templates" }, { status: 500 });
  }
}

// POST: Add new template (by Super Admin or Staff)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, title, tagline, badge, description, technologies, imageUrl, demoUrl, displayOrder } = body;

    if (!category || !title || !imageUrl || !demoUrl) {
      return NextResponse.json(
        { error: "Category, title, imageUrl, and demoUrl are required." },
        { status: 400 }
      );
    }

    const techArray = Array.isArray(technologies)
      ? technologies
      : typeof technologies === "string"
      ? technologies.split(",").map((t: string) => t.trim())
      : [];

    const result = await sql`
      INSERT INTO showcase_templates (
        category, title, tagline, badge, description, technologies, image_url, demo_url, display_order, is_active
      )
      VALUES (
        ${category.toUpperCase()}, ${title}, ${tagline || ""}, ${badge || category.toUpperCase()},
        ${description || ""}, ${techArray}, ${imageUrl}, ${demoUrl}, ${displayOrder || 1}, TRUE
      )
      RETURNING *;
    `;

    return NextResponse.json({ success: true, template: result[0] }, { status: 201 });
  } catch (error: any) {
    console.error("Error adding template:", error);
    return NextResponse.json({ error: error.message || "Failed to add template" }, { status: 500 });
  }
}

// PATCH: Update template
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, category, title, tagline, badge, description, technologies, imageUrl, demoUrl, isActive, displayOrder } = body;

    if (!id) {
      return NextResponse.json({ error: "Template ID is required." }, { status: 400 });
    }

    let techArray: string[] | null = null;
    if (technologies) {
      techArray = Array.isArray(technologies)
        ? technologies
        : technologies.split(",").map((t: string) => t.trim());
    }

    const result = await sql`
      UPDATE showcase_templates
      SET
        category = COALESCE(${category ? category.toUpperCase() : null}, category),
        title = COALESCE(${title}, title),
        tagline = COALESCE(${tagline}, tagline),
        badge = COALESCE(${badge}, badge),
        description = COALESCE(${description}, description),
        technologies = CASE WHEN ${techArray !== null} THEN ${techArray} ELSE technologies END,
        image_url = COALESCE(${imageUrl}, image_url),
        demo_url = COALESCE(${demoUrl}, demo_url),
        is_active = COALESCE(${isActive}, is_active),
        display_order = COALESCE(${displayOrder}, display_order)
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json({ success: true, template: result[0] });
  } catch (error: any) {
    console.error("Error updating template:", error);
    return NextResponse.json({ error: error.message || "Failed to update template" }, { status: 500 });
  }
}

// DELETE: Delete template
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Template ID is required." }, { status: 400 });
    }

    await sql`
      DELETE FROM showcase_templates
      WHERE id = ${parseInt(id, 10)};
    `;

    return NextResponse.json({ success: true, message: "Template deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting template:", error);
    return NextResponse.json({ error: error.message || "Failed to delete template" }, { status: 500 });
  }
}
