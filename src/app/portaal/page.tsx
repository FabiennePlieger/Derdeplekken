import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, RefreshCw, Tag } from "lucide-react";
import PortaalForm from "./PortaalForm";

export const metadata: Metadata = {
  title: "Portaal voor horeca | Derdeplekken.nl",
  description:
    "Heb je een café of horecazaak in Utrecht? Meld je aan bij Derdeplekken.nl, geef je openingstijden door en bied verblijfsdeals aan voor studenten of alle bezoekers.",
  openGraph: {
    title: "Portaal voor horeca | Derdeplekken.nl",
    description: "Zet jouw zaak op de kaart met openingstijden en verblijfsdeals.",
    url: "https://derdeplekken.nl/portaal",
  },
};

const voordelen = [
  {
    icon: <Clock size={18} />,
    bg: "var(--blauw-vlak)",
    title: "Actuele openingstijden",
    text: "Geef je openingstijden eenmalig door of laat ze automatisch meelopen met je Google Maps-profiel.",
  },
  {
    icon: <Tag size={18} />,
    bg: "var(--geel-vlak)",
    title: "Verblijfsdeals",
    text: "Vul je rustige uren met gasten die langer blijven. Jij bepaalt de tijden, de prijs en voor wie de deal geldt.",
  },
  {
    icon: <RefreshCw size={18} />,
    bg: "var(--groen-vlak)",
    title: "Zelf beheren",
    text: "Wijzigingen doorgeven kan altijd. Een eigen inlogomgeving om alles zelf aan te passen is in ontwikkeling.",
  },
];

export default function PortaalPage() {
  return (
    <div style={{ background: "var(--papier)" }}>
      {/* Hero */}
      <header
        className="relative overflow-hidden"
        style={{ background: "var(--geel-vlak)", borderRadius: "0 0 36px 36px", padding: "56px 0 48px" }}
      >
        <svg className="absolute opacity-80" style={{ top: 20, right: "8%" }} width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" fill="#ff7f63" />
        </svg>
        <svg className="absolute opacity-70" style={{ bottom: 20, left: "6%" }} width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
          <circle cx="17" cy="17" r="13" fill="#8974d1" />
        </svg>
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold mb-5" style={{ color: "var(--geel-tekst, #8a7500)" }}>
            <ArrowLeft size={14} /> Terug naar home
          </Link>
          <span className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white" style={{ background: "var(--inkt)" }}>
            Voor horeca
          </span>
          <h1 className="font-black leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
            Zet jouw zaak op de kaart
          </h1>
          <p className="mt-4 text-lg max-w-2xl text-gray-700">
            Heb je een café, lunchroom of restaurant in Utrecht? Via dit portaal geef je je openingstijden door en bied je verblijfsdeals aan, voor studenten of voor alle bezoekers.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6">
        {/* Voordelen */}
        <section className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {voordelen.map((v) => (
            <div key={v.title} className="p-5 rounded-xl2 border-2 border-inkt" style={{ background: v.bg }}>
              <span className="w-9 h-9 rounded-full border-2 border-inkt flex items-center justify-center bg-white" aria-hidden="true">
                {v.icon}
              </span>
              <p className="font-black text-sm mt-3">{v.title}</p>
              <p className="text-sm text-gray-700 mt-1">{v.text}</p>
            </div>
          ))}
        </section>

        {/* Google Maps sync */}
        <section className="mt-12 p-6 rounded-xl2 border-2 border-inkt bg-white">
          <h2 className="text-xl font-black tracking-tight">Automatisch synchroniseren met Google Maps</h2>
          <p className="mt-3 text-base text-gray-700 leading-relaxed">
            Houd je je openingstijden al bij in je Google Bedrijfsprofiel? Dan hoef je ze hier niet dubbel te beheren. Vink in het formulier hieronder aan dat we je tijden uit Google Maps mogen overnemen en we houden ze automatisch actueel. Je deals beheer je wel altijd via Derdeplekken.nl, die staan niet op Google.
          </p>
        </section>

        {/* Aanmeldformulier */}
        <section className="mt-12 mb-24">
          <span className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white" style={{ background: "var(--inkt)" }}>
            Aanmelden
          </span>
          <h2 className="text-2xl font-black tracking-tight">Meld je zaak aan</h2>
          <p className="mt-3 text-base text-gray-700 max-w-2xl">
            Vul het formulier in en we nemen binnen een paar dagen contact op. Aanmelden is gratis. Zodra de eigen inlogomgeving live is, krijg je als eerste toegang om je gegevens zelf te beheren.
          </p>
          <div className="mt-6">
            <PortaalForm />
          </div>
        </section>
      </div>
    </div>
  );
}
