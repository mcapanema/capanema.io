import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Design System fonts: Inter for all UI + display, JetBrains Mono for
// eyebrows, labels, metadata, and code.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Murilo Capanema — Technology & Engineering Leadership",
    template: "%s · Murilo Capanema",
  },
  description:
    "Case studies, writing, and a professional profile from Murilo Capanema — scaling engineering organizations and the platforms they ship.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      {/* Colors come from semantic tokens; they re-resolve per Mode via
          prefers-color-scheme, so no `dark:` variants are needed. */}
      <body className="min-h-full bg-surface-primary text-text-primary">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
