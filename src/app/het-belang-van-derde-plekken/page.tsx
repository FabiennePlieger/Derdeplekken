import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Users, TreePine, Coffee } from "lucide-react";

export const metadata: Metadata = {
  title: "Het belang van derde plekken",
  description:
    "Wat zijn derde plekken en waarom zijn ze zo belangrijk voor sociale cohesie, eenzaamheidsbestrijding en betaalbare studieplekken in Utrecht en andere steden?",
  openGraph: {
    title: "Het belang van derde plekken",
    description: "Wat zijn third places en waarom zijn ze cruciaal voor een leefbare, sociale stad?",
    url: "https://derdeplekken.nl/het-belang-van-derde-plekken",
  },
};

const faqItems = [
  { question: "Wat is een derde plek?", answer: "Een derde plek (third place) is een publieke of semi-publieke ruimte die niet je thuis (eerste plek) of je werk/school (tweede plek) is. Denk aan bibliotheken, buurthuizen, parken, cafes en speeltuinen. De term werd geintroduceerd door socioloog Ray Oldenburg in zijn boek The Great Good Place (1989)." },
  { question: "Welke derde plekken zijn er in Utrecht?", answer: "In Utrecht zijn veel gratis derde plekken: de vestigingen van Bibliotheek Utrecht (o.a. Neude, Kanaleneiland, Overvecht), diverse buurtcentra zoals Buurtcentrum Lombok en Buurthuis Hoograven, en parken zoals het Griftpark, Wilhelminapark, Park Lepelenburg, Julianapark en Maximapark." },
  { question: "Zijn derde plekken altijd gratis?", answer: "De meeste derde plekken in Utrecht zijn gratis of vrijwel gratis toegankelijk. Bibliotheken en parken zijn altijd gratis. Sommige buurtcentra bieden activiteiten aan voor een kleine bijdrage." },
  { question: "Kan ik een derde plek gebruiken als studeer- of werkplek?", answer: "Absoluut. Met name bibliotheken zijn uitstekend als studeer- en werkplek: ze bieden gratis wifi, stille ruimtes, en werkplekken met stroomvoorziening. Op onze kaart kun je filteren op 'Laptop OK' om direct de juiste plekken te vinden." },
  { question: "Hoe weet ik of een derde plek op dit moment open is?", answer: "Op onze Utrecht-pagina zie je in een oogopslag welke plekken nu open zijn. Met de tijdkiezer kun je ook kijken welke plekken open zijn op een toekomstig moment." },
];

const categories = [
  { color: "#8974d1", bg: "#f0ecfb", icon: <BookOpen size={20} />, label: "Bibliotheken", text: "Gratis, stil, met werkplekken en wifi. Ideaal voor studeren en werken, voor iedereen toegankelijk." },
  { color: "#ff7f63", bg: "#fff0ed", icon: <Users size={20} />, label: "Buurtcentra", text: "Ontmoeting, activiteiten en een kop koffie. Vaak gratis of heel goedkoop, het hart van de wijk." },
  { color: "#56ddac", bg: "#edfaf4", icon: <TreePine size={20} />, label: "Parken", text: "Gratis, buiten, altijd open. Goed voor lichaam en geest, seizoensafhankelijk maar onmisbaar." },
  { color: "#c8a800", bg: "#fefce8", icon: <Coffee size={20} />, label: "Horeca (binnenkort)", text: "Cafes met verblijfsdeals tijdens rustige uren. Speciaal voor studenten en remote workers." },
];

export default function BelangPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ background: "var(--papier)" }}>
        <header className="relative overflow-hidden" style={{ background: "var(--blauw-vlak)", borderRadius: "0 0 36px 36px", padding: "56px 0 48px" }}>
          <svg className="absolute opacity-80" style={{ top: 20, right: "8%" }} width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" fill="#ff7f63" /></svg>
          <svg className="absolute opacity-70" style={{ bottom: 24, left: "5%" }} width="46" height="24" viewBox="0 0 46 24" aria-hidden="true"><path d="M3 12 Q12 22 23 12 T43 12" fill="none" stroke="#8974d1" strokeWidth="6" strokeLinecap="round" /></svg>
          <div className="max-w-4xl mx-auto px-6">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold mb-5" style={{ color: "var(--blauw-diep)" }}><ArrowLeft size={14} aria-hidden="true" /> Terug naar home</Link>
            <h1 className="font-black leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>Het belang van derde plekken</h1>
            <p className="mt-4 text-lg max-w-2xl text-gray-700">Wat zijn third places, waarom zijn ze zo cruciaal voor onze steden, en waar vind je ze in Utrecht?</p>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6">
          <section className="mt-14">
            <h2 className="text-2xl font-black tracking-tight">Wat zijn derde plekken?</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <p className="text-base text-gray-700 leading-relaxed">De term <em>third place</em>, in het Nederlands <em>derde plek</em>, werd geintroduceerd door de Amerikaanse socioloog Ray Oldenburg in zijn invloedrijke boek <em>The Great Good Place</em> (1989). Oldenburg onderscheidde drie soorten plekken in het leven van mensen: de eerste plek (thuis), de tweede plek (werk of school) en de derde plek: de publieke ruimte waar mensen vrijwillig samenkomen.</p>
                <p className="mt-4 text-base text-gray-700 leading-relaxed">Volgens Oldenburg kenmerken echte derde plekken zich door een aantal eigenschappen: ze zijn op neutraal terrein (niemand speelt heer en meester), toegankelijk voor iedereen, gericht op gesprek en ontmoeting, en bezocht door vaste gasten die een gemeenschapsgevoel creeren.</p>
              </div>
              <div className="rounded-xl2 border-2 border-inkt overflow-hidden" style={{ aspectRatio: "4/3", background: "var(--blauw-vlak)" }}>
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500">
                  <span className="text-4xl" aria-hidden="true">📸</span>
                  <p className="text-xs font-bold uppercase tracking-widest">Foto: bibliotheek</p>
                </div>
              </div>
            </div>
          </section>

          <blockquote className="mt-14 p-8 rounded-xl2 border-2 border-inkt" style={{ background: "var(--blauw-vlak)" }}>
            <p className="text-xl font-black leading-snug tracking-tight">"The third place is a generic designation for a great variety of public places that host the regular, voluntary, informal, and happily anticipated gatherings of individuals beyond the realms of home and work."</p>
            <footer className="mt-3 text-sm font-bold text-gray-600">Ray Oldenburg, <em>The Great Good Place</em> (1989)</footer>
          </blockquote>

          <section className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="rounded-xl2 border-2 border-inkt overflow-hidden order-2 md:order-1" style={{ aspectRatio: "4/3", background: "#f0f0ea" }}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500">
                <span className="text-4xl" aria-hidden="true">📸</span>
                <p className="text-xs font-bold uppercase tracking-widest">Foto: ontmoeting</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-black tracking-tight">Sociale cohesie en gemeenschapsvorming</h2>
              <p className="mt-4 text-base text-gray-700 leading-relaxed">De politicoloog Robert Putnam liet in zijn studie <em>Bowling Alone</em> (2000) zien hoe sociaal kapitaal, de netwerken, normen en het vertrouwen dat mensen verbindt, in de twintigste eeuw sterk is afgenomen. Putnam analyseerde hoe mensen steeds meer in isolement zijn gaan leven: minder lid van verenigingen, minder actief in de buurt, minder sociale contacten.</p>
              <p className="mt-4 text-base text-gray-700 leading-relaxed">Derde plekken zijn juist plekken waar sociaal kapitaal wordt opgebouwd. Wanneer een buurtbewoner elke week naar de bibliotheek gaat en daar de bibliotheekmedewerker, de student met zijn laptop en de gepensioneerde met zijn krant tegenkomt, ontstaat een informeel netwerk van bekenden.</p>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-black tracking-tight">Eenzaamheid: een groeiend maatschappelijk probleem</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <p className="text-base text-gray-700 leading-relaxed">Eenzaamheid is in Nederland een serieus volksgezondheidsvraagstuk. Uit de <em>Sociale Staat van Nederland</em> (Sociaal en Cultureel Planbureau) blijkt dat een aanzienlijk deel van de Nederlanders zich matig tot ernstig eenzaam voelt. Eenzaamheid neemt toe met de leeftijd, maar ook onder jongvolwassenen en studenten is het een groeiend probleem.</p>
                <p className="mt-4 text-base text-gray-700 leading-relaxed">Derde plekken zijn bij uitstek geschikt om eenzaamheid te doorbreken: ze zijn laagdrempelig (je hoeft niet te reserveren), gratis of goedkoop (geen financiele drempel), en sociaal van aard (ontmoeting staat centraal).</p>
              </div>
              <div className="rounded-xl2 border-2 border-inkt p-6 flex flex-col gap-2 justify-center" style={{ background: "var(--koraal)" }}>
                <p className="text-4xl font-black">1 op 4</p>
                <p className="text-sm font-bold leading-snug">Nederlanders voelt zich (matig) eenzaam</p>
                <p className="text-xs text-gray-700 mt-1">Bron: SCP, Sociale Staat van Nederland</p>
              </div>
            </div>
          </section>

          <blockquote className="mt-14 p-8 rounded-xl2 border-2 border-inkt" style={{ background: "var(--geel-vlak)" }}>
            <p className="text-xl font-black leading-snug tracking-tight">"Een wijk met een goed functionerend buurthuis, een bibliotheek en een fijn park is een wijk waar mensen graag wonen, waar criminaliteit lager is en waar bewoners meer betrokken zijn."</p>
            <footer className="mt-3 text-sm font-bold text-gray-600">Gebaseerd op Robert Putnam, <em>Bowling Alone</em> (2000)</footer>
          </blockquote>

          <section className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <h2 className="text-2xl font-black tracking-tight">Betaalbare studieplekken en werkruimte</h2>
              <p className="mt-4 text-base text-gray-700 leading-relaxed">Voor studenten en zzp'ers zijn derde plekken van onschatbare waarde. Niet iedereen heeft thuis een rustige werkkamer; in gedeelde studentenkamers en kleine appartementen is concentreren lastig. Bibliotheken bieden een gratis alternatief: stilteruimtes, werkplekken met stroom, en gratis wifi.</p>
              <p className="mt-4 text-base text-gray-700 leading-relaxed">In Utrecht zijn de vestigingen van Bibliotheek Utrecht, met name de centrale vestiging op de Neude, populaire studieplekken voor studenten van de Universiteit Utrecht en de Hogeschool Utrecht. Het feit dat deze plekken <strong>gratis</strong> zijn, is cruciaal.</p>
            </div>
            <div className="rounded-xl2 border-2 border-inkt overflow-hidden" style={{ aspectRatio: "4/3", background: "#e8e4f0" }}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500">
                <span className="text-4xl" aria-hidden="true">📸</span>
                <p className="text-xs font-bold uppercase tracking-widest">Foto: studeerplekken</p>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-black tracking-tight mb-6">De typen derde plekken</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div key={cat.label} className="flex items-start gap-4 p-5 rounded-xl2 border-2 border-inkt" style={{ background: cat.bg }}>
                  <span className="w-10 h-10 rounded-full border-2 border-inkt flex items-center justify-center flex-shrink-0" style={{ background: cat.color }} aria-hidden="true">{cat.icon}</span>
                  <div>
                    <p className="font-black text-base">{cat.label}</p>
                    <p className="text-sm text-gray-700 mt-1">{cat.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="rounded-xl2 border-2 border-inkt overflow-hidden" style={{ aspectRatio: "4/3", background: "#e4f4ec" }}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500">
                <span className="text-4xl" aria-hidden="true">📸</span>
                <p className="text-xs font-bold uppercase tracking-widest">Foto: park Utrecht</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Derde plekken en mentale gezondheid</h2>
              <p className="mt-4 text-base text-gray-700 leading-relaxed">Buiten zijn, bewegen en sociaal contact zijn drie pijlers van mentale gezondheid die wetenschappelijk goed onderbouwd zijn. Parken als het Griftpark, Wilhelminapark en Maximapark in Utrecht zijn gratis, altijd toegankelijk en bieden precies dit.</p>
              <p className="mt-4 text-base text-gray-700 leading-relaxed">Steden die investeren in groene, toegankelijke publieke ruimte investeren direct in de volksgezondheid. De combinatie van natuur, beweging en toevallige ontmoetingen maakt parken tot misschien wel de meest democratische derde plekken die er zijn.</p>
            </div>
          </section>

          <section className="mt-14 p-8 rounded-xl2 border-2 border-inkt" style={{ background: "var(--blauw-vlak)" }}>
            <h2 className="text-2xl font-black tracking-tight">Derde plekken in Utrecht</h2>
            <p className="mt-3 text-base text-gray-700">Op onze interactieve kaart vind je alle bibliotheken, buurtcentra en parken in de stad, met actuele openingstijden en filters.</p>
            <ul className="mt-4 space-y-2">
              {["Bibliotheek Utrecht Neude: de grootste vestiging, open tot 21:00 door de week, met uitgebreide studeer- en werkfaciliteiten.","Griftpark en Wilhelminapark: altijd open, gratis, en geliefd bij studenten en gezinnen.","Buurtcentrum Lombok: laagdrempelig buurthuis in een van de meest diverse wijken van Utrecht.","Maximapark: het grootste stadspark van Utrecht, meer dan 100 hectare in Leidsche Rijn."].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--blauw-diep)" }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/utrecht" className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-full text-white" style={{ background: "var(--inkt)", border: "2px solid var(--inkt)" }}>Bekijk de kaart voor Utrecht</Link>
            </div>
          </section>

          <section className="mt-14 mb-20">
            <h2 className="text-2xl font-black tracking-tight mb-6" id="faq">Veelgestelde vragen</h2>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="border-2 border-inkt rounded-xl2 overflow-hidden group">
                  <summary className="p-4 font-bold cursor-pointer list-none flex items-center justify-between" style={{ background: "var(--blauw-vlak)" }}>
                    {item.question}
                    <span className="text-lg font-black group-open:rotate-45 transition-transform inline-block">+</span>
                  </summary>
                  <div className="p-4 bg-white text-sm text-gray-700 leading-relaxed">{item.answer}</div>
                </details>
              ))}
            </div>
            <div className="mt-10 flex gap-3 flex-wrap">
              <Link href="/" className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-full" style={{ border: "2px solid var(--inkt)", background: "#fff" }}><ArrowLeft size={14} /> Terug naar home</Link>
              <Link href="/over-derde-plekken" className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-full" style={{ border: "2px solid var(--inkt)", background: "#fff" }}>Over dit platform</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
