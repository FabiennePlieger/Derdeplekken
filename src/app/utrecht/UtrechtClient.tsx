"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { places } from "@/data/places";
import { isOpenAt } from "@/lib/openStatus";
import FilterBar, { type Filters } from "@/components/FilterBar";
import TimeSelector from "@/components/TimeSelector";
import PlaceDetail from "@/components/PlaceDetail";
import Legend from "@/components/Legend";
import InfoColumn from "@/components/InfoColumn";
import type { Place } from "@/data/places";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: "var(--blauw-vlak)" }}
    >
      <p className="font-bold text-gray-600">Kaart laden...</p>
    </div>
  ),
});

const utrechtPlaces = places.filter((p) => p.stad === "utrecht");

export default function UtrechtClient() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filters, setFilters] = useState<Filters>({
    type: "",
    gratisOnly: false,
    laptopOnly: false,
    showClosed: false,
    dealsOnly: false,
  });
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filteredPlaces = useMemo(() => {
    return utrechtPlaces.filter((p) => {
      if (filters.type && p.type !== filters.type) return false;
      if (filters.gratisOnly && !p.kosten.gratis) return false;
      if (filters.laptopOnly && !p.laptopvriendelijk) return false;
      if (!filters.showClosed && !isOpenAt(p, selectedDate)) return false;
      if (filters.dealsOnly && p.deals.length === 0) return false;
      return true;
    });
  }, [filters, selectedDate]);

  const handleSelectPlace = useCallback((place: Place) => {
    setSelectedPlace(place);
  }, []);

  const openCount = useMemo(
    () => utrechtPlaces.filter((p) => isOpenAt(p, selectedDate)).length,
    [selectedDate]
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--papier)" }}>
      <header
        className="border-b-2 border-inkt px-5 py-3 flex items-center gap-4 flex-wrap"
        style={{ background: "var(--papier)" }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline"
          style={{ color: "var(--blauw-diep)" }}
        >
          <ArrowLeft size={14} aria-hidden="true" /> Terug
        </Link>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
            style={{ background: "#cc0000" }}
          >
            Utrecht
          </span>
          <h1 className="font-black text-xl">Derde plekken</h1>
        </div>
        <span className="text-sm text-gray-500 ml-auto">{openCount} plekken nu open</span>
      </header>

      <div className="px-5 py-3 border-b border-gray-200 flex flex-wrap gap-3 items-center">
        <TimeSelector selectedDate={selectedDate} onChange={setSelectedDate} />
        <FilterBar filters={filters} onChange={setFilters} />
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        <div className="flex flex-col flex-1" style={{ minHeight: "480px" }}>
          <div className="relative flex-1 m-3 rounded-xl2 border-2 border-inkt overflow-hidden" style={{ minHeight: "400px" }}>
            <MapView
              places={filteredPlaces}
              selectedDate={selectedDate}
              showClosed={filters.showClosed}
              selectedPlace={selectedPlace}
              onSelectPlace={handleSelectPlace}
            />
            <div className="absolute bottom-3 left-3 z-[1000]" style={{ maxWidth: 200 }}>
              <Legend />
            </div>
          </div>

          {selectedPlace && (
            <div className="mx-3 mb-3 p-4 rounded-xl2 border-2 border-inkt bg-white overflow-y-auto" style={{ maxHeight: 320 }}>
              <PlaceDetail
                place={selectedPlace}
                selectedDate={selectedDate}
                onClose={() => setSelectedPlace(null)}
              />
            </div>
          )}
        </div>

        <div
          className="lg:w-80 xl:w-96 flex-shrink-0 p-4 overflow-y-auto border-t-2 lg:border-t-0 lg:border-l-2 border-inkt"
          style={{ maxHeight: "calc(100vh - 110px)" }}
        >
          <InfoColumn />
        </div>
      </div>
    </div>
  );
}
