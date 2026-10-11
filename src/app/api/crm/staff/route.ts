import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET: List all staff & admin users
export async function GET() {
  try {
    const staff = await sql`
      SELECT id, name, email, role, branch_code, phone, created_at
      FROM users
      WHERE role IN ('SUPER_ADMIN', 'PM', 'DEVELOPER', 'ACCOUNTS', 'SALES')
      ORDER BY id ASC;
    `;

    return NextResponse.json({ success: true, staff });
  } catch (error: any) {
    console.error("Error fetching staff:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch staff" }, { status: 500 });
  }
}

// POST: Super Admin adds a new staff member
export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role, branchCode, phone } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Name, email, password, and role are required." },
        { status: 400 }
      );
    }

    const assignedBranch = branchCode || "KIVEX_01002856";

    const result = await sql`
      INSERT INTO users (name, email, password_hash, role, branch_code, phone)
      VALUES (${name}, ${email}, ${password}, ${role}, ${assignedBranch}, ${phone || ""})
      RETURNING id, name, email, role, branch_code, phone, created_at;
    `;

    return NextResponse.json({ success: true, staff: result[0] }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating staff:", error);
    return NextResponse.json({ error: error.message || "Failed to create staff" }, { status: 500 });
  }
}

// DELETE: Super Admin removes staff member
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Staff user ID is required" }, { status: 400 });
    }

    await sql`
      DELETE FROM users
      WHERE id = ${parseInt(id, 10)} AND role != 'SUPER_ADMIN';
    `;

    return NextResponse.json({ success: true, message: "Staff removed successfully" });
  } catch (error: any) {
    console.error("Error removing staff:", error);
    return NextResponse.json({ error: error.message || "Failed to remove staff" }, { status: 500 });
  }
}
