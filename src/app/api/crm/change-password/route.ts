import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, oldPassword, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: "Email and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Look for existing user in database
    const users = await sql`
      SELECT id, name, email, password_hash, role, branch_code
      FROM users
      WHERE LOWER(email) = ${cleanEmail} OR LOWER(name) = ${cleanEmail}
      LIMIT 1;
    `;

    if (users.length === 0) {
      // If admin doesn't exist in DB yet, verify initial default password 'admin123'
      if ((cleanEmail === "admin@kivex.com" || cleanEmail === "admin") && oldPassword === "admin123") {
        await sql`
          INSERT INTO users (name, email, password_hash, role, branch_code)
          VALUES ('Kivex Super Admin', 'admin@kivex.com', ${newPassword}, 'SUPER_ADMIN', 'KIVEX_01002856')
          ON CONFLICT (email) DO UPDATE SET password_hash = ${newPassword};
        `;
        return NextResponse.json({
          success: true,
          message: "Admin password successfully updated in system.",
        });
      }

      return NextResponse.json(
        { error: "User account not found or old password incorrect." },
        { status: 404 }
      );
    }

    const user = users[0];

    // Verify old password
    if (oldPassword && user.password_hash && user.password_hash !== oldPassword) {
      return NextResponse.json(
        { error: "Incorrect current password." },
        { status: 401 }
      );
    }

    // Update password in database
    await sql`
      UPDATE users
      SET password_hash = ${newPassword}
      WHERE id = ${user.id};
    `;

    return NextResponse.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error: any) {
    console.error("Change Password Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update password" },
      { status: 500 }
    );
  }
}
