"use client";

import { Clock } from "lucide-react";

interface Props {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toLocalDatetimeString(date: Date): string {
  const y = date.getFullYear();
  const mo = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  return `${y}-${mo}-${d}T${h}:${min}`;
}

function getMaxDatetime(): string {
  const max = new Date();
  max.setDate(max.getDate() + 7);
  return toLocalDatetimeString(max);
}

export default function TimeSelector({ selectedDate, onChange }: Props) {
  const now = new Date();
  const isNow =
    Math.abs(selectedDate.getTime() - now.getTime()) < 60_000;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 border-2 border-inkt rounded-full px-3 py-1.5 bg-white">
        <Clock size={14} aria-hidden="true" />
        <input
          type="datetime-local"
          value={toLocalDatetimeString(selectedDate)}
          min={toLocalDatetimeString(new Date())}
          max={getMaxDatetime()}
          onChange={(e) => {
            if (e.target.value) onChange(new Date(e.target.value));
          }}
          className="text-sm font-bold bg-transparent border-none outline-none cursor-pointer"
          aria-label="Selecteer datum en tijd"
        />
      </div>
      {!isNow && (
        <button
          onClick={() => onChange(new Date())}
          className="border-2 border-inkt rounded-full px-3 py-1.5 text-sm font-bold bg-white hover:bg-gray-50"
        >
          Nu
        </button>
      )}
    </div>
  );
}
