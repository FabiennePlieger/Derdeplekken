"use client";

import { X, Laptop, Users, Wifi, Toilet, MapPin, ExternalLink } from "lucide-react";
import { Place } from "@/data/places";
import { nextOpenClose, formatOpeningHours } from "@/lib/openStatus";
import clsx from "clsx";

const CATEGORY_COLORS: Record<string, string> = {
  bibliotheek: "#8974d1",
  buurtcentrum: "#ff7f63",
  park: "#56ddac",
  horeca: "#f9fa97",
};

const CATEGORY_LABELS: Record<string, string> = {
  bibliotheek: "Bibliotheek",
  buurtcentrum: "Buurtcentrum",
  park: "Park",
  horeca: "Horeca",
};

interface Props {
  place: Place;
  selectedDate: Date;
  onClose: () => void;
}

export default function PlaceDetail({ place, selectedDate, onClose }: Props) {
  const status = nextOpenClose(place, selectedDate);
  const hours = formatOpeningHours(place);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span
            className="inline-flex items-center gap-1.5 text-xs font-extrabold px-2.5 py-1 rounded-full border-2 border-inkt mb-2"
            style={{ background: CATEGORY_COLORS[place.type] }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full border border-inkt"
              style={{ background: CATEGORY_COLORS[place.type] }}
            />
            {CATEGORY_LABELS[place.type]}
          </span>
          <h2 className="text-xl font-black leading-tight">{place.naam}</h2>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100 border-2 border-inkt"
          aria-label="Sluit detailweergave"
        >
          <X size={16} />
        </button>
      </div>

      {/* Status */}
      <div
        className={clsx(
          "inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full w-fit",
          status.type === "open"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-600"
        )}
      >
        <span
          className={clsx("w-2 h-2 rounded-full", status.type === "open" ? "bg-green-600" : "bg-gray-400")}
        />
        {status.label}
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 text-sm text-gray-700">
        <MapPin size={16} className="flex-shrink-0 mt-0.5" />
        <span>{place.adres}</span>
      </div>

      {/* Opening hours */}
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1">Openingstijden</p>
        <p className="text-sm text-gray-700">{hours}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700">{place.beschrijving}</p>

      {/* Features */}
      <div className="flex flex-wrap gap-2">
        {place.kosten.gratis ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border-2 border-inkt bg-white">
            <span aria-hidden="true">€̶</span> Gratis
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border-2 border-inkt bg-white">
            💶 {place.kosten.indicatie ?? "Betaald"}
          </span>
        )}
        {place.laptopvriendelijk && (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border-2 border-inkt bg-white">
            <Laptop size={12} aria-hidden="true" /> Laptop OK
          </span>
        )}
        {place.wifi && (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border-2 border-inkt bg-white">
            <Wifi size={12} aria-hidden="true" /> Wifi
          </span>
        )}
        {place.werkplekken && (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border-2 border-inkt bg-white">
            🖥 Werkplekken
          </span>
        )}
        {place.toiletten && (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border-2 border-inkt bg-white">
            <Toilet size={12} aria-hidden="true" /> Toiletten
          </span>
        )}
        {place.doelgroep === "studenten" && (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border-2 border-inkt bg-white">
            <Users size={12} aria-hidden="true" /> Studenten
          </span>
        )}
      </div>

      {/* Deals */}
      {place.deals.length > 0 && (
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-2">Deals</p>
          {place.deals.map((deal) => (
            <div key={deal.id} className="p-3 rounded-xl border-2 border-inkt text-sm" style={{ background: "var(--geel-vlak)" }}>
              <p className="font-bold">{deal.titel}</p>
              <p className="text-gray-700 mt-0.5">{deal.beschrijving}</p>
              <p className="text-xs text-gray-500 mt-1">
                {deal.dagen.join(", ")} · {deal.tijdvak.van}–{deal.tijdvak.tot} · {deal.prijs}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Map links */}
      <div className="flex flex-wrap gap-2 pt-1">
        {place.links.appleMaps && (
          <a
            href={place.links.appleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full border-2 border-inkt bg-white hover:-translate-y-0.5 transition-transform"
          >
            <ExternalLink size={13} aria-hidden="true" /> Apple Kaarten
          </a>
        )}
        {place.links.googleMaps && (
          <a
            href={place.links.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full border-2 border-inkt bg-white hover:-translate-y-0.5 transition-transform"
          >
            <ExternalLink size={13} aria-hidden="true" /> Google Maps
          </a>
        )}
        {place.links.website && (
          <a
            href={place.links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full border-2 border-inkt bg-white hover:-translate-y-0.5 transition-transform"
          >
            <ExternalLink size={13} aria-hidden="true" /> Website
          </a>
        )}
      </div>
    </div>
  );
}
