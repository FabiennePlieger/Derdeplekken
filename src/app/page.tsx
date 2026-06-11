import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Users, BookOpen, TreePine, Coffee, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Derdeplekken.nl – Vind een plek om te verblijven in jouw stad",
  description:
    "Derde plekken zijn gratis of betaalbare publieke ruimtes buiten huis en werk. Bibliotheken, buurtcentra, parken en meer. Begin met Utrecht.",
  openGraph: {
    title: "Derdeplekken.nl – Vind een plek om te verblijven in jouw stad",
    description: "Gratis en betaalbare ontmoetingsplekken in Nederlandse steden. Begin met Utrecht.",
    url: "https://derdeplekken.nl",
  },
};

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <header
        className="relative overflow-hidden"
        style={{
          background: "var(--blauw-vlak)",
          borderRadius: "0 0 36px 36px",
          paddingTop: "56px",
          paddingBottom: "48px",
        }}
      >
        {/* Decorative SVG confetti */}
        <svg className="absolute opacity-90" style={{ top: 18, left: "4%" }} width="54" height="30" viewBox="0 0 54 30" aria-hidden="true">
          <path d="M2 22 Q10 4 18 16 T34 14 T52 8" fill="none" stroke="#0271a8" strokeWidth="7" strokeLinecap="round" />
        </svg>
        <svg className="absolute opacity-90" style={{ top: 30, right: "6%" }} width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" fill="#ff7f63" />
        </svg>
        <svg className="absolute opacity-90" style={{ bottom: 18, right: "14%" }} width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
          <circle cx="17" cy="17" r="13" fill="#8974d1" />
        </svg>
        <svg className="absolute opacity-90" style={{ bottom: 26, left: "14%" }} width="46" height="24" viewBox="0 0 46 24" aria-hidden="true">
          <path d="M3 12 Q12 22 23 12 T43 12" fill="none" stroke="#0e8c5f" strokeWidth="6" strokeLinecap="round" />
        </svg>

        <div className="max-w-3xl mx-auto px-5 relative">
          <h1
            className="font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 7vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            Derde plekken
          </h1>
          <p className="mt-3 text-lg max-w-sm">
            Plekken in jouw buurt waar je gewoon binnen kunt lopen. Gratis, voor iedereen.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/utrecht"
              className="inline-flex items-center gap-2 font-bold text-base px-6 py-3 rounded-full text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--inkt)", border: "2px solid var(--inkt)" }}
            >
              Ontdek derde plekken in Utrecht
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5">
        {/* What are third places */}
        <section className="mt-14">
          <span
            className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white"
            style={{ background: "var(--inkt)" }}
          >
            Wat zijn derde plekken?
          </span>
          <h2 className="text-2xl font-black tracking-tight">Niet thuis, niet op het werk — maar ergens daartussenin</h2>
          <p className="mt-3 text-base text-gray-700 max-w-2xl">
            De socioloog Ray Oldenburg noemde ze <em>third places</em>: publieke plekken waar mensen samenkomen los van thuis (eerste plek) en werk of school (tweede plek). Denk aan bibliotheken, buurthuizen en parken. Laagdrempelig, voor iedereen, betaalbaar of gratis.
          </p>
          <p className="mt-3 text-base text-gray-700 max-w-2xl">
            Derde plekken zijn cruciaal voor sociale cohesie, eenzaamheidsbestrijding en een levendige stad. Op dit platform vind je ze allemaal op één plek — met actuele openingstijden.
          </p>
          <Link
            href="/het-belang-van-derde-plekken"
            className="inline-flex items-center gap-1 mt-4 font-bold text-sm"
            style={{ color: "var(--blauw-diep)" }}
          >
            Lees meer over het belang van derde plekken <ArrowRight size={14} />
          </Link>
        </section>

        {/* Category overview */}
        <section className="mt-14">
          <span
            className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white"
            style={{ background: "var(--inkt)" }}
          >
            Typen plekken
          </span>
          <h2 className="text-2xl font-black tracking-tight">Wat vind je op de kaart?</h2>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: <BookOpen size={20} />,
                color: "#8974d1",
                label: "Bibliotheken",
                text: "Gratis, stil, met werkplekken en wifi. Perfecte studeerplekken.",
              },
              {
                icon: <Users size={20} />,
                color: "#ff7f63",
                label: "Buurtcentra",
                text: "Ontmoeten, activiteiten en een kop koffie. Vaak gratis of heel goedkoop.",
              },
              {
                icon: <TreePine size={20} />,
                color: "#56ddac",
                label: "Parken",
                text: "Gratis en altijd open. Buiten zijn, ook in de stad.",
              },
              {
                icon: <Coffee size={20} />,
                color: "#f9fa97",
                label: "Horeca (binnenkort)",
                text: "Cafés met speciale verblijfsdeals tijdens rustige uren.",
              },
            ].map((cat) => (
              <div
                key={cat.label}
                className="flex items-start gap-3 p-4 rounded-xl2 border-2 border-inkt"
                style={{ background: "#fff" }}
              >
                <span
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 border-inkt"
                  style={{ background: cat.color }}
                  aria-hidden="true"
                >
                  {cat.icon}
                </span>
                <div>
                  <p className="font-bold text-sm">{cat.label}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{cat.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* City selector */}
        <section className="mt-14 mb-20">
          <span
            className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white"
            style={{ background: "var(--inkt)" }}
          >
            Kies een stad
          </span>
          <h2 className="text-2xl font-black tracking-tight">Nu beschikbaar</h2>
          <div className="mt-5">
            <Link
              href="/utrecht"
              className="block border-2 border-inkt rounded-xl2 overflow-hidden hover:-translate-y-0.5 transition-transform"
              style={{ background: "#fff" }}
            >
              <div
                className="px-5 py-4 flex items-center justify-between text-white"
                style={{ background: "#cc0000" }}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={20} aria-hidden="true" />
                  <span className="font-black text-lg">Utrecht</span>
                </div>
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-extrabold"
                  style={{ background: "#fff", color: "#cc0000" }}
                >
                  Ontdek Utrecht
                </span>
              </div>
              <div className="px-5 py-3 text-sm text-gray-600">
                13 plekken · bibliotheken, buurtcentra, parken
              </div>
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">Meer steden volgen binnenkort.</p>
        </section>
      </div>
    </main>
  );
}
