// Regels waaraan een horecazaak moet voldoen om op de kaart te komen.
// Minimaal één van de twee moet TRUE zijn.

export type RegelCheck = {
  regelEigenEten: boolean;    // bezoekers mogen eigen eten/drinken meenemen
  regelDealKorting: boolean;  // goede korting op eten/drinken op bepaalde uren
};

export function voldoetAanDerdePlekRegels(check: RegelCheck): boolean {
  return check.regelEigenEten || check.regelDealKorting;
}

export const REGEL_UITLEG: Record<keyof RegelCheck, string> = {
  regelEigenEten:
    "Bezoekers mogen eigen eten en drinken meenemen en nuttigen in de zaak.",
  regelDealKorting:
    "Er is een significante korting of een verblijfsdeal op eten of drinken tijdens bepaalde uren (bijv. onbeperkt koffie voor €3).",
};
