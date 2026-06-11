import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "blauw-vlak": "#b6dde5",
        "blauw-diep": "#0271a8",
        inkt: "#111111",
        papier: "#fdfcf8",
        koraal: "#ff7f63",
        paars: "#8974d1",
        "groen-vlak": "#56ddac",
        "groen-tekst": "#0e8c5f",
        "geel-vlak": "#f9fa97",
        "geel-tekst": "#8a7a00",
        "stadsrood-utrecht": "#cc0000",
      },
      borderRadius: {
        xl2: "18px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Avenir Next", "Segoe UI", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
