import { NextRequest, NextResponse } from "next/server";
import { sql, initDatabase } from "@/lib/db";

// GET: Retrieve company settings
export async function GET() {
  try {
    await initDatabase();

    const rows = await sql`
      SELECT * FROM company_settings
      ORDER BY id ASC
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return NextResponse.json({
        success: true,
        settings: {
          company_name: "KIVEX TECHNOLOGY PRIVATE LIMITED",
          gstin: "24AAACK1028M1Z8",
          email: "contact@kivextechnology.com",
          phone: "+91 9999999999",
          address: "Surat, Gujarat, India",
          upi_id: "kivex@hdfcbank",
          beneficiary_name: "Kivex Technology Private Limited",
          bank_name: "HDFC Bank",
          account_number: "50200084920194",
          ifsc_code: "HDFC0001028",
          branch_code: "KIVEX_01002856",
          advance_percentage: 50,
          whatsapp_notifications: true,
          google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        },
      });
    }

    const row = rows[0];
    if (!row.google_client_id && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      row.google_client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    }

    return NextResponse.json({ success: true, settings: row });
  } catch (error: any) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch settings" }, { status: 500 });
  }
}

// PATCH: Update company settings (Admin only)
export async function PATCH(req: NextRequest) {
  try {
    await initDatabase();
    const body = await req.json();
    const {
      companyName,
      gstin,
      email,
      phone,
      address,
      upiId,
      beneficiaryName,
      bankName,
      accountNumber,
      ifscCode,
      qrImageUrl,
      branchCode,
      advancePercentage,
      whatsappNotifications,
      googleClientId,
    } = body;

    const result = await sql`
      UPDATE company_settings
      SET
        company_name = COALESCE(${companyName}, company_name),
        gstin = COALESCE(${gstin}, gstin),
        email = COALESCE(${email}, email),
        phone = COALESCE(${phone}, phone),
        address = COALESCE(${address}, address),
        upi_id = COALESCE(${upiId}, upi_id),
        beneficiary_name = COALESCE(${beneficiaryName}, beneficiary_name),
        bank_name = COALESCE(${bankName}, bank_name),
        account_number = COALESCE(${accountNumber}, account_number),
        ifsc_code = COALESCE(${ifscCode}, ifsc_code),
        qr_image_url = COALESCE(${qrImageUrl}, qr_image_url),
        branch_code = COALESCE(${branchCode}, branch_code),
        advance_percentage = COALESCE(${advancePercentage}, advance_percentage),
        whatsapp_notifications = COALESCE(${whatsappNotifications}, whatsapp_notifications),
        google_client_id = COALESCE(${googleClientId}, google_client_id),
        updated_at = NOW()
      WHERE id = (SELECT id FROM company_settings ORDER BY id ASC LIMIT 1)
      RETURNING *;
    `;

    return NextResponse.json({ success: true, settings: result[0] });
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: error.message || "Failed to update settings" }, { status: 500 });
  }
}
