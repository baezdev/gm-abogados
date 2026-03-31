// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://gm-abogados.com.mx",
  integrations: [
    svelte(),
    sitemap({
      changefreq: "weekly",
      priority: 1.0,
      lastmod: new Date(),
      customPages: [
        "https://gm-abogados.com.mx/",
        "https://gm-abogados.com.mx/legal/privacidad",
        "https://gm-abogados.com.mx/legal/terminos",
      ],
    }),
  ],
  output: "server",
  adapter: netlify(),
});
