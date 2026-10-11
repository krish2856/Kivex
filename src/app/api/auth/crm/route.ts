import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { branchCode, email, password } = await req.json();

    if (!branchCode || !email || !password) {
      return NextResponse.json(
        { error: "Branch Code, Email/Username, and Password are all required." },
        { status: 400 }
      );
    }

    // Normalized lookup
    const users = await sql`
      SELECT id, name, email, password_hash, role, branch_code, phone
      FROM users
      WHERE (
        LOWER(email) = LOWER(${email}) 
        OR LOWER(name) = LOWER(${email})
        OR (LOWER(${email}) = 'admin' AND LOWER(email) = 'admin@kivex.com')
      )
      AND (branch_code IS NULL OR LOWER(branch_code) = LOWER(${branchCode}))
      LIMIT 1;
    `;

    if (users.length === 0) {
      // Fallback for initial demo super admin if branch code matches
      if (
        (branchCode === "KIVEX_01002856" || branchCode.toUpperCase() === "KIVEX_01002856") &&
        (email === "admin@kivex.com" || email === "admin") &&
        password === "admin123"
      ) {
        return NextResponse.json({
          success: true,
          user: {
            id: 1,
            name: "Kivex Super Admin",
            email: "admin@kivex.com",
            role: "SUPER_ADMIN",
            branchCode: "KIVEX_01002856",
          },
        });
      }

      return NextResponse.json(
        { error: "Invalid Branch Code or credentials. Please check and try again." },
        { status: 401 }
      );
    }

    const user = users[0];

    // Simple password check (can be expanded to bcrypt if needed)
    if (user.password_hash !== password) {
      return NextResponse.json(
        { error: "Invalid password for this account." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branchCode: user.branch_code,
        phone: user.phone,
      },
    });
  } catch (error: any) {
    console.error("CRM Auth Error:", error);
    return NextResponse.json(
      { error: error.message || "Authentication failed" },
      { status: 500 }
    );
  }
}
