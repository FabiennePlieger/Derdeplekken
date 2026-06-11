import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function checkAdmin(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

// PATCH /api/admin/applications/:id
// Body: { status: 'goedgekeurd' | 'afgewezen', adminNotitie?, liveVenue? }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdmin(req)) return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  if (!supabaseAdmin) return NextResponse.json({ error: "DB niet geconfigureerd" }, { status: 503 });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const { status, adminNotitie, liveVenue } = body;

  if (!["goedgekeurd", "afgewezen"].includes(status)) {
    return NextResponse.json({ error: "Ongeldige status" }, { status: 422 });
  }

  // Bijwerken van de aanvraag
  const { error: appError } = await supabaseAdmin
    .from("venue_applications")
    .update({ status, admin_notitie: adminNotitie ?? null, beoordeeld_op: new Date().toISOString() })
    .eq("id", id);

  if (appError) return NextResponse.json({ error: appError.message }, { status: 500 });

  // Bij goedkeuring: schrijf naar live_venues als liveVenue meegestuurd
  if (status === "goedgekeurd" && liveVenue) {
    const { error: liveError } = await supabaseAdmin
      .from("live_venues")
      .upsert({ ...liveVenue, application_id: id });
    if (liveError) return NextResponse.json({ error: liveError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
