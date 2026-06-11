# Derdeplekken.nl

Web platform for discovering third places (derde plekken) in Dutch cities — starting with Utrecht.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Leaflet/OpenStreetMap.

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with city selector |
| `/utrecht` | Interactive map with all Utrecht third places |
| `/het-belang-van-derde-plekken` | SEO article about the importance of third places |

---

## How to add a place

Open `src/data/places.ts` and add a new entry to the `places` array. Example:

```ts
{
  id: "bc-mijn-buurthuis",           // unique slug
  naam: "Buurthuis Mijn Naam",
  stad: "utrecht",                    // city slug
  type: "buurtcentrum",               // bibliotheek | buurtcentrum | park | horeca
  beschrijving: "Kort beschrijving.",
  adres: "Straat 1, 3500 AA Utrecht",
  coordinaten: { lat: 52.09, lng: 5.12 },
  openingstijden: {
    ma: [{ open: "09:00", close: "17:00" }],
    di: [{ open: "09:00", close: "17:00" }],
    // ... add days as needed
  },
  kosten: { gratis: true },
  laptopvriendelijk: false,
  werkplekken: false,
  doelgroep: "iedereen",
  wifi: false,
  toiletten: true,
  links: {
    website: "https://example.nl",
    appleMaps: "https://maps.apple.com/?q=Naam&ll=52.09,5.12",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=52.09,5.12",
  },
  deals: [],
  verified: false,   // set to true once you've confirmed the opening hours
}
```

For parks and always-open places, set `alwaysOpen: true`.

---

## How to add a deal

Add a deal inside the `deals` array of a place:

```ts
deals: [
  {
    id: "deal-koffie-studenten",
    titel: "Studentenkoffie € 1,50",
    beschrijving: "Koffie voor € 1,50 als je komt studeren op rustige ochtenden.",
    dagen: ["ma", "di", "wo", "do", "vr"],
    tijdvak: { van: "09:00", tot: "12:00" },
    prijs: "€ 1,50",
    doelgroep: "studenten",
  },
]
```

Deals are automatically shown in the place detail panel and marked on the map when active.

---

## How to add a new city

1. Add place entries to `src/data/places.ts` with the new `stad` slug (e.g. `"amsterdam"`).
2. Create `src/app/amsterdam/page.tsx` — copy `/utrecht/page.tsx` and change the city slug.
3. Create `src/app/amsterdam/AmsterdamClient.tsx` — copy `UtrechtClient.tsx` and change the filter.
4. Add the city to the homepage city selector in `src/app/page.tsx`.
5. Add it to `src/app/sitemap.ts`.

---

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

---

## Deploy to derdeplekken.nl

### Vercel (recommended)

1. Push to GitHub.
2. Import the repo on [vercel.com](https://vercel.com).
3. Set the root directory to `/` (default).
4. Add custom domains `derdeplekken.nl` and `derdeplekken.com` in Vercel's domain settings.
5. For `.com` → `.nl` redirect: in Vercel, add `derdeplekken.com` as a redirect to `derdeplekken.nl`.

No environment variables needed for the current setup.

### Other hosts

The site is fully static (`output: 'export'` can be added to `next.config.ts` if needed). Any static host (Netlify, Cloudflare Pages, etc.) works.
