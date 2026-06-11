"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";
import { Place } from "@/data/places";
import { isOpenAt, nextOpenClose } from "@/lib/openStatus";

const CATEGORY_COLORS: Record<string, string> = {
  bibliotheek: "#8974d1",
  buurtcentrum: "#ff7f63",
  park: "#56ddac",
  horeca: "#f9fa97",
};

const CATEGORY_ICONS: Record<string, string> = {
  bibliotheek: "📚",
  buurtcentrum: "🏠",
  park: "🌿",
  horeca: "☕",
};

interface Props {
  places: Place[];
  selectedDate: Date;
  showClosed: boolean;
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
}

export default function MapView({ places, selectedDate, showClosed, selectedPlace, onSelectPlace }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerLayersRef = useRef<ReturnType<typeof import("leaflet")["marker"]>[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || mapRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require("leaflet") as typeof import("leaflet");

    // Fix broken default icon URLs in bundled environments
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    const map = L.map(containerRef.current, {
      center: [52.0907, 5.1214],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markerLayersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require("leaflet") as typeof import("leaflet");
    const map = mapRef.current;

    markerLayersRef.current.forEach((m) => m.remove());
    markerLayersRef.current = [];

    places.forEach((place) => {
      const open = isOpenAt(place, selectedDate);
      if (!open && !showClosed) return;

      const color = CATEGORY_COLORS[place.type] ?? "#b6dde5";
      const emoji = CATEGORY_ICONS[place.type] ?? "📍";
      const status = nextOpenClose(place, selectedDate);
      const opacity = open ? 1 : 0.4;
      const shortLabel = place.naam.split(" ").slice(-1)[0];

      const icon = L.divIcon({
        className: "",
        html: `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;opacity:${opacity};cursor:pointer">
          <div style="width:36px;height:36px;border-radius:50% 50% 50% 6px;transform:rotate(-45deg);background:${color};border:2.5px solid #111;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.25)">
            <span style="transform:rotate(45deg);font-size:15px;line-height:1;display:block">${emoji}</span>
          </div>
          <div style="background:#fff;border:2px solid #111;border-radius:999px;font-size:10px;font-weight:800;padding:1px 7px;white-space:nowrap;font-family:system-ui,sans-serif;line-height:1.4">${shortLabel}</div>
        </div>`,
        iconSize: [72, 62],
        iconAnchor: [36, 62],
        popupAnchor: [0, -62],
      });

      const marker = L.marker([place.coordinaten.lat, place.coordinaten.lng], { icon })
        .addTo(map)
        .bindTooltip(
          `<strong style="font-size:13px">${place.naam}</strong><br><span style="font-size:11px;color:#444">${status.label}</span>`,
          { direction: "top", offset: [0, -55], opacity: 0.97 }
        );

      marker.on("click", () => onSelectPlace(place));
      markerLayersRef.current.push(marker);
    });
  }, [places, selectedDate, showClosed, onSelectPlace]);

  useEffect(() => {
    if (!mapRef.current || !selectedPlace) return;
    mapRef.current.setView(
      [selectedPlace.coordinaten.lat, selectedPlace.coordinaten.lng],
      Math.max(mapRef.current.getZoom(), 14),
      { animate: true }
    );
  }, [selectedPlace]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
