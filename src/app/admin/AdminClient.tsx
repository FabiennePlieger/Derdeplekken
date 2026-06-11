"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";

type Application = {
  id: string;
  naam: string;
  adres: string;
  stad: string;
  contact_naam: string | null;
  contact_email: string;
  website: string | null;
  google_maps_url: string | null;
  google_sync: boolean;
  openingstijden: unknown;
  regel_eigen_eten: boolean;
  regel_deal_korting: boolean;
  deal_titel: string | null;
  deal_beschrijving: string | null;
  deal_prijs: string | null;
  deal_van: string | null;
  deal_tot: string | null;
  deal_dagen: string[] | null;
  deal_doelgroep: string;
  toelichting: string | null;
  status: "aangevraagd" | "goedgekeurd" | "afgewezen";
  admin_notitie: string | null;
  aangevraagd_op: string;
};

const STATUS_TABS = [
  { value: "aangevraagd", label: "Te beoordelen", color: "var(--geel-vlak)" },
  { value: "goedgekeurd", label: "Goedgekeurd", color: "var(--groen-vlak)" },
  { value: "afgewezen", label: "Afgewezen", color: "var(--koraal)" },
] as const;

export default function AdminClient() {
  const [secret, setSecret] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<"aangevraagd" | "goedgekeurd" | "afgewezen">("aangevraagd");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [notities, setNotities] = useState<Record<string, string>>({});

  const load = useCallback(async (status: string, token: string) => {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/admin/applications?status=${status}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      setError(res.status === 401 ? "Verkeerd wachtwoord." : "Laden mislukt.");
      setApplications([]);
    } else {
      setApplications(await res.json());
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    load(tab, secret);
  };

  useEffect(() => {
    if (loggedIn) load(tab, secret);
  }, [tab, loggedIn, load, secret]);

  const beoordeel = async (id: string, status: "goedgekeurd" | "afgewezen", app: Application) => {
    const liveVenue =
      status === "goedgekeurd"
        ? buildLiveVenue(app)
        : null;

    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ status, adminNotitie: notities[id] ?? null, liveVenue }),
    });
    if (!res.ok) {
      alert("Beoordeling mislukt.");
      return;
    }
    load(tab, secret);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--papier)" }}>
        <form onSubmit={handleLogin} className="p-8 rounded-xl2 border-2 border-inkt bg-white w-full max-w-sm space-y-4">
          <h1 className="font-black text-xl">Admin login</h1>
          <input
            type="password"
            required
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Wachtwoord (ADMIN_SECRET)"
            className="w-full border-2 border-inkt rounded-xl px-4 py-2.5 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="w-full font-bold text-sm px-5 py-2.5 rounded-full text-white"
            style={{ background: "var(--inkt)" }}
          >
            Inloggen
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--papier)" }}>
      <header className="border-b-2 border-inkt px-6 py-4 flex items-center gap-4" style={{ background: "#fff" }}>
        <h1 className="font-black text-xl">Admin – Aanvragen</h1>
        <span className="text-sm text-gray-500 ml-auto">derdeplekken.nl</span>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {STATUS_TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className="px-4 py-2 rounded-full text-sm font-bold border-2 border-inkt"
              style={{ background: tab === t.value ? "var(--inkt)" : t.color, color: tab === t.value ? "#fff" : "inherit" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {error && <p className="text-red-600 font-bold mb-4">{error}</p>}
        {loading && <p className="text-gray-500">Laden...</p>}

        {!loading && applications.length === 0 && (
          <p className="text-gray-500">Geen aanvragen met status &quot;{tab}&quot;.</p>
        )}

        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="rounded-xl2 border-2 border-inkt bg-white overflow-hidden">
              {/* Row header */}
              <button
                className="w-full px-5 py-4 flex items-center gap-4 text-left"
                onClick={() => setExpanded(expanded === app.id ? null : app.id)}
              >
                <div className="flex-1">
                  <p className="font-black">{app.naam}</p>
                  <p className="text-sm text-gray-600">{app.adres} · {app.contact_email}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {app.regel_eigen_eten && <span className="px-2 py-0.5 rounded-full text-xs font-bold border border-inkt bg-white">eigen eten</span>}
                  {app.regel_deal_korting && <span className="px-2 py-0.5 rounded-full text-xs font-bold border border-inkt" style={{ background: "var(--geel-vlak)" }}>deal</span>}
                  <span className="text-gray-400 text-xs">{new Date(app.aangevraagd_op).toLocaleDateString("nl-NL")}</span>
                </div>
                {expanded === app.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Expanded detail */}
              {expanded === app.id && (
                <div className="border-t-2 border-inkt px-5 py-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <Field label="Adres" value={app.adres} />
                    <Field label="Contact" value={`${app.contact_naam ?? ""} – ${app.contact_email}`} />
                    {app.website && <Field label="Website" value={app.website} />}
                    {app.google_maps_url && <Field label="Google Maps" value={app.google_maps_url} />}
                    <Field label="Google sync" value={app.google_sync ? "Ja" : "Nee"} />
                  </div>

                  <div className="text-sm space-y-1">
                    <p className="font-bold">Derde-plek-regels</p>
                    <RuleRow ok={app.regel_eigen_eten} label="Bezoekers mogen eigen eten meenemen" />
                    <RuleRow ok={app.regel_deal_korting} label="Deal met korting op eten/drinken op bepaalde uren" />
                  </div>

                  {app.regel_deal_korting && (
                    <div className="p-4 rounded-xl border-2 border-inkt text-sm space-y-1" style={{ background: "var(--geel-vlak)" }}>
                      <p className="font-bold">Deal</p>
                      <p>{app.deal_titel}</p>
                      {app.deal_beschrijving && <p className="text-gray-600">{app.deal_beschrijving}</p>}
                      <p>Prijs: {app.deal_prijs} · {app.deal_van} – {app.deal_tot}</p>
                      <p>Dagen: {app.deal_dagen?.join(", ")} · Doelgroep: {app.deal_doelgroep}</p>
                    </div>
                  )}

                  {app.toelichting && (
                    <div className="text-sm">
                      <p className="font-bold mb-1">Toelichting aanvrager</p>
                      <p className="text-gray-700">{app.toelichting}</p>
                    </div>
                  )}

                  {app.status === "aangevraagd" && (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block font-bold text-sm mb-1">Interne notitie (optioneel)</label>
                        <textarea
                          value={notities[app.id] ?? ""}
                          onChange={(e) => setNotities((n) => ({ ...n, [app.id]: e.target.value }))}
                          className="w-full border-2 border-inkt rounded-xl px-3 py-2 text-sm"
                          rows={2}
                          placeholder="Bijv. locatie gecheckt, coördinaten toegevoegd..."
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => beoordeel(app.id, "goedgekeurd", app)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white"
                          style={{ background: "#0e8c5f" }}
                        >
                          <CheckCircle size={16} /> Goedkeuren
                        </button>
                        <button
                          onClick={() => beoordeel(app.id, "afgewezen", app)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white"
                          style={{ background: "#cc0000" }}
                        >
                          <XCircle size={16} /> Afwijzen
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Let op: bij goedkeuring wordt de zaak direct op de kaart gezet. Controleer eerst of de coördinaten en openingstijden kloppen.
                      </p>
                    </div>
                  )}

                  {app.status !== "aangevraagd" && (
                    <div className="flex items-center gap-2 text-sm font-bold">
                      {app.status === "goedgekeurd" ? <CheckCircle size={16} className="text-green-600" /> : <Clock size={16} className="text-red-500" />}
                      {app.status === "goedgekeurd" ? "Goedgekeurd" : "Afgewezen"}
                      {app.admin_notitie && <span className="font-normal text-gray-600">· {app.admin_notitie}</span>}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{label}</p>
      <p className="mt-0.5">{value}</p>
    </div>
  );
}

function RuleRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {ok ? <CheckCircle size={14} className="text-green-600 flex-shrink-0" /> : <XCircle size={14} className="text-gray-300 flex-shrink-0" />}
      <span className={ok ? "" : "text-gray-400"}>{label}</span>
    </div>
  );
}

// Bouw een live_venues-rij op basis van de aanvraag.
// Vereist handmatige coördinaten. Voor nu: placeholder 0,0 totdat je ze toevoegt via notitie.
function buildLiveVenue(app: Application) {
  const slug = app.naam.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const deals = app.regel_deal_korting && app.deal_titel
    ? [
        {
          id: `deal-${slug}-1`,
          titel: app.deal_titel,
          beschrijving: app.deal_beschrijving ?? "",
          dagen: app.deal_dagen ?? [],
          tijdvak: { van: app.deal_van ?? "00:00", tot: app.deal_tot ?? "23:59" },
          prijs: app.deal_prijs ?? "",
          doelgroep: app.deal_doelgroep as "studenten" | "iedereen",
        },
      ]
    : [];

  return {
    id: `horeca-${slug}`,
    naam: app.naam,
    stad: app.stad,
    adres: app.adres,
    beschrijving: app.toelichting ?? "",
    coordinaten_lat: 52.0907,
    coordinaten_lng: 5.1214,
    website: app.website,
    google_maps_url: app.google_maps_url,
    google_sync: app.google_sync,
    openingstijden: app.openingstijden ?? {},
    kosten_gratis: false,
    kosten_indicatie: deals[0]?.prijs ?? null,
    laptopvriendelijk: true,
    werkplekken: true,
    wifi: true,
    toiletten: true,
    doelgroep: "iedereen",
    deals,
    actief: true,
  };
}
