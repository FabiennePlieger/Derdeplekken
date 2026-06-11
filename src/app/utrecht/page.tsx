import type { Metadata } from "next";
import UtrechtClient from "./UtrechtClient";
import { getLivePlaces } from "@/lib/getLivePlaces";
import { places } from "@/data/places";
import type { Place } from "@/data/places";

export const metadata: Metadata = {
  title: "Derde plekken in Utrecht",
  description:
    "Vind open bibliotheken, buurtcentra en parken in Utrecht. Filter op type, gratis plekken en werkplekken. Actuele openingstijden.",
  openGraph: {
    title: "Derde plekken in Utrecht – Derdeplekken.nl",
    description: "Interactieve kaart met alle gratis en betaalbare derde plekken in Utrecht.",
    url: "https://derdeplekken.nl/utrecht",
  },
};

// Pagina wordt elke 5 minuten opnieuw gegenereerd zodat nieuwe deals snel zichtbaar zijn
export const revalidate = 300;

export default async function UtrechtPage() {
  const staticPlaces = places.filter((p: Place) => p.stad === "utrecht");
  const livePlaces = await getLivePlaces("utrecht");

  // Live DB-plekken overschrijven eventuele statische placeholder met hetzelfde id
  const staticIds = new Set(staticPlaces.map((p) => p.id));
  const merged = [...staticPlaces, ...livePlaces.filter((p) => !staticIds.has(p.id))];

  return <UtrechtClient allPlaces={merged} />;
}
