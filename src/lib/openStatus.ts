import type { Place, DayKey } from "@/data/places";

const DAY_MAP: DayKey[] = ["zo", "ma", "di", "wo", "do", "vr", "za"];

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function isOpenAt(place: Place, date: Date): boolean {
  if (place.alwaysOpen) return true;

  // Convert to Amsterdam time
  const amsterdamStr = date.toLocaleString("en-US", { timeZone: "Europe/Amsterdam" });
  const amsterdam = new Date(amsterdamStr);
  const dayKey = DAY_MAP[amsterdam.getDay()];
  const slots = place.openingstijden[dayKey];
  if (!slots || slots.length === 0) return false;

  const current = amsterdam.getHours() * 60 + amsterdam.getMinutes();
  return slots.some((slot) => {
    const open = toMinutes(slot.open);
    const close = toMinutes(slot.close);
    return current >= open && current < close;
  });
}

export function nextOpenClose(place: Place, date: Date): { label: string; type: "open" | "closed" } {
  if (place.alwaysOpen) return { label: "Altijd open", type: "open" };

  const amsterdamStr = date.toLocaleString("en-US", { timeZone: "Europe/Amsterdam" });
  const amsterdam = new Date(amsterdamStr);
  const dayKey = DAY_MAP[amsterdam.getDay()];
  const slots = place.openingstijden[dayKey];
  const current = amsterdam.getHours() * 60 + amsterdam.getMinutes();

  if (slots && slots.length > 0) {
    for (const slot of slots) {
      const open = toMinutes(slot.open);
      const close = toMinutes(slot.close);
      if (current >= open && current < close) {
        return { label: `Nu open · sluit om ${slot.close}`, type: "open" };
      }
      if (current < open) {
        return { label: `Gesloten · opent om ${slot.open}`, type: "closed" };
      }
    }
  }

  // Check next 6 days
  for (let i = 1; i <= 6; i++) {
    const next = new Date(amsterdam);
    next.setDate(next.getDate() + i);
    const nextDay = DAY_MAP[next.getDay()];
    const nextSlots = place.openingstijden[nextDay];
    if (nextSlots && nextSlots.length > 0) {
      const dayNames = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
      return { label: `Gesloten · opent ${i === 1 ? "morgen" : dayNames[next.getDay()]} om ${nextSlots[0].open}`, type: "closed" };
    }
  }

  return { label: "Gesloten", type: "closed" };
}

export function isOpenAtTime(place: Place, date: Date): boolean {
  if (place.alwaysOpen) return true;
  const amsterdamStr = date.toLocaleString("en-US", { timeZone: "Europe/Amsterdam" });
  const amsterdam = new Date(amsterdamStr);
  const dayKey = DAY_MAP[amsterdam.getDay()];
  const slots = place.openingstijden[dayKey];
  if (!slots || slots.length === 0) return false;
  const current = amsterdam.getHours() * 60 + amsterdam.getMinutes();
  return slots.some((slot) => {
    const open = toMinutes(slot.open);
    const close = toMinutes(slot.close);
    return current >= open && current < close;
  });
}

export function formatOpeningHours(place: Place): string {
  if (place.alwaysOpen) return "Altijd open";
  const days: DayKey[] = ["ma", "di", "wo", "do", "vr", "za", "zo"];
  const dayLabels: Record<DayKey, string> = { ma: "Ma", di: "Di", wo: "Wo", do: "Do", vr: "Vr", za: "Za", zo: "Zo" };
  return days
    .map((d) => {
      const slots = place.openingstijden[d];
      if (!slots || slots.length === 0) return null;
      return `${dayLabels[d]} ${slots.map((s) => `${s.open}–${s.close}`).join(", ")}`;
    })
    .filter(Boolean)
    .join(" · ");
}
