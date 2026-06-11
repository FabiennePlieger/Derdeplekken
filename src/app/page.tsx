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
      <header
        className="relative overflow-hidden"
        style={{
          background: "var(--blauw-vlak)",
          borderRadius: "0 0 36px 36px",
          paddingTop: "64px",
          paddingBottom: "56px",
        }}
      >
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

        <div className="max-w-6xl mx-auto px-6 relative">
          <h1
            className="font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(2.6rem, 7vw, 4.5rem)", letterSpacing: "-0.02em" }}
          >
            Derde plekken
          </h1>
          <p className="mt-4 text-xl max-w-lg">
            Plekken in jouw buurt waar je gewoon binnen kunt lopen. Gratis, voor iedereen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/utrecht"
              className="inline-flex items-center gap-2 font-bold text-base px-7 py-3.5 rounded-full text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--inkt)", border: "2px solid var(--inkt)" }}
            >
              Ontdek derde plekken in Utrecht
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              href="/over-derde-plekken"
              className="inline-flex items-center gap-2 font-bold text-base px-7 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
              style={{ border: "2px solid var(--inkt)", background: "#fff" }}
            >
              Wat zijn derde plekken?
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6">
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <span
              className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white"
              style={{ background: "var(--inkt)" }}
            >
              Wat is dit?
            </span>
            <h2 className="text-3xl font-black tracking-tight leading-tight">
              Niet thuis, niet op het werk, maar ergens daartussenin
            </h2>
            <p className="mt-4 text-base text-gray-700">
              De socioloog Ray Oldenburg noemde ze <em>third places</em>: publieke plekken waar mensen samenkomen los van thuis en werk. Denk aan bibliotheken, buurthuizen en parken. Laagdrempelig, voor iedereen, betaalbaar of gratis.
            </p>
            <p className="mt-3 text-base text-gray-700">
              Derde plekken zijn cruciaal voor sociale cohesie, eenzaamheidsbestrijding en een levendige stad. Op dit platform vind je ze allemaal op een plek, met actuele openingstijden.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/het-belang-van-derde-plekken" className="inline-flex items-center gap-1 font-bold text-sm" style={{ color: "var(--blauw-diep)" }}>
                Lees het achtergrondverhaal <ArrowRight size={14} />
              </Link>
              <Link href="/over-derde-plekken" className="inline-flex items-center gap-1 font-bold text-sm" style={{ color: "var(--blauw-diep)" }}>
                Over dit platform <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "13", label: "plekken in Utrecht", color: "var(--blauw-vlak)" },
              { num: "100%", label: "gratis toegang", color: "var(--groen-vlak)" },
              { num: "7 dgn", label: "openingstijden vooruit", color: "var(--geel-vlak)" },
              { num: "1 stad", label: "meer steden volgen", color: "var(--koraal)" },
            ].map((stat) => (
              <div key={stat.label} className="p-5 rounded-xl2 border-2 border-inkt" style={{ background: stat.color }}>
                <p className="text-3xl font-black">{stat.num}</p>
                <p className="text-sm font-bold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <span
            className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white"
            style={{ background: "var(--inkt)" }}
          >
            Typen plekken
          </span>
          <h2 className="text-3xl font-black tracking-tight">Wat vind je op de kaart?</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <BookOpen size={22} />, color: "#8974d1", label: "Bibliotheken", text: "Gratis, stil, met werkplekken en wifi. Perfecte studeerplekken." },
              { icon: <Users size={22} />, color: "#ff7f63", label: "Buurtcentra", text: "Ontmoeten, activiteiten en een kop koffie. Vaak gratis of heel goedkoop." },
              { icon: <TreePine size={22} />, color: "#56ddac", label: "Parken", text: "Gratis en altijd open. Buiten zijn, ook in de stad." },
              { icon: <Coffee size={22} />, color: "#f9fa97", label: "Horeca (binnenkort)", text: "Cafes met speciale verblijfsdeals tijdens rustige uren." },
            ].map((cat) => (
              <div key={cat.label} className="flex flex-col gap-3 p-5 rounded-xl2 border-2 border-inkt hover:-translate-y-0.5 transition-transform" style={{ background: "#fff" }}>
                <span className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-inkt" style={{ background: cat.color }} aria-hidden="true">
                  {cat.icon}
                </span>
                <p className="font-black text-base">{cat.label}</p>
                <p className="text-sm text-gray-600">{cat.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 mb-24">
          <span
            className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white"
            style={{ background: "var(--inkt)" }}
          >
            Kies een stad
          </span>
          <h2 className="text-3xl font-black tracking-tight">Nu beschikbaar</h2>
          <div className="mt-6 max-w-lg">
            <Link href="/utrecht" className="block border-2 border-inkt rounded-xl2 overflow-hidden hover:-translate-y-0.5 transition-transform" style={{ background: "#fff" }}>
              <div className="px-6 py-5 flex items-center justify-between text-white" style={{ background: "#cc0000" }}>
                <div className="flex items-center gap-2">
                  <MapPin size={20} aria-hidden="true" />
                  <span className="font-black text-xl">Utrecht</span>
                </div>
                <span className="px-5 py-2 rounded-full text-sm font-extrabold" style={{ background: "#fff", color: "#cc0000" }}>Ontdek Utrecht</span>
              </div>
              <div className="px-6 py-4 text-sm text-gray-600">13 plekken: bibliotheken, buurtcentra en parken</div>
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">Meer steden volgen binnenkort.</p>
        </section>
      </div>
    </main>
  );
}
