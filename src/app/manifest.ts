import type { MetadataRoute } from "next";

// Served at /manifest.webmanifest; Next injects <link rel="manifest"> for it.
// Mirrors the generated site.webmanifest. The two icons live in /public.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Capanema",
    short_name: "Capanema",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
}
