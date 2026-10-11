import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET: Retrieve payments (by client_email or all for CRM)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientEmail = searchParams.get("clientEmail");
    const status = searchParams.get("status");

    let payments;
    if (clientEmail) {
      payments = await sql`
        SELECT p.*, pr.title as project_title, pr.project_code
        FROM payments p
        LEFT JOIN projects pr ON p.project_id = pr.id
        WHERE LOWER(p.client_email) = LOWER(${clientEmail})
        ORDER BY p.created_at DESC;
      `;
    } else if (status) {
      payments = await sql`
        SELECT p.*, pr.title as project_title, pr.project_code, pr.client_name
        FROM payments p
        LEFT JOIN projects pr ON p.project_id = pr.id
        WHERE p.status = ${status}
        ORDER BY p.created_at DESC;
      `;
    } else {
      payments = await sql`
        SELECT p.*, pr.title as project_title, pr.project_code, pr.client_name
        FROM payments p
        LEFT JOIN projects pr ON p.project_id = pr.id
        ORDER BY p.created_at DESC;
      `;
    }

    return NextResponse.json({ success: true, payments });
  } catch (error: any) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch payments" }, { status: 500 });
  }
}

// POST: Client submits payment proof (QR scan + screenshot + UTR)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, clientEmail, amount, utrNumber, screenshotUrl } = body;

    if (!projectId || !clientEmail || !amount || !utrNumber || !screenshotUrl) {
      return NextResponse.json(
        { error: "All fields are required (projectId, clientEmail, amount, utrNumber, screenshotUrl)" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO payments (
        project_id, client_email, amount, utr_number, screenshot_url, status
      )
      VALUES (
        ${parseInt(projectId, 10)}, ${clientEmail}, ${parseFloat(amount)}, ${utrNumber}, ${screenshotUrl}, 'PENDING_APPROVAL'
      )
      RETURNING *;
    `;

    return NextResponse.json({ success: true, payment: result[0] }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating payment:", error);
    return NextResponse.json({ error: error.message || "Failed to record payment" }, { status: 500 });
  }
}

// PATCH: Admin approves or rejects payment
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, rejectionReason, approvedBy } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Payment ID and status are required" }, { status: 400 });
    }

    if (status !== "APPROVED" && status !== "REJECTED") {
      return NextResponse.json({ error: "Status must be APPROVED or REJECTED" }, { status: 400 });
    }

    // 1. Update Payment record
    const paymentResult = await sql`
      UPDATE payments
      SET
        status = ${status},
        rejection_reason = ${rejectionReason || null},
        approved_by = ${approvedBy || "Admin"}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (paymentResult.length === 0) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    const payment = paymentResult[0];

    // 2. If APPROVED, immediately transition the project to ACTIVE!
    if (status === "APPROVED" && payment.project_id) {
      await sql`
        UPDATE projects
        SET 
          status = 'ACTIVE',
          progress = GREATEST(progress, 35),
          updated_at = NOW()
        WHERE id = ${payment.project_id};
      `;
    }

    return NextResponse.json({
      success: true,
      payment,
      projectActivated: status === "APPROVED",
    });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: error.message || "Failed to update payment status" }, { status: 500 });
  }
}
