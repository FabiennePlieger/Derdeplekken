import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function checkAdmin(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const auth = req.headers.get("authorization") ?? "";
  return auth === `Bearer ${secret}`;
}

// GET /api/admin/applications?status=aangevraagd
export async function GET(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  if (!supabaseAdmin) return NextResponse.json({ error: "DB niet geconfigureerd" }, { status: 503 });

  const status = req.nextUrl.searchParams.get("status") ?? "aangevraagd";
  const { data, error } = await supabaseAdmin
    .from("venue_applications")
    .select("*")
    .eq("status", status)
    .order("aangevraagd_op", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
