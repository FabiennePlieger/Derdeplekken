import type { Metadata } from "next";
import UtrechtClient from "./UtrechtClient";

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

export default function UtrechtPage() {
  return <UtrechtClient />;
}
