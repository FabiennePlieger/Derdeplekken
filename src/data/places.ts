export type DayKey = "ma" | "di" | "wo" | "do" | "vr" | "za" | "zo";

export type TimeSlot = { open: string; close: string };
export type OpeningHours = Partial<Record<DayKey, TimeSlot[]>>;

export type Deal = {
  id: string;
  titel: string;
  beschrijving: string;
  dagen: DayKey[];
  tijdvak: { van: string; tot: string };
  prijs: string;
  doelgroep: "iedereen" | "studenten";
  geldigVan?: string;
  geldigTot?: string;
};

export type Place = {
  id: string;
  naam: string;
  stad: string;
  type: "bibliotheek" | "buurtcentrum" | "park" | "horeca";
  beschrijving: string;
  adres: string;
  coordinaten: { lat: number; lng: number };
  openingstijden: OpeningHours;
  alwaysOpen?: boolean;
  kosten: { gratis: boolean; indicatie?: string };
  laptopvriendelijk: boolean;
  werkplekken: boolean;
  doelgroep: "iedereen" | "studenten";
  wifi?: boolean;
  toiletten?: boolean;
  links: { website?: string; appleMaps?: string; googleMaps?: string };
  deals: Deal[];
  verified: boolean;
};

const ALWAYS_OPEN: OpeningHours = {
  ma: [{ open: "00:00", close: "23:59" }],
  di: [{ open: "00:00", close: "23:59" }],
  wo: [{ open: "00:00", close: "23:59" }],
  do: [{ open: "00:00", close: "23:59" }],
  vr: [{ open: "00:00", close: "23:59" }],
  za: [{ open: "00:00", close: "23:59" }],
  zo: [{ open: "00:00", close: "23:59" }],
};

export const places: Place[] = [
  // === BIBLIOTHEKEN ===
  {
    id: "bieb-neude",
    naam: "Bibliotheek Utrecht Neude",
    stad: "utrecht",
    type: "bibliotheek",
    beschrijving:
      "De grootste vestiging van Bibliotheek Utrecht, centraal gelegen op de Neude. Uitgebreid aanbod aan werkplekken, stilteruimtes en wifi.",
    adres: "Neude 11, 3512 AV Utrecht",
    coordinaten: { lat: 52.0931, lng: 5.1175 },
    openingstijden: {
      ma: [{ open: "10:00", close: "21:00" }],
      di: [{ open: "10:00", close: "21:00" }],
      wo: [{ open: "10:00", close: "21:00" }],
      do: [{ open: "10:00", close: "21:00" }],
      vr: [{ open: "10:00", close: "21:00" }],
      za: [{ open: "10:00", close: "17:00" }],
      zo: [{ open: "12:00", close: "17:00" }],
    },
    kosten: { gratis: true },
    laptopvriendelijk: true,
    werkplekken: true,
    doelgroep: "iedereen",
    wifi: true,
    toiletten: true,
    links: {
      website: "https://www.bibliotheekutrecht.nl/vestigingen/neude",
      appleMaps: "https://maps.apple.com/?q=Bibliotheek+Utrecht+Neude&ll=52.0931,5.1175",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.0931,5.1175",
    },
    deals: [],
    verified: false,
  },
  {
    id: "bieb-kanaleneiland",
    naam: "Bibliotheek Utrecht Kanaleneiland",
    stad: "utrecht",
    type: "bibliotheek",
    beschrijving:
      "Bibliotheekvestiging in de wijk Kanaleneiland, goed bereikbaar voor bewoners van het westen van Utrecht.",
    adres: "Hulstkamp 2, 3526 ES Utrecht",
    coordinaten: { lat: 52.07, lng: 5.095 },
    openingstijden: {
      di: [{ open: "11:00", close: "17:00" }],
      wo: [{ open: "11:00", close: "17:00" }],
      do: [{ open: "11:00", close: "17:00" }],
      vr: [{ open: "11:00", close: "17:00" }],
      za: [{ open: "11:00", close: "16:00" }],
    },
    kosten: { gratis: true },
    laptopvriendelijk: true,
    werkplekken: false,
    doelgroep: "iedereen",
    wifi: true,
    toiletten: true,
    links: {
      website: "https://www.bibliotheekutrecht.nl/vestigingen/kanaleneiland",
      appleMaps: "https://maps.apple.com/?q=Bibliotheek+Utrecht+Kanaleneiland&ll=52.07,5.095",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.07,5.095",
    },
    deals: [],
    verified: false,
  },
  {
    id: "bieb-overvecht",
    naam: "Bibliotheek Utrecht Overvecht",
    stad: "utrecht",
    type: "bibliotheek",
    beschrijving:
      "Bibliotheekvestiging in Overvecht, een laagdrempelige plek voor de buurt met collecties en werkplekken.",
    adres: "Saffierstraat 2, 3562 BC Utrecht",
    coordinaten: { lat: 52.11, lng: 5.11 },
    openingstijden: {
      di: [{ open: "11:00", close: "17:00" }],
      wo: [{ open: "11:00", close: "17:00" }],
      do: [{ open: "11:00", close: "17:00" }],
      vr: [{ open: "11:00", close: "17:00" }],
      za: [{ open: "11:00", close: "16:00" }],
    },
    kosten: { gratis: true },
    laptopvriendelijk: true,
    werkplekken: false,
    doelgroep: "iedereen",
    wifi: true,
    toiletten: true,
    links: {
      website: "https://www.bibliotheekutrecht.nl/vestigingen/overvecht",
      appleMaps: "https://maps.apple.com/?q=Bibliotheek+Utrecht+Overvecht&ll=52.11,5.11",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.11,5.11",
    },
    deals: [],
    verified: false,
  },
  {
    id: "bieb-leidscherijn",
    naam: "Bibliotheek Utrecht Leidsche Rijn",
    stad: "utrecht",
    type: "bibliotheek",
    beschrijving:
      "Moderne bibliotheekvestiging in de groeiende wijk Leidsche Rijn, met ruimte voor studeren en werken.",
    adres: "Witkampstraat 1, 3437 XB Nieuwegein",
    coordinaten: { lat: 52.082, lng: 5.034 },
    openingstijden: {
      di: [{ open: "11:00", close: "17:00" }],
      wo: [{ open: "11:00", close: "17:00" }],
      do: [{ open: "11:00", close: "17:00" }],
      vr: [{ open: "11:00", close: "17:00" }],
      za: [{ open: "11:00", close: "16:00" }],
    },
    kosten: { gratis: true },
    laptopvriendelijk: true,
    werkplekken: true,
    doelgroep: "iedereen",
    wifi: true,
    toiletten: true,
    links: {
      website: "https://www.bibliotheekutrecht.nl/vestigingen/leidsche-rijn",
      appleMaps: "https://maps.apple.com/?q=Bibliotheek+Utrecht+Leidsche+Rijn&ll=52.082,5.034",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.082,5.034",
    },
    deals: [],
    verified: false,
  },
  {
    id: "bieb-west",
    naam: "Bibliotheek Utrecht West",
    stad: "utrecht",
    type: "bibliotheek",
    beschrijving:
      "Buurtbibliotheek in Utrecht West, dichtbij het centrum. Kleine maar gezellige vestiging met collectie en studeerplekken.",
    adres: "Drieharingstraat 8, 3511 BJ Utrecht",
    coordinaten: { lat: 52.095, lng: 5.11 },
    openingstijden: {
      di: [{ open: "11:00", close: "17:00" }],
      wo: [{ open: "11:00", close: "17:00" }],
      do: [{ open: "11:00", close: "17:00" }],
      vr: [{ open: "11:00", close: "17:00" }],
      za: [{ open: "11:00", close: "16:00" }],
    },
    kosten: { gratis: true },
    laptopvriendelijk: true,
    werkplekken: false,
    doelgroep: "iedereen",
    wifi: true,
    toiletten: false,
    links: {
      website: "https://www.bibliotheekutrecht.nl",
      appleMaps: "https://maps.apple.com/?q=Bibliotheek+Utrecht+West&ll=52.095,5.11",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.095,5.11",
    },
    deals: [],
    verified: false,
  },

  // === BUURTCENTRA ===
  {
    id: "bc-lombok",
    naam: "Buurtcentrum Lombok",
    stad: "utrecht",
    type: "buurtcentrum",
    beschrijving:
      "Levendig buurtcentrum in de multiculturele wijk Lombok. Allerlei activiteiten, cursussen en een plek om elkaar te ontmoeten.",
    adres: "Kanaalstraat 193, 3531 CJ Utrecht",
    coordinaten: { lat: 52.086, lng: 5.101 },
    openingstijden: {
      ma: [{ open: "09:00", close: "17:00" }],
      di: [{ open: "09:00", close: "17:00" }],
      wo: [{ open: "09:00", close: "17:00" }],
      do: [{ open: "09:00", close: "17:00" }],
      vr: [{ open: "09:00", close: "17:00" }],
    },
    kosten: { gratis: true },
    laptopvriendelijk: false,
    werkplekken: false,
    doelgroep: "iedereen",
    wifi: false,
    toiletten: true,
    links: {
      appleMaps: "https://maps.apple.com/?q=Buurtcentrum+Lombok+Utrecht&ll=52.086,5.101",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.086,5.101",
    },
    deals: [],
    verified: false,
  },
  {
    id: "bc-overvecht",
    naam: "Buurtcentrum Overvecht",
    stad: "utrecht",
    type: "buurtcentrum",
    beschrijving:
      "Wijkcentrum in Overvecht dat als ontmoetingsplek dient voor bewoners. Regelmatig activiteiten voor jong en oud.",
    adres: "Zambesidreef 820, 3563 GS Utrecht",
    coordinaten: { lat: 52.115, lng: 5.12 },
    openingstijden: {
      ma: [{ open: "09:00", close: "17:00" }],
      di: [{ open: "09:00", close: "17:00" }],
      wo: [{ open: "09:00", close: "17:00" }],
      do: [{ open: "09:00", close: "17:00" }],
      vr: [{ open: "09:00", close: "17:00" }],
    },
    kosten: { gratis: true },
    laptopvriendelijk: false,
    werkplekken: false,
    doelgroep: "iedereen",
    wifi: false,
    toiletten: true,
    links: {
      appleMaps: "https://maps.apple.com/?q=Buurtcentrum+Overvecht+Utrecht&ll=52.115,5.12",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.115,5.12",
    },
    deals: [],
    verified: false,
  },
  {
    id: "bc-hoograven",
    naam: "Buurthuis Hoograven",
    stad: "utrecht",
    type: "buurtcentrum",
    beschrijving:
      "Laagdrempelig buurthuis in de wijk Hoograven. Ontmoet je buren, doe mee aan activiteiten of gebruik de ruimte.",
    adres: "Thorbeckelaan 85, 3527 CT Utrecht",
    coordinaten: { lat: 52.072, lng: 5.125 },
    openingstijden: {
      ma: [{ open: "09:00", close: "17:00" }],
      di: [{ open: "09:00", close: "17:00" }],
      wo: [{ open: "09:00", close: "17:00" }],
      do: [{ open: "09:00", close: "17:00" }],
      vr: [{ open: "09:00", close: "17:00" }],
    },
    kosten: { gratis: true },
    laptopvriendelijk: false,
    werkplekken: false,
    doelgroep: "iedereen",
    wifi: false,
    toiletten: true,
    links: {
      appleMaps: "https://maps.apple.com/?q=Buurthuis+Hoograven+Utrecht&ll=52.072,5.125",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.072,5.125",
    },
    deals: [],
    verified: false,
  },

  // === PARKEN ===
  {
    id: "park-griftpark",
    naam: "Griftpark",
    stad: "utrecht",
    type: "park",
    beschrijving:
      "Groen park langs de Grift in Oost-Utrecht. Populair bij studenten en gezinnen, met speelplekken en grasvelden.",
    adres: "Griftpark, Utrecht",
    coordinaten: { lat: 52.0967, lng: 5.1388 },
    openingstijden: ALWAYS_OPEN,
    alwaysOpen: true,
    kosten: { gratis: true },
    laptopvriendelijk: false,
    werkplekken: false,
    doelgroep: "iedereen",
    wifi: false,
    toiletten: false,
    links: {
      appleMaps: "https://maps.apple.com/?q=Griftpark+Utrecht&ll=52.0967,5.1388",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.0967,5.1388",
    },
    deals: [],
    verified: true,
  },
  {
    id: "park-wilhelminapark",
    naam: "Wilhelminapark",
    stad: "utrecht",
    type: "park",
    beschrijving:
      "Charmant stadspark in de villawijk Wilhelminapark. Prachtige vijver, oude bomen en een rustige sfeer.",
    adres: "Wilhelminapark, Utrecht",
    coordinaten: { lat: 52.0869, lng: 5.1397 },
    openingstijden: ALWAYS_OPEN,
    alwaysOpen: true,
    kosten: { gratis: true },
    laptopvriendelijk: false,
    werkplekken: false,
    doelgroep: "iedereen",
    wifi: false,
    toiletten: false,
    links: {
      appleMaps: "https://maps.apple.com/?q=Wilhelminapark+Utrecht&ll=52.0869,5.1397",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.0869,5.1397",
    },
    deals: [],
    verified: true,
  },
  {
    id: "park-lepelenburg",
    naam: "Park Lepelenburg",
    stad: "utrecht",
    type: "park",
    beschrijving:
      "Klein maar geliefd park aan de stadswal, naast het Openluchttheater. Populaire plek voor studenten in de zomer.",
    adres: "Lepelenburg, Utrecht",
    coordinaten: { lat: 52.0897, lng: 5.1278 },
    openingstijden: ALWAYS_OPEN,
    alwaysOpen: true,
    kosten: { gratis: true },
    laptopvriendelijk: false,
    werkplekken: false,
    doelgroep: "iedereen",
    wifi: false,
    toiletten: false,
    links: {
      appleMaps: "https://maps.apple.com/?q=Park+Lepelenburg+Utrecht&ll=52.0897,5.1278",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.0897,5.1278",
    },
    deals: [],
    verified: true,
  },
  {
    id: "park-julianapark",
    naam: "Julianapark",
    stad: "utrecht",
    type: "park",
    beschrijving:
      "Ruim park in Zuilen met grasvelden, bomen en speeltuinen. Rustig en groen, ideaal om even bij te komen.",
    adres: "Julianapark, Utrecht",
    coordinaten: { lat: 52.104, lng: 5.105 },
    openingstijden: ALWAYS_OPEN,
    alwaysOpen: true,
    kosten: { gratis: true },
    laptopvriendelijk: false,
    werkplekken: false,
    doelgroep: "iedereen",
    wifi: false,
    toiletten: false,
    links: {
      appleMaps: "https://maps.apple.com/?q=Julianapark+Utrecht&ll=52.104,5.105",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.104,5.105",
    },
    deals: [],
    verified: true,
  },
  {
    id: "park-maximapark",
    naam: "Maximapark",
    stad: "utrecht",
    type: "park",
    beschrijving:
      "Het grootste stadspark van Utrecht in Leidsche Rijn. Meer dan 100 hectare natuur, water en recreatiemogelijkheden.",
    adres: "Maximapark, Utrecht",
    coordinaten: { lat: 52.103, lng: 5.06 },
    openingstijden: ALWAYS_OPEN,
    alwaysOpen: true,
    kosten: { gratis: true },
    laptopvriendelijk: false,
    werkplekken: false,
    doelgroep: "iedereen",
    wifi: false,
    toiletten: true,
    links: {
      appleMaps: "https://maps.apple.com/?q=Maximapark+Utrecht&ll=52.103,5.06",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.103,5.06",
    },
    deals: [],
    verified: true,
  },

  // === STUDENTENPLEKKEN (zichtbaar met de student-toggle) ===
  {
    id: "ub-binnenstad",
    naam: "Universiteitsbibliotheek Utrecht Binnenstad",
    stad: "utrecht",
    type: "bibliotheek",
    beschrijving:
      "De universiteitsbibliotheek aan de Drift, in monumentale panden in de binnenstad. Honderden studieplekken, stilteruimtes en wifi. Toegang met studenten- of medewerkerspas.",
    adres: "Drift 27, 3512 BR Utrecht",
    coordinaten: { lat: 52.0926, lng: 5.1228 },
    openingstijden: {
      ma: [{ open: "08:00", close: "22:30" }],
      di: [{ open: "08:00", close: "22:30" }],
      wo: [{ open: "08:00", close: "22:30" }],
      do: [{ open: "08:00", close: "22:30" }],
      vr: [{ open: "08:00", close: "22:30" }],
      za: [{ open: "10:00", close: "18:00" }],
      zo: [{ open: "10:00", close: "18:00" }],
    },
    kosten: { gratis: true, indicatie: "Gratis met studentenpas" },
    laptopvriendelijk: true,
    werkplekken: true,
    doelgroep: "studenten",
    wifi: true,
    toiletten: true,
    links: {
      website: "https://www.uu.nl/universiteitsbibliotheek",
      appleMaps: "https://maps.apple.com/?q=Universiteitsbibliotheek+Utrecht+Binnenstad&ll=52.0926,5.1228",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.0926,5.1228",
    },
    deals: [],
    verified: false,
  },
  {
    id: "ub-sciencepark",
    naam: "Universiteitsbibliotheek Utrecht Science Park",
    stad: "utrecht",
    type: "bibliotheek",
    beschrijving:
      "De grootste universiteitsbibliotheek van Utrecht, op het Utrecht Science Park (De Uithof). Ruim 2.000 studieplekken, lange openingstijden en goede wifi. Toegang met studenten- of medewerkerspas.",
    adres: "Heidelberglaan 3, 3584 CS Utrecht",
    coordinaten: { lat: 52.0846, lng: 5.1714 },
    openingstijden: {
      ma: [{ open: "08:00", close: "22:30" }],
      di: [{ open: "08:00", close: "22:30" }],
      wo: [{ open: "08:00", close: "22:30" }],
      do: [{ open: "08:00", close: "22:30" }],
      vr: [{ open: "08:00", close: "22:30" }],
      za: [{ open: "10:00", close: "22:30" }],
      zo: [{ open: "10:00", close: "22:30" }],
    },
    kosten: { gratis: true, indicatie: "Gratis met studentenpas" },
    laptopvriendelijk: true,
    werkplekken: true,
    doelgroep: "studenten",
    wifi: true,
    toiletten: true,
    links: {
      website: "https://www.uu.nl/universiteitsbibliotheek",
      appleMaps: "https://maps.apple.com/?q=Universiteitsbibliotheek+Utrecht+Science+Park&ll=52.0846,5.1714",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=52.0846,5.1714",
    },
    deals: [],
    verified: false,
  },
];

export function getPlacesByCity(stad: string): Place[] {
  return places.filter((p) => p.stad === stad);
}
