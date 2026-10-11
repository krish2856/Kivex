import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET: Retrieve all users or clients with login timestamps and project stats
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");

    let users;
    if (role) {
      users = await sql`
        SELECT 
          u.id, 
          u.name, 
          u.email, 
          u.role, 
          u.branch_code, 
          u.phone, 
          u.avatar_url, 
          u.last_login, 
          u.created_at,
          COUNT(DISTINCT p.id)::int AS project_count,
          COALESCE(SUM(CASE WHEN pay.status = 'APPROVED' THEN pay.amount ELSE 0 END), 0)::numeric AS total_paid
        FROM users u
        LEFT JOIN projects p ON LOWER(p.client_email) = LOWER(u.email)
        LEFT JOIN payments pay ON LOWER(pay.client_email) = LOWER(u.email)
        WHERE u.role = ${role}
        GROUP BY u.id
        ORDER BY u.last_login DESC NULLS LAST, u.created_at DESC;
      `;
    } else {
      users = await sql`
        SELECT 
          u.id, 
          u.name, 
          u.email, 
          u.role, 
          u.branch_code, 
          u.phone, 
          u.avatar_url, 
          u.last_login, 
          u.created_at,
          COUNT(DISTINCT p.id)::int AS project_count,
          COALESCE(SUM(CASE WHEN pay.status = 'APPROVED' THEN pay.amount ELSE 0 END), 0)::numeric AS total_paid
        FROM users u
        LEFT JOIN projects p ON LOWER(p.client_email) = LOWER(u.email)
        LEFT JOIN payments pay ON LOWER(pay.client_email) = LOWER(u.email)
        GROUP BY u.id
        ORDER BY u.last_login DESC NULLS LAST, u.created_at DESC;
      `;
    }

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch users" }, { status: 500 });
  }
}

// DELETE: Super Admin deletes user / client
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await sql`
      DELETE FROM users
      WHERE id = ${parseInt(id, 10)} AND role != 'SUPER_ADMIN';
    `;

    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: error.message || "Failed to delete user" }, { status: 500 });
  }
}
