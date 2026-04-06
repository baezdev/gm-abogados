// @ts-check
import { defineConfig, envField } from "astro/config";
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
  env: {
    schema: {
      EMAIL_FROM: envField.string({
        context: "client",
        access: "public",
        default: "gm@correo.gm-abogados.com.mx",
      }),
      EMAIL_TO: envField.string({
        context: "client",
        access: "public",
        default: "baezdev@gmail.com",
      }),
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
        default: "",
      }),
    },
  },
  output: "server",
  adapter: netlify(),
});
