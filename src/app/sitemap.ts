import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://derdeplekken.nl", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://derdeplekken.nl/utrecht", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://derdeplekken.nl/het-belang-van-derde-plekken", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://derdeplekken.nl/over-derde-plekken", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
