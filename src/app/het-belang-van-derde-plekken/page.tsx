import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Het belang van derde plekken – sociale cohesie, eenzaamheid en studieplekken",
  description:
    "Wat zijn derde plekken en waarom zijn ze zo belangrijk voor sociale cohesie, eenzaamheidsbestrijding en betaalbare studieplekken in Utrecht en andere steden?",
  openGraph: {
    title: "Het belang van derde plekken",
    description:
      "Wat zijn third places en waarom zijn ze cruciaal voor een leefbare, sociale stad? Lees het uitgebreide artikel op Derdeplekken.nl.",
    url: "https://derdeplekken.nl/het-belang-van-derde-plekken",
  },
};

const faqItems = [
  {
    question: "Wat is een derde plek?",
    answer:
      "Een derde plek (third place) is een publieke of semi-publieke ruimte die niet je thuis (eerste plek) of je werk/school (tweede plek) is. Denk aan bibliotheken, buurthuizen, parken, cafés en speeltuinen. De term werd geïntroduceerd door socioloog Ray Oldenburg in zijn boek The Great Good Place (1989).",
  },
  {
    question: "Welke derde plekken zijn er in Utrecht?",
    answer:
      "In Utrecht zijn veel gratis derde plekken: de vestigingen van Bibliotheek Utrecht (o.a. Neude, Kanaleneiland, Overvecht), diverse buurtcentra zoals Buurtcentrum Lombok en Buurthuis Hoograven, en parken zoals het Griftpark, Wilhelminapark, Park Lepelenburg, Julianapark en Maximapark. Bekijk de volledige kaart op onze Utrecht-pagina.",
  },
  {
    question: "Zijn derde plekken altijd gratis?",
    answer:
      "De meeste derde plekken in Utrecht zijn gratis of vrijwel gratis toegankelijk. Bibliotheken en parken zijn altijd gratis. Sommige buurtcentra bieden activiteiten aan voor een kleine bijdrage. In de toekomst voegen we ook horecaplekken toe met speciale verblijfsdeals voor studenten en anderen.",
  },
  {
    question: "Kan ik een derde plek gebruiken als studeer- of werkplek?",
    answer:
      "Absoluut. Met name bibliotheken zijn uitstekend als studeer- en werkplek: ze bieden gratis wifi, stille ruimtes, en werkplekken met stroomvoorziening. Op onze kaart kun je filteren op 'Laptop OK' om direct de juiste plekken te vinden.",
  },
  {
    question: "Hoe weet ik of een derde plek op dit moment open is?",
    answer:
      "Op onze Utrecht-pagina zie je in één oogopslag welke plekken nu open zijn, op basis van de actuele openingstijden. Met de tijdkiezer kun je ook kijken welke plekken open zijn op een toekomstig moment — handig voor wanneer je wilt plannen.",
  },
];

export default function BelangPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: "var(--papier)" }} className="min-h-screen">
        {/* Header */}
        <header
          className="relative overflow-hidden"
          style={{
            background: "var(--blauw-vlak)",
            borderRadius: "0 0 36px 36px",
            padding: "48px 0 40px",
          }}
        >
          <svg className="absolute opacity-80" style={{ top: 20, right: "8%" }} width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
            <path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" fill="#ff7f63" />
          </svg>
          <div className="max-w-2xl mx-auto px-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-bold mb-4"
              style={{ color: "var(--blauw-diep)" }}
            >
              <ArrowLeft size={14} aria-hidden="true" /> Terug naar home
            </Link>
            <h1 className="font-black leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              Het belang van derde plekken
            </h1>
            <p className="mt-3 text-base max-w-xl">
              Wat zijn third places, waarom zijn ze zo cruciaal voor onze steden, en waar vind je ze in Utrecht?
            </p>
          </div>
        </header>

        <article className="max-w-2xl mx-auto px-5 py-12 prose prose-gray max-w-none">
          <h2>Wat zijn derde plekken?</h2>
          <p>
            De term <em>third place</em> — in het Nederlands <em>derde plek</em> — werd geïntroduceerd door de Amerikaanse socioloog Ray Oldenburg in zijn invloedrijke boek <em>The Great Good Place</em> (1989). Oldenburg onderscheidde drie soorten plekken in het leven van mensen: de eerste plek (thuis), de tweede plek (werk of school) en de derde plek: de publieke ruimte waar mensen vrijwillig samenkomen.
          </p>
          <p>
            Volgens Oldenburg kenmerken echte derde plekken zich door een aantal eigenschappen: ze zijn op neutraal terrein (niemand speelt heer en meester), toegankelijk voor iedereen, gericht op gesprek en ontmoeting, en bezocht door vaste gasten die een gemeenschapsgevoel creëren. Klassieke voorbeelden zijn de Engelse pub, het Parijse café, het Amerikaanse barbershop en de Nederlandse buurtbibliotheek.
          </p>

          <h2>Sociale cohesie en gemeenschapsvorming</h2>
          <p>
            De politicoloog Robert Putnam liet in zijn baanbrekende studie <em>Bowling Alone: The Collapse and Revival of American Community</em> (2000) zien hoe sociaal kapitaal — de netwerken, normen en het vertrouwen dat mensen verbindt — in de twintigste eeuw sterk is afgenomen. Putnam analyseerde hoe Amerikanen steeds meer in isolement zijn gaan leven: minder lid van verenigingen, minder actief in de buurt, minder sociale contacten.
          </p>
          <p>
            Derde plekken zijn juist plekken waar sociaal kapitaal wordt opgebouwd. Wanneer een buurtbewoner elke week naar de bibliotheek gaat en daar de bibliotheekmedewerker, de student met zijn laptop en de gepensioneerde met zijn krant tegenkomt, ontstaat een informeel netwerk van bekenden. Die herkenning — "ik ken jou, jij hoort hier" — is de basis van een veilige, prettige wijk.
          </p>

          <h2>Eenzaamheid: een groeiend maatschappelijk probleem</h2>
          <p>
            Eenzaamheid is in Nederland een serieus volksgezondheidsvraagstuk. Uit de <em>Sociale Staat van Nederland</em> (Sociaal en Cultureel Planbureau, meerdere edities) blijkt dat een aanzienlijk deel van de Nederlanders zich matig tot ernstig eenzaam voelt. Eenzaamheid neemt toe met de leeftijd, maar ook onder jongvolwassenen en studenten is het een groeiend probleem — mede door de coronapandemie en de toename van digitale communicatie ten koste van fysiek contact.
          </p>
          <p>
            Derde plekken zijn bij uitstek geschikt om eenzaamheid te doorbreken: ze zijn laagdrempelig (je hoeft niet te reserveren), gratis of goedkoop (geen financiële drempel), en sociaal van aard (ontmoeting staat centraal). Wie elke dinsdag naar het buurthuis gaat voor een kopje koffie en een gesprek, heeft structurele sociale contacten — zonder dat dit als "hulp" of "zorg" wordt gelabeld.
          </p>

          <h2>Betaalbare studieplekken en werkruimte</h2>
          <p>
            Voor studenten en zzp'ers zijn derde plekken van onschatbare waarde. Niet iedereen heeft thuis een rustige werkkamer; in gedeelde studentenkamers en kleine appartementen is concentreren lastig. Bibliotheken bieden een gratis alternatief: stilteruimtes, werkplekken met stroom, en gratis wifi. In Utrecht zijn de vestigingen van Bibliotheek Utrecht — met name de centrale vestiging op de Neude — populaire studieplekken voor studenten van de Universiteit Utrecht en de Hogeschool Utrecht.
          </p>
          <p>
            Het feit dat deze plekken <em>gratis</em> zijn, is cruciaal. Studenten hebben doorgaans een krap budget. Een abonnement op een coworking space of een dagje werken in een café (met verplichte consumpties) telt op. De bibliotheek is het democratische alternatief: iedereen welkom, zonder minimale besteding.
          </p>

          <h2>Derde plekken en mentale gezondheid</h2>
          <p>
            Buiten zijn, bewegen en sociaal contact zijn drie pijlers van mentale gezondheid die wetenschappelijk goed onderbouwd zijn. Parken als het Griftpark, Wilhelminapark en Maximapark in Utrecht zijn gratis, altijd toegankelijk en bieden precies dit. Ze vervullen een derde-plekfunctie voor hardlopers, picknickende vrienden, ouders met kinderen en mensen die even de drukte willen ontvluchten.
          </p>
          <p>
            Steden die investeren in groene, toegankelijke publieke ruimte investeren direct in de volksgezondheid. De combinatie van natuur, beweging en toevallige ontmoetingen maakt parken tot misschien wel de meest democratische derde plekken die er zijn.
          </p>

          <h2>Derde plekken en stedelijke vitaliteit</h2>
          <p>
            Levendige steden zijn steden waar mensen graag zijn — niet alleen op het werk of thuis, maar ook op straat, in de buurt en in openbare gebouwen. Derde plekken zijn de motor van stedelijke vitaliteit. Een wijk met een goed functionerend buurthuis, een openbare bibliotheek en een fijn park is een wijk waar mensen graag wonen, waar criminaliteit lager is en waar buurtbewoners meer betrokken zijn bij hun omgeving.
          </p>
          <p>
            Vanuit dit perspectief is de bezuiniging op buurthuizen en de sluiting van bibliotheekvestigingen die in veel Nederlandse gemeenten plaatsvond in de jaren 2010 geen neutrale kostenpost, maar een directe aanslag op sociaal kapitaal en leefbaarheid. Het herstel van deze plekken — en het zichtbaar maken ervan voor bewoners — is een investering die zichzelf terugverdient.
          </p>

          <h2>Third places in Utrecht: een overzicht</h2>
          <p>
            Utrecht is een stad met een rijk aanbod aan derde plekken. <a href="/utrecht" style={{ color: "var(--blauw-diep)" }}>Op onze interactieve kaart</a> vind je alle bibliotheken, buurtcentra en parken in de stad, met actuele openingstijden en filters. Een greep uit het aanbod:
          </p>
          <ul>
            <li><strong>Bibliotheek Utrecht Neude</strong> — de grootste vestiging, open tot 21:00 door de week, met uitgebreide studeer- en werkfaciliteiten.</li>
            <li><strong>Griftpark en Wilhelminapark</strong> — altijd open, gratis, en geliefd bij studenten en gezinnen.</li>
            <li><strong>Buurtcentrum Lombok</strong> — laagdrempelig buurthuis in een van de meest diverse wijken van Utrecht.</li>
            <li><strong>Maximapark</strong> — het grootste stadspark van Utrecht, meer dan 100 hectare in Leidsche Rijn.</li>
          </ul>
          <p>
            We breiden het aanbod continu uit met meer vestigingen, buurtcentra en — binnenkort — horecalocaties die speciale verblijfsdeals aanbieden voor studenten en andere bezoekers.
          </p>

          <h2>Bijdragen en meedoen</h2>
          <p>
            Ken je een derde plek in Utrecht (of een andere Nederlandse stad) die nog niet op de kaart staat? <a href="/" style={{ color: "var(--blauw-diep)" }}>Laat het ons weten via de homepage</a>. Derdeplekken.nl is een community-project: hoe meer mensen bijdragen, hoe completer en nuttiger het platform wordt.
          </p>

          {/* FAQ */}
          <h2 id="faq">Veelgestelde vragen over derde plekken</h2>
          <div className="not-prose space-y-4 mt-6">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="border-2 border-inkt rounded-xl2 overflow-hidden"
              >
                <summary
                  className="p-4 font-bold cursor-pointer"
                  style={{ background: "var(--blauw-vlak)" }}
                >
                  {item.question}
                </summary>
                <div className="p-4 bg-white text-sm text-gray-700">{item.answer}</div>
              </details>
            ))}
          </div>

          <div className="not-prose mt-10 flex gap-3 flex-wrap">
            <Link
              href="/utrecht"
              className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-full text-white"
              style={{ background: "var(--inkt)", border: "2px solid var(--inkt)" }}
            >
              Bekijk de kaart voor Utrecht →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-full"
              style={{ border: "2px solid var(--inkt)", color: "var(--inkt)", background: "#fff" }}
            >
              ← Terug naar home
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
