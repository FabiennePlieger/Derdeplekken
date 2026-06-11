"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const DAGEN = ["ma", "di", "wo", "do", "vr", "za", "zo"] as const;

export default function PortaalForm() {
  const [naam, setNaam] = useState("");
  const [adres, setAdres] = useState("");
  const [contact, setContact] = useState("");
  const [googleSync, setGoogleSync] = useState(true);
  const [openingstijden, setOpeningstijden] = useState("");
  const [heeftDeal, setHeeftDeal] = useState(false);
  const [dealTitel, setDealTitel] = useState("");
  const [dealPrijs, setDealPrijs] = useState("");
  const [dealVan, setDealVan] = useState("");
  const [dealTot, setDealTot] = useState("");
  const [dealDagen, setDealDagen] = useState<string[]>([]);
  const [dealDoelgroep, setDealDoelgroep] = useState<"studenten" | "iedereen">("studenten");

  const toggleDag = (dag: string) => {
    setDealDagen((d) => (d.includes(dag) ? d.filter((x) => x !== dag) : [...d, dag]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const regels = [
      `Zaak: ${naam}`,
      `Adres: ${adres}`,
      `Contact: ${contact}`,
      `Openingstijden via Google Maps overnemen: ${googleSync ? "ja" : "nee"}`,
      ...(googleSync ? [] : [`Openingstijden: ${openingstijden}`]),
      ...(heeftDeal
        ? [
            "",
            "DEAL",
            `Titel: ${dealTitel}`,
            `Prijs: ${dealPrijs}`,
            `Dagen: ${dealDagen.join(", ") || "n.t.b."}`,
            `Tijdvak: ${dealVan || "?"} - ${dealTot || "?"}`,
            `Doelgroep: ${dealDoelgroep === "studenten" ? "alleen studenten" : "alle bezoekers"}`,
          ]
        : []),
    ];
    const mailto = `mailto:hallo@derdeplekken.nl?subject=${encodeURIComponent(
      `Aanmelding horeca: ${naam}`
    )}&body=${encodeURIComponent(regels.join("\n"))}`;
    window.location.href = mailto;
  };

  const inputClass =
    "w-full border-2 border-inkt rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block font-bold text-sm mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl2 border-2 border-inkt bg-white space-y-5 max-w-2xl">
      <div>
        <label htmlFor="naam" className={labelClass}>Naam van je zaak *</label>
        <input id="naam" required value={naam} onChange={(e) => setNaam(e.target.value)} className={inputClass} placeholder="Bijv. Koffiehuis De Buur" />
      </div>
      <div>
        <label htmlFor="adres" className={labelClass}>Adres *</label>
        <input id="adres" required value={adres} onChange={(e) => setAdres(e.target.value)} className={inputClass} placeholder="Straat + huisnummer, Utrecht" />
      </div>
      <div>
        <label htmlFor="contact" className={labelClass}>E-mailadres of telefoonnummer *</label>
        <input id="contact" required value={contact} onChange={(e) => setContact(e.target.value)} className={inputClass} placeholder="naam@zaak.nl" />
      </div>

      <fieldset className="p-4 rounded-xl border-2 border-inkt" style={{ background: "var(--blauw-vlak)" }}>
        <legend className="font-black text-sm px-2 bg-white border-2 border-inkt rounded-full py-0.5">Openingstijden</legend>
        <label className="flex items-start gap-2.5 text-sm cursor-pointer">
          <input type="checkbox" checked={googleSync} onChange={(e) => setGoogleSync(e.target.checked)} className="mt-0.5 w-4 h-4 accent-current" />
          <span>
            <strong>Automatisch overnemen uit Google Maps.</strong> Wij houden je openingstijden dan actueel op basis van je Google Bedrijfsprofiel.
          </span>
        </label>
        {!googleSync && (
          <div className="mt-3">
            <label htmlFor="tijden" className={labelClass}>Vul je openingstijden in</label>
            <textarea
              id="tijden"
              value={openingstijden}
              onChange={(e) => setOpeningstijden(e.target.value)}
              className={inputClass}
              rows={3}
              placeholder={"Bijv.\nma t/m vr 09:00-18:00\nza-zo 10:00-17:00"}
            />
          </div>
        )}
      </fieldset>

      <fieldset className="p-4 rounded-xl border-2 border-inkt" style={{ background: "var(--geel-vlak)" }}>
        <legend className="font-black text-sm px-2 bg-white border-2 border-inkt rounded-full py-0.5">Verblijfsdeal (optioneel)</legend>
        <label className="flex items-start gap-2.5 text-sm cursor-pointer">
          <input type="checkbox" checked={heeftDeal} onChange={(e) => setHeeftDeal(e.target.checked)} className="mt-0.5 w-4 h-4" />
          <span>
            <strong>Ik wil een verblijfsdeal aanbieden.</strong> Bijvoorbeeld: onbeperkt koffie en thee tijdens rustige uren voor een vast bedrag.
          </span>
        </label>

        {heeftDeal && (
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="dealTitel" className={labelClass}>Wat houdt de deal in? *</label>
              <input id="dealTitel" required={heeftDeal} value={dealTitel} onChange={(e) => setDealTitel(e.target.value)} className={inputClass} placeholder="Bijv. Onbeperkt koffie + werkplek" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="dealPrijs" className={labelClass}>Prijs *</label>
                <input id="dealPrijs" required={heeftDeal} value={dealPrijs} onChange={(e) => setDealPrijs(e.target.value)} className={inputClass} placeholder="Bijv. €5,-" />
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
                  <button
                    key={dag}
                    type="button"
                    onClick={() => toggleDag(dag)}
                    className="border-2 border-inkt rounded-full px-3 py-1 text-sm font-bold"
                    style={{
                      background: dealDagen.includes(dag) ? "var(--inkt)" : "#fff",
                      color: dealDagen.includes(dag) ? "#fff" : "var(--inkt)",
                    }}
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
                {(
                  [
                    { value: "studenten", label: "🎓 Alleen studenten" },
                    { value: "iedereen", label: "Alle bezoekers" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDealDoelgroep(opt.value)}
                    className="border-2 border-inkt rounded-full px-4 py-1.5 text-sm font-bold"
                    style={{
                      background: dealDoelgroep === opt.value ? "var(--inkt)" : "#fff",
                      color: dealDoelgroep === opt.value ? "#fff" : "var(--inkt)",
                    }}
                    aria-pressed={dealDoelgroep === opt.value}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </fieldset>

      <button
        type="submit"
        className="inline-flex items-center gap-2 font-bold text-base px-7 py-3.5 rounded-full text-white transition-transform hover:-translate-y-0.5"
        style={{ background: "var(--inkt)", border: "2px solid var(--inkt)" }}
      >
        <Send size={16} /> Verstuur aanmelding
      </button>
      <p className="text-xs text-gray-500">
        Het formulier opent je e-mailprogramma met alle gegevens ingevuld. Versturen kan ook direct naar hallo@derdeplekken.nl.
      </p>
    </form>
  );
}
