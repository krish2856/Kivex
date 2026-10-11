import { NextRequest, NextResponse } from "next/server";
import { sql, initDatabase } from "@/lib/db";
import dns from "dns";

async function hasGoogleMxRecords(domain: string): Promise<boolean> {
  const cleanDomain = domain.trim().toLowerCase();
  if (cleanDomain === "gmail.com" || cleanDomain === "googlemail.com") {
    return true;
  }
  try {
    const mxRecords = await dns.promises.resolveMx(cleanDomain);
    return mxRecords.some(
      (r) =>
        r.exchange.toLowerCase().includes("google.com") ||
        r.exchange.toLowerCase().includes("googlemail.com")
    );
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    await initDatabase();

    const body = await req.json();
    const {
      email: rawEmail,
      name: rawName,
      avatarUrl: rawAvatarUrl,
      phone: rawPhone,
      googleAccessToken,
      googleIdToken,
    } = body;

    let verifiedEmail = (rawEmail || "").trim().toLowerCase();
    let verifiedName = (rawName || "").trim();
    let verifiedAvatar = (rawAvatarUrl || "").trim();
    let isCryptographicallyVerified = false;

    // 1. Verify via Official Google OAuth 2.0 Access Token (Google Identity Services)
    if (googleAccessToken) {
      const googleRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${googleAccessToken}` },
      });

      if (!googleRes.ok) {
        return NextResponse.json(
          { error: "Google OAuth token verification failed. Please sign in with a valid Google account." },
          { status: 401 }
        );
      }

      const googleProfile = await googleRes.json();
      if (!googleProfile.email || !googleProfile.email_verified) {
        return NextResponse.json(
          { error: "Your Google Account email is not verified by Google." },
          { status: 401 }
        );
      }

      verifiedEmail = String(googleProfile.email).trim().toLowerCase();
      verifiedName = googleProfile.name || verifiedName || verifiedEmail.split("@")[0];
      verifiedAvatar = googleProfile.picture || verifiedAvatar;
      isCryptographicallyVerified = true;
    }

    // 2. Verify via Official Google ID Token (JWT Credential)
    if (!isCryptographicallyVerified && googleIdToken) {
      const tokenRes = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(googleIdToken)}`
      );

      if (!tokenRes.ok) {
        return NextResponse.json(
          { error: "Invalid Google ID Token. Please sign in again with Google." },
          { status: 401 }
        );
      }

      const tokenPayload = await tokenRes.json();
      if (!tokenPayload.email || tokenPayload.email_verified !== "true") {
        return NextResponse.json(
          { error: "Google email is not verified." },
          { status: 401 }
        );
      }

      verifiedEmail = String(tokenPayload.email).trim().toLowerCase();
      verifiedName = tokenPayload.name || verifiedName || verifiedEmail.split("@")[0];
      verifiedAvatar = tokenPayload.picture || verifiedAvatar;
      isCryptographicallyVerified = true;
    }

    if (!verifiedEmail || !verifiedEmail.includes("@")) {
      return NextResponse.json(
        { error: "A valid Google Mail ID is required to sign in." },
        { status: 400 }
      );
    }

    // 3. Enforce strict real Google Mail / Google Workspace check
    const [localPart, domainPart] = verifiedEmail.split("@");
    if (!localPart || !domainPart || localPart.length < 3) {
      return NextResponse.json(
        { error: "Invalid email format. Please sign in with your real Google Mail ID (@gmail.com)." },
        { status: 400 }
      );
    }

    // Check if this email already exists in inquiries or projects
    const [matchingInquiry, matchingProject] = await Promise.all([
      sql`SELECT id, name, phone, status FROM inquiries WHERE LOWER(email) = LOWER(${verifiedEmail}) ORDER BY created_at DESC LIMIT 1;`,
      sql`SELECT id, client_name FROM projects WHERE LOWER(client_email) = LOWER(${verifiedEmail}) LIMIT 1;`,
    ]);

    const isRegisteredClient = matchingInquiry.length > 0 || matchingProject.length > 0;

    // Verify that the email domain is really hosted on Google Mail (@gmail.com or Google Workspace MX)
    if (!isCryptographicallyVerified) {
      const isGoogleHosted = await hasGoogleMxRecords(domainPart);
      if (!isGoogleHosted && !isRegisteredClient) {
        return NextResponse.json(
          {
            error:
              "Access Restricted: Only real Google Mail (@gmail.com) or Google Workspace accounts are allowed on the Client Portal.",
          },
          { status: 403 }
        );
      }

      // Block obvious fake/placeholder Gmail handles unless explicitly created by Admin/Inquiry
      const blockedPlaceholders = ["test", "abc", "xyz", "fake", "demo", "user", "example", "123", "12345"];
      if (blockedPlaceholders.includes(localPart) && !isRegisteredClient) {
        return NextResponse.json(
          {
            error:
              "Please sign in using your real personal or business Google Mail ID (@gmail.com). Fake/placeholder addresses are blocked.",
          },
          { status: 403 }
        );
      }
    }

    // Auto-fill name and phone from inquiry or project if available
    const finalName =
      verifiedName ||
      matchingInquiry[0]?.name ||
      matchingProject[0]?.client_name ||
      localPart;
    const finalPhone =
      (rawPhone || "").trim() ||
      matchingInquiry[0]?.phone ||
      "";
    const finalAvatar =
      verifiedAvatar ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(finalName)}`;

    // 4. Upsert user in Neon DB with last_login = NOW()
    let users = await sql`
      SELECT id, name, email, role, avatar_url, phone, last_login, created_at
      FROM users
      WHERE LOWER(email) = LOWER(${verifiedEmail})
      LIMIT 1;
    `;

    if (users.length === 0) {
      users = await sql`
        INSERT INTO users (name, email, role, avatar_url, phone, last_login)
        VALUES (${finalName}, ${verifiedEmail}, 'CLIENT', ${finalAvatar}, ${finalPhone}, NOW())
        RETURNING id, name, email, role, avatar_url, phone, last_login, created_at;
      `;
    } else {
      users = await sql`
        UPDATE users
        SET
          last_login = NOW(),
          name = COALESCE(NULLIF(${finalName}, ''), name),
          phone = COALESCE(NULLIF(${finalPhone}, ''), phone),
          avatar_url = COALESCE(NULLIF(${finalAvatar}, ''), avatar_url)
        WHERE id = ${users[0].id}
        RETURNING id, name, email, role, avatar_url, phone, last_login, created_at;
      `;
    }

    return NextResponse.json({
      success: true,
      verifiedWithGoogleOAuth: isCryptographicallyVerified,
      user: users[0],
    });
  } catch (error: any) {
    console.error("Client Google Auth Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process Google authentication" },
      { status: 500 }
    );
  }
}
