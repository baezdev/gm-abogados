// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://gm-abogados.com.mx",
  integrations: [
    react(),
    sitemap({
      changefreq: "weekly",
      priority: 1.0,
      lastmod: new Date(),
      customPages: [
        "https://gm-abogados.com.mx/",
      ],
    }),
  ],
  output: "server",
  adapter: netlify(),
});
