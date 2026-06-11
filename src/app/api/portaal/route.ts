import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { voldoetAanDerdePlekRegels } from "@/lib/derdeplekregelcheck";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Ongeldig verzoek" }, { status: 400 });

  const {
    naam, adres, stad = "utrecht",
    contactNaam, contactEmail,
    website, googleMapsUrl,
    googleSync, openingstijden,
    regelEigenEten, regelDealKorting,
    dealTitel, dealBeschrijving, dealPrijs,
    dealVan, dealTot, dealDagen, dealDoelgroep,
    toelichting,
  } = body;

  // Validatie
  if (!naam?.trim()) return NextResponse.json({ error: "Naam is verplicht" }, { status: 422 });
  if (!adres?.trim()) return NextResponse.json({ error: "Adres is verplicht" }, { status: 422 });
  if (!contactEmail?.trim()) return NextResponse.json({ error: "E-mailadres is verplicht" }, { status: 422 });

  if (!voldoetAanDerdePlekRegels({ regelEigenEten: !!regelEigenEten, regelDealKorting: !!regelDealKorting })) {
    return NextResponse.json(
      { error: "Je zaak moet aan minimaal één derde-plek-regel voldoen." },
      { status: 422 }
    );
  }

  if (regelDealKorting && !dealTitel?.trim()) {
    return NextResponse.json(
      { error: "Vul een omschrijving in van de deal." },
      { status: 422 }
    );
  }

  if (!supabase) {
    // Geen DB geconfigureerd — stuur mail als fallback
    return NextResponse.json(
      { ok: false, fallback: true, message: "Database niet geconfigureerd. Gebruik het e-mailformulier." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase.from("venue_applications").insert({
    naam: naam.trim(),
    adres: adres.trim(),
    stad,
    contact_naam: contactNaam?.trim() || null,
    contact_email: contactEmail.trim(),
    website: website?.trim() || null,
    google_maps_url: googleMapsUrl?.trim() || null,
    google_sync: !!googleSync,
    openingstijden: openingstijden || null,
    regel_eigen_eten: !!regelEigenEten,
    regel_deal_korting: !!regelDealKorting,
    deal_titel: dealTitel?.trim() || null,
    deal_beschrijving: dealBeschrijving?.trim() || null,
    deal_prijs: dealPrijs?.trim() || null,
    deal_van: dealVan || null,
    deal_tot: dealTot || null,
    deal_dagen: dealDagen || [],
    deal_doelgroep: dealDoelgroep || "studenten",
    toelichting: toelichting?.trim() || null,
  }).select("id").single();

  if (error) {
    console.error("[portaal] insert error", error);
    return NextResponse.json({ error: "Opslaan mislukt, probeer het later opnieuw." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id });
}
