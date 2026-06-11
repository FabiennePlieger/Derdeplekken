"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, DivIcon } from "leaflet";
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
  const markersRef = useRef<Map<string, { marker: L.Marker; icon: DivIcon }>>(new Map());

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Leaflet must only run client-side
    const L = require("leaflet");

    // Fix default icon paths (common Leaflet/webpack issue)
    delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    const map = L.map(containerRef.current, {
      center: [52.0907, 5.1214],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  // Update markers when places/date/filter change
  useEffect(() => {
    if (!mapRef.current) return;
    const L = require("leaflet");
    const map = mapRef.current;

    // Remove old markers
    markersRef.current.forEach(({ marker }) => marker.remove());
    markersRef.current.clear();

    places.forEach((place) => {
      const open = isOpenAt(place, selectedDate);
      if (!open && !showClosed) return;

      const color = CATEGORY_COLORS[place.type];
      const emoji = CATEGORY_ICONS[place.type];
      const status = nextOpenClose(place, selectedDate);
      const opacity = open ? 1 : 0.4;

      const icon: DivIcon = L.divIcon({
        className: "",
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;opacity:${opacity}">
            <div style="
              width:40px;height:40px;
              border-radius:50% 50% 50% 6px;
              transform:rotate(-45deg);
              background:${color};
              border:2.5px solid #111;
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 3px 0 rgba(0,0,0,0.18);
            ">
              <span style="transform:rotate(45deg);font-size:17px;line-height:1">${emoji}</span>
            </div>
            <div style="
              background:#fff;border:2px solid #111;border-radius:999px;
              font-size:11px;font-weight:800;padding:2px 8px;white-space:nowrap;
              font-family:system-ui,sans-serif;
            ">${place.naam.split(" ").slice(-1)[0]}</div>
          </div>
        `,
        iconSize: [80, 70],
        iconAnchor: [40, 70],
        popupAnchor: [0, -70],
      });

      const marker = L.marker([place.coordinaten.lat, place.coordinaten.lng], { icon })
        .addTo(map)
        .bindTooltip(
          `<strong>${place.naam}</strong><br><span style="font-size:12px">${status.label}</span>`,
          { direction: "top", offset: [0, -60] }
        );

      marker.on("click", () => onSelectPlace(place));
      markersRef.current.set(place.id, { marker, icon });
    });
  }, [places, selectedDate, showClosed, onSelectPlace]);

  // Pan to selected place
  useEffect(() => {
    if (!mapRef.current || !selectedPlace) return;
    mapRef.current.panTo([selectedPlace.coordinaten.lat, selectedPlace.coordinaten.lng], { animate: true });
  }, [selectedPlace]);

  return <div ref={containerRef} className="w-full h-full" />;
}
