"use client";

interface Filters {
  type: string;
  gratisOnly: boolean;
  laptopOnly: boolean;
  showClosed: boolean;
  dealsOnly: boolean;
  studentMode: boolean;
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const types = [
  { value: "", label: "Alle typen" },
  { value: "bibliotheek", label: "Bibliotheek" },
  { value: "buurtcentrum", label: "Buurtcentrum" },
  { value: "park", label: "Park" },
  { value: "horeca", label: "Horeca" },
];

export default function FilterBar({ filters, onChange }: Props) {
  const toggle = (key: keyof Filters) => {
    if (typeof filters[key] === "boolean") {
      onChange({ ...filters, [key]: !filters[key] });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <select
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
        className="border-2 border-inkt rounded-full px-3 py-1.5 text-sm font-bold bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Filter op type plek"
      >
        {types.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      {[
        { key: "gratisOnly" as const, label: "Gratis" },
        { key: "laptopOnly" as const, label: "💻 Laptop OK" },
        { key: "showClosed" as const, label: "Toon gesloten", invert: true },
        { key: "studentMode" as const, label: "🎓 Ik ben student" },
      ].map(({ key, label, invert }) => (
        <button
          key={key}
          onClick={() => toggle(key)}
          className="border-2 border-inkt rounded-full px-3 py-1.5 text-sm font-bold transition-colors"
          style={{
            background: (invert ? !filters[key] : filters[key]) ? "var(--inkt)" : "#fff",
            color: (invert ? !filters[key] : filters[key]) ? "#fff" : "var(--inkt)",
          }}
          aria-pressed={filters[key]}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export type { Filters };
