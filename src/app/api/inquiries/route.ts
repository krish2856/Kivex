import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// POST: Save inbound lead from main website "Start Project" modal
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, businessDescription, services, summary } = body;

    if (!name || !phone || !email || !businessDescription) {
      return NextResponse.json(
        { error: "Missing required fields (name, phone, email, businessDescription)" },
        { status: 400 }
      );
    }

    const servicesStr = Array.isArray(services) ? services.join(", ") : services || "";

    const result = await sql`
      INSERT INTO inquiries (name, phone, email, business_description, services, summary, status)
      VALUES (${name}, ${phone}, ${email}, ${businessDescription}, ${servicesStr}, ${summary || ""}, 'NEW')
      RETURNING *;
    `;

    return NextResponse.json({ success: true, inquiry: result[0] }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json({ error: error.message || "Failed to save inquiry" }, { status: 500 });
  }
}

// GET: Retrieve inquiries for CRM or by client email/phone
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");

    let inquiries;
    if (email) {
      inquiries = await sql`
        SELECT * FROM inquiries 
        WHERE LOWER(email) = LOWER(${email})
        ORDER BY created_at DESC;
      `;
    } else if (phone) {
      inquiries = await sql`
        SELECT * FROM inquiries 
        WHERE phone LIKE ${'%' + phone.slice(-10)}
        ORDER BY created_at DESC;
      `;
    } else if (status && status !== "ALL") {
      inquiries = await sql`
        SELECT * FROM inquiries 
        WHERE status = ${status}
        ORDER BY created_at DESC;
      `;
    } else {
      inquiries = await sql`
        SELECT * FROM inquiries 
        ORDER BY created_at DESC;
      `;
    }

    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch inquiries" }, { status: 500 });
  }
}

// PATCH: Update status (e.g. APPROVED, CONTACTED, CONVERTED, ARCHIVED) or notes
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    const result = await sql`
      UPDATE inquiries
      SET 
        status = COALESCE(${status}, status),
        notes = COALESCE(${notes}, notes)
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json({ success: true, inquiry: result[0] });
  } catch (error: any) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json({ error: error.message || "Failed to update inquiry" }, { status: 500 });
  }
}

// DELETE: Super Admin removes lead/inquiry
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    await sql`
      DELETE FROM inquiries
      WHERE id = ${parseInt(id, 10)};
    `;

    return NextResponse.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json({ error: error.message || "Failed to delete inquiry" }, { status: 500 });
  }
}
