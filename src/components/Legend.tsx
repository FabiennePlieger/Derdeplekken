"use client";

import { BookOpen, Users, TreePine, Coffee, Laptop, Wifi } from "lucide-react";

const items = [
  { color: "#8974d1", icon: <BookOpen size={14} />, label: "Bibliotheek" },
  { color: "#ff7f63", icon: <Users size={14} />, label: "Buurtcentrum" },
  { color: "#56ddac", icon: <TreePine size={14} />, label: "Park" },
  { color: "#f9fa97", icon: <Coffee size={14} />, label: "Horeca (binnenkort)" },
];

const attrs = [
  { icon: <span className="font-bold text-xs">€̶</span>, label: "Gratis" },
  { icon: <Laptop size={12} />, label: "Laptopvriendelijk" },
  { icon: <Wifi size={12} />, label: "Wifi beschikbaar" },
  { icon: <span className="w-2 h-2 rounded-full bg-green-600 inline-block" />, label: "Nu open" },
  { icon: <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />, label: "Gesloten" },
];

export default function Legend() {
  return (
    <div className="p-4 rounded-xl2 border-2 border-inkt bg-white text-sm">
      <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">Legenda</p>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5">
            <span
              className="w-6 h-6 rounded-full border-2 border-inkt flex items-center justify-center flex-shrink-0"
              style={{ background: item.color }}
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
        {attrs.map((attr) => (
          <div key={attr.label} className="flex items-center gap-2.5">
            <span className="w-6 h-6 flex items-center justify-center flex-shrink-0 text-inkt" aria-hidden="true">
              {attr.icon}
            </span>
            <span>{attr.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
