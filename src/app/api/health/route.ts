import { NextResponse } from "next/server";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  return NextResponse.json({
    status: "ok",
    db_url_set: !!dbUrl,
    db_url_prefix: dbUrl ? dbUrl.substring(0, 30) + "..." : "NOT SET",
    node_env: process.env.NODE_ENV,
  });
}
