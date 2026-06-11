"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const DAGEN = ["ma", "di", "wo", "do", "vr", "za", "zo"] as const;

const DERDE_PLEK_UITLEG = {
  regelEigenEten:
    "Bezoekers mogen eigen eten en drinken meenemen en gebruiken in de zaak, ongeacht wat ze bestellen.",
  regelDealKorting:
    "Er is een significante korting of verblijfsdeal op eten of drinken tijdens bepaalde uren. Bijv. onbeperkt koffie en thee voor €3 van 10:00–14:00.",
};

export default function PortaalForm() {
  const [naam, setNaam] = useState("");
  const [adres, setAdres] = useState("");
  const [contactNaam, setContactNaam] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [googleSync, setGoogleSync] = useState(true);
  const [openingstijden, setOpeningstijden] = useState("");
  const [toelichting, setToelichting] = useState("");

  // Derde-plek-regels
  const [regelEigenEten, setRegelEigenEten] = useState(false);
  const [regelDealKorting, setRegelDealKorting] = useState(false);

  // Deal
  const [dealTitel, setDealTitel] = useState("");
  const [dealBeschrijving, setDealBeschrijving] = useState("");
  const [dealPrijs, setDealPrijs] = useState("");
  const [dealVan, setDealVan] = useState("");
  const [dealTot, setDealTot] = useState("");
  const [dealDagen, setDealDagen] = useState<string[]>([]);
  const [dealDoelgroep, setDealDoelgroep] = useState<"studenten" | "iedereen">("studenten");

  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error" | "no-db">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const voldoetAanRegels = regelEigenEten || regelDealKorting;

  const toggleDag = (dag: string) =>
    setDealDagen((d) => (d.includes(dag) ? d.filter((x) => x !== dag) : [...d, dag]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voldoetAanRegels) {
      setErrorMsg("Selecteer minimaal één derde-plek-regel.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");

    const res = await fetch("/api/portaal", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        naam, adres, contactNaam, contactEmail, website, googleMapsUrl,
        googleSync,
        openingstijden: googleSync ? null : openingstijden,
        regelEigenEten, regelDealKorting,
        dealTitel, dealBeschrijving, dealPrijs, dealVan, dealTot, dealDagen, dealDoelgroep,
        toelichting,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.ok) {
      setStatus("ok");
    } else if (data.fallback) {
      setStatus("no-db");
    } else {
      setStatus("error");
      setErrorMsg(data.error ?? "Er ging iets mis. Probeer het opnieuw.");
    }
  };

  if (status === "ok") {
    return (
      <div className="p-8 rounded-xl2 border-2 border-inkt max-w-2xl" style={{ background: "var(--groen-vlak)" }}>
        <CheckCircle size={32} className="mb-3 text-green-700" />
        <h2 className="font-black text-lg">Aanmelding ontvangen!</h2>
        <p className="mt-2 text-gray-700">We nemen binnen een paar werkdagen contact op via {contactEmail}. Als je zaak voldoet aan de derde-plek-regels, zetten we hem zo snel mogelijk op de kaart.</p>
      </div>
    );
  }

  if (status === "no-db") {
    return (
      <div className="p-8 rounded-xl2 border-2 border-inkt max-w-2xl" style={{ background: "var(--geel-vlak)" }}>
        <h2 className="font-black text-lg">Stuur je aanmelding via e-mail</h2>
        <p className="mt-2 text-gray-700">De database is tijdelijk niet beschikbaar. Mail je gegevens rechtstreeks naar:</p>
        <a href={`mailto:hallo@derdeplekken.nl?subject=Aanmelding horeca: ${encodeURIComponent(naam)}`} className="mt-3 inline-block font-bold underline">hallo@derdeplekken.nl</a>
      </div>
    );
  }

  const inputClass = "w-full border-2 border-inkt rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block font-bold text-sm mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl2 border-2 border-inkt bg-white space-y-5 max-w-2xl">

      {/* Basisgegevens */}
      <div>
        <label htmlFor="naam" className={labelClass}>Naam van je zaak *</label>
        <input id="naam" required value={naam} onChange={(e) => setNaam(e.target.value)} className={inputClass} placeholder="Bijv. Koffiehuis De Buur" />
      </div>
      <div>
        <label htmlFor="adres" className={labelClass}>Adres *</label>
        <input id="adres" required value={adres} onChange={(e) => setAdres(e.target.value)} className={inputClass} placeholder="Straat + huisnummer, Utrecht" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="contactNaam" className={labelClass}>Jouw naam</label>
          <input id="contactNaam" value={contactNaam} onChange={(e) => setContactNaam(e.target.value)} className={inputClass} placeholder="Jan de Vries" />
        </div>
        <div>
          <label htmlFor="contactEmail" className={labelClass}>E-mailadres *</label>
          <input id="contactEmail" type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className={inputClass} placeholder="jan@zaak.nl" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="website" className={labelClass}>Website</label>
          <input id="website" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} className={inputClass} placeholder="https://dezaak.nl" />
        </div>
        <div>
          <label htmlFor="googleMapsUrl" className={labelClass}>Google Maps-link</label>
          <input id="googleMapsUrl" type="url" value={googleMapsUrl} onChange={(e) => setGoogleMapsUrl(e.target.value)} className={inputClass} placeholder="https://maps.google.com/..." />
        </div>
      </div>

      {/* Derde-plek-regels — verplicht */}
      <fieldset className="p-4 rounded-xl border-2 border-inkt space-y-3" style={{ background: "var(--blauw-vlak)" }}>
        <legend className="font-black text-sm px-2 bg-white border-2 border-inkt rounded-full py-0.5">
          Derde-plek-regels *
        </legend>
        <p className="text-sm text-gray-700">
          Om op de kaart te komen moet je zaak aan <strong>minimaal één</strong> van de volgende regels voldoen. Dit garandeert bezoekers dat ze welkom zijn zonder veel te besteden.
        </p>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={regelEigenEten} onChange={(e) => setRegelEigenEten(e.target.checked)} className="mt-0.5 w-4 h-4" />
          <span className="text-sm">
            <strong>Eigen eten en drinken toegestaan.</strong>{" "}
            <span className="text-gray-600">{DERDE_PLEK_UITLEG.regelEigenEten}</span>
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={regelDealKorting} onChange={(e) => setRegelDealKorting(e.target.checked)} className="mt-0.5 w-4 h-4" />
          <span className="text-sm">
            <strong>Verblijfsdeal met significante korting.</strong>{" "}
            <span className="text-gray-600">{DERDE_PLEK_UITLEG.regelDealKorting}</span>
          </span>
        </label>
        {!voldoetAanRegels && errorMsg && (
          <p className="text-red-600 text-sm font-bold">{errorMsg}</p>
        )}
      </fieldset>

      {/* Deal invullen als regel_deal_korting is aangevinkt */}
      {regelDealKorting && (
        <fieldset className="p-4 rounded-xl border-2 border-inkt space-y-4" style={{ background: "var(--geel-vlak)" }}>
          <legend className="font-black text-sm px-2 bg-white border-2 border-inkt rounded-full py-0.5">Deal omschrijving *</legend>
          <div>
            <label htmlFor="dealTitel" className={labelClass}>Wat houdt de deal in? *</label>
            <input id="dealTitel" required={regelDealKorting} value={dealTitel} onChange={(e) => setDealTitel(e.target.value)} className={inputClass} placeholder="Bijv. Onbeperkt koffie + werkplek" />
          </div>
          <div>
            <label htmlFor="dealBeschrijving" className={labelClass}>Aanvullende omschrijving</label>
            <textarea id="dealBeschrijving" value={dealBeschrijving} onChange={(e) => setDealBeschrijving(e.target.value)} className={inputClass} rows={2} placeholder="Bijv. inclusief een kop soep, rustige zithoek bij het raam..." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="dealPrijs" className={labelClass}>Prijs *</label>
              <input id="dealPrijs" required={regelDealKorting} value={dealPrijs} onChange={(e) => setDealPrijs(e.target.value)} className={inputClass} placeholder="€5,-" />
            </div>
            <div>
              <label htmlFor="dealVan" className={labelClass}>Van</label>
              <input id="dealVan" type="time" value={dealVan} onChange={(e) => setDealVan(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="dealTot" className={labelClass}>Tot</label>
              <input id="dealTot" type="time" value={dealTot} onChange={(e) => setDealTot(e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <span className={labelClass}>Op welke dagen?</span>
            <div className="flex flex-wrap gap-2">
              {DAGEN.map((dag) => (
                <button key={dag} type="button" onClick={() => toggleDag(dag)}
                  className="border-2 border-inkt rounded-full px-3 py-1 text-sm font-bold"
                  style={{ background: dealDagen.includes(dag) ? "var(--inkt)" : "#fff", color: dealDagen.includes(dag) ? "#fff" : "var(--inkt)" }}
                  aria-pressed={dealDagen.includes(dag)}
                >
                  {dag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className={labelClass}>Voor wie geldt de deal?</span>
            <div className="flex flex-wrap gap-2">
              {([["studenten", "🎓 Alleen studenten"], ["iedereen", "Alle bezoekers"]] as const).map(([val, lbl]) => (
                <button key={val} type="button" onClick={() => setDealDoelgroep(val)}
                  className="border-2 border-inkt rounded-full px-4 py-1.5 text-sm font-bold"
                  style={{ background: dealDoelgroep === val ? "var(--inkt)" : "#fff", color: dealDoelgroep === val ? "#fff" : "var(--inkt)" }}
                  aria-pressed={dealDoelgroep === val}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>
        </fieldset>
      )}

      {/* Openingstijden */}
      <fieldset className="p-4 rounded-xl border-2 border-inkt space-y-3" style={{ background: "var(--groen-vlak)" }}>
        <legend className="font-black text-sm px-2 bg-white border-2 border-inkt rounded-full py-0.5">Openingstijden</legend>
        <label className="flex items-start gap-2.5 text-sm cursor-pointer">
          <input type="checkbox" checked={googleSync} onChange={(e) => setGoogleSync(e.target.checked)} className="mt-0.5 w-4 h-4" />
          <span>
            <strong>Automatisch overnemen uit Google Maps.</strong> Wij houden je tijden actueel via je Google Bedrijfsprofiel.
          </span>
        </label>
        {!googleSync && (
          <div>
            <label htmlFor="tijden" className={labelClass}>Vul je openingstijden in</label>
            <textarea id="tijden" value={openingstijden} onChange={(e) => setOpeningstijden(e.target.value)} className={inputClass} rows={3}
              placeholder={"ma t/m vr  09:00–18:00\nza–zo  10:00–17:00"} />
          </div>
        )}
      </fieldset>

      {/* Toelichting */}
      <div>
        <label htmlFor="toelichting" className={labelClass}>Aanvullende toelichting</label>
        <textarea id="toelichting" value={toelichting} onChange={(e) => setToelichting(e.target.value)} className={inputClass} rows={2}
          placeholder="Bijv. speciale sfeer, rustige hoek, specifieke doelgroep..." />
      </div>

      {status === "error" && errorMsg && (
        <p className="text-red-600 text-sm font-bold">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 font-bold text-base px-7 py-3.5 rounded-full text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        style={{ background: "var(--inkt)", border: "2px solid var(--inkt)" }}
      >
        <Send size={16} />
        {status === "sending" ? "Versturen..." : "Verstuur aanmelding"}
      </button>
    </form>
  );
}
