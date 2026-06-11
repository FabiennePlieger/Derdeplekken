import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, BookOpen, Users, TreePine, Coffee, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Over Derdeplekken.nl",
  description:
    "Derdeplekken.nl helpt mensen gratis en betaalbare ontmoetingsplekken te vinden in Nederlandse steden. Lees meer over het project, de missie en hoe je kunt bijdragen.",
  openGraph: {
    title: "Over Derdeplekken.nl",
    description: "Een platform voor iedereen die op zoek is naar een fijne plek buiten huis en werk.",
    url: "https://derdeplekken.nl/over-derde-plekken",
  },
};

const tijdlijn = [
  { jaar: "2024", tekst: "Idee: een kaart van alle gratis derde plekken in Utrecht." },
  { jaar: "2025", tekst: "Derdeplekken.nl live met Utrecht: 13 plekken, interactieve kaart, actuele openingstijden." },
  { jaar: "Soon", tekst: "Meer steden, horecadeals voor studenten, bijdragen van bewoners." },
];

const categorieen = [
  { color: "#8974d1", bg: "#f0ecfb", icon: <BookOpen size={18} />, label: "Bibliotheken", sub: "Gratis werkplek met wifi" },
  { color: "#ff7f63", bg: "#fff0ed", icon: <Users size={18} />, label: "Buurtcentra", sub: "Laagdrempelige ontmoeting" },
  { color: "#56ddac", bg: "#edfaf4", icon: <TreePine size={18} />, label: "Parken", sub: "Altijd open, altijd gratis" },
  { color: "#c8a800", bg: "#fefce8", icon: <Coffee size={18} />, label: "Horeca (binnenkort)", sub: "Deals voor studenten" },
];

export default function OverPage() {
  return (
    <div style={{ background: "var(--papier)" }}>
      <header className="relative overflow-hidden" style={{ background: "var(--blauw-vlak)", borderRadius: "0 0 36px 36px", padding: "56px 0 48px" }}>
        <svg className="absolute opacity-80" style={{ top: 20, right: "8%" }} width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
          <circle cx="17" cy="17" r="13" fill="#8974d1" />
        </svg>
        <svg className="absolute opacity-70" style={{ bottom: 20, left: "6%" }} width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" fill="#ff7f63" />
        </svg>
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold mb-5" style={{ color: "var(--blauw-diep)" }}>
            <ArrowLeft size={14} /> Terug naar home
          </Link>
          <h1 className="font-black leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>Over Derdeplekken.nl</h1>
          <p className="mt-4 text-lg max-w-2xl text-gray-700">Een platform voor iedereen die op zoek is naar een fijne plek buiten huis en werk. Gratis, voor iedereen, in elke stad.</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6">
        <section className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <span className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white" style={{ background: "var(--inkt)" }}>Missie</span>
            <h2 className="text-2xl font-black tracking-tight">Derde plekken zichtbaar maken</h2>
            <p className="mt-4 text-base text-gray-700 leading-relaxed">Veel mensen weten niet dat er vlakbij hun huis een bibliotheek is die tot 21:00 open is, of een park dat altijd toegankelijk is. Derdeplekken.nl maakt die plekken zichtbaar op een overzichtelijke, interactieve kaart.</p>
            <p className="mt-4 text-base text-gray-700 leading-relaxed">We richten ons op mensen die een rustige plek zoeken om te werken of studeren, bewoners die hun wijk beter willen leren kennen, en iedereen die op zoek is naar verbinding buiten de muren van huis of kantoor.</p>
          </div>
          <div className="space-y-4">
            {[
              { title: "Gratis of goedkoop", text: "We tonen alleen plekken die toegankelijk zijn voor iedereen, ongeacht budget.", bg: "var(--blauw-vlak)" },
              { title: "Actuele openingstijden", text: "Geen frustraties van een dichte deur. Je ziet direct of een plek nu open is.", bg: "var(--groen-vlak)" },
              { title: "Geen advertenties", text: "Dit is een community-project, geen commercieel platform.", bg: "var(--geel-vlak)" },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl2 border-2 border-inkt" style={{ background: item.bg }}>
                <p className="font-black text-sm">{item.title}</p>
                <p className="text-sm text-gray-700 mt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <span className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white" style={{ background: "var(--inkt)" }}>Wat staat op de kaart</span>
          <h2 className="text-2xl font-black tracking-tight">Typen plekken</h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {categorieen.map((cat) => (
              <div key={cat.label} className="p-4 rounded-xl2 border-2 border-inkt flex flex-col gap-3" style={{ background: cat.bg }}>
                <span className="w-9 h-9 rounded-full border-2 border-inkt flex items-center justify-center" style={{ background: cat.color }} aria-hidden="true">{cat.icon}</span>
                <div>
                  <p className="font-black text-sm">{cat.label}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{cat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <span className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white" style={{ background: "var(--inkt)" }}>Steden</span>
          <h2 className="text-2xl font-black tracking-tight">Nu beschikbaar in Utrecht</h2>
          <div className="mt-6">
            <Link href="/utrecht" className="block max-w-sm border-2 border-inkt rounded-xl2 overflow-hidden hover:-translate-y-0.5 transition-transform" style={{ background: "#fff" }}>
              <div className="px-5 py-4 flex items-center justify-between text-white" style={{ background: "#cc0000" }}>
                <div className="flex items-center gap-2"><MapPin size={18} /><span className="font-black text-lg">Utrecht</span></div>
                <span className="px-4 py-1.5 rounded-full text-sm font-extrabold" style={{ background: "#fff", color: "#cc0000" }}>Bekijk kaart</span>
              </div>
              <div className="px-5 py-3 text-sm text-gray-600">13 plekken: bibliotheken, buurtcentra en parken</div>
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">Amsterdam, Rotterdam en andere steden volgen binnenkort.</p>
        </section>

        <section className="mt-16">
          <span className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white" style={{ background: "var(--inkt)" }}>Tijdlijn</span>
          <h2 className="text-2xl font-black tracking-tight">Hoe we hier gekomen zijn</h2>
          <div className="mt-6 space-y-0">
            {tijdlijn.map((item, i) => (
              <div key={item.jaar} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-inkt flex items-center justify-center font-black text-xs flex-shrink-0" style={{ background: i === tijdlijn.length - 1 ? "var(--koraal)" : "var(--blauw-vlak)" }}>{item.jaar}</div>
                  {i < tijdlijn.length - 1 && <div className="w-0.5 flex-1 my-1" style={{ background: "var(--inkt)", minHeight: 24 }} />}
                </div>
                <div className="pt-2 pb-6"><p className="text-base text-gray-700">{item.tekst}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 mb-24 p-8 rounded-xl2 border-2 border-inkt" style={{ background: "var(--blauw-vlak)" }}>
          <h2 className="text-2xl font-black tracking-tight">Bijdragen of contact</h2>
          <p className="mt-3 text-base text-gray-700">Ken je een derde plek die nog niet op de kaart staat? Of wil je als organisatie je plek toevoegen of een deal aanbieden? Neem contact op, we horen het graag.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="mailto:hallo@derdeplekken.nl" className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-full text-white" style={{ background: "var(--inkt)", border: "2px solid var(--inkt)" }}>
              <Mail size={14} /> hallo@derdeplekken.nl
            </a>
            <Link href="/het-belang-van-derde-plekken" className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-full" style={{ border: "2px solid var(--inkt)", background: "#fff" }}>
              Achtergrondverhaal <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
