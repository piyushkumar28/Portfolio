// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Fonts are self-hosted from the Fontsource packages (no third-party requests at runtime).
// Astro generates the @font-face rules, preload links and metric-matched fallbacks.
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Newsreader",
      cssVariable: "--font-newsreader",
      fallbacks: ["Georgia", "serif"],
      options: {
        variants: [
          {
            src: ["@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2"],
            weight: "200 800",
            style: "normal",
          },
          {
            src: ["@fontsource-variable/newsreader/files/newsreader-latin-opsz-italic.woff2"],
            weight: "200 800",
            style: "italic",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Instrument Sans",
      cssVariable: "--font-instrument-sans",
      fallbacks: ["Helvetica Neue", "Arial", "sans-serif"],
      options: {
        variants: [
          {
            src: [
              "@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2",
            ],
            weight: "400 700",
            style: "normal",
          },
        ],
      },
    },
  ],
});
