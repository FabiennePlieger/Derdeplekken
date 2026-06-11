import { supabase } from "@/lib/supabase";
import type { Place } from "@/data/places";

// Zet een live_venues-rij om naar het Place-type van places.ts
function rowToPlace(row: Record<string, unknown>): Place {
  return {
    id: row.id as string,
    naam: row.naam as string,
    stad: row.stad as string,
    type: "horeca",
    beschrijving: (row.beschrijving as string) ?? "",
    adres: row.adres as string,
    coordinaten: {
      lat: Number(row.coordinaten_lat),
      lng: Number(row.coordinaten_lng),
    },
    openingstijden: (row.openingstijden as Place["openingstijden"]) ?? {},
    kosten: {
      gratis: row.kosten_gratis as boolean,
      indicatie: (row.kosten_indicatie as string) ?? undefined,
    },
    laptopvriendelijk: row.laptopvriendelijk as boolean,
    werkplekken: row.werkplekken as boolean,
    doelgroep: (row.doelgroep as "iedereen" | "studenten") ?? "iedereen",
    wifi: (row.wifi as boolean) ?? false,
    toiletten: (row.toiletten as boolean) ?? false,
    links: {
      website: (row.website as string) ?? undefined,
      googleMaps: (row.google_maps_url as string) ?? undefined,
    },
    deals: (row.deals as Place["deals"]) ?? [],
    verified: true,
  };
}

// Haal alle actieve horeca-plekken op uit de database.
// Gooit nooit een fout: bij een DB-fout of ontbrekende config geeft het een lege array terug.
export async function getLivePlaces(stad: string): Promise<Place[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("live_venues")
      .select("*")
      .eq("stad", stad)
      .eq("actief", true);
    if (error || !data) return [];
    return data.map(rowToPlace);
  } catch {
    return [];
  }
}
