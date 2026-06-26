import type { Metadata } from "next";
import { Red_Hat_Display, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Design System fonts: Red Hat Display for all UI + display, JetBrains Mono for
// eyebrows, labels, metadata, and code.
const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
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
    "Case studies, articles, and a professional profile from Murilo Capanema — scaling engineering organizations and the platforms they ship.",
};

// Runs before first paint: apply a persisted theme choice so there is no
// flash. No stored choice = leave data-theme unset, so :root's
// `color-scheme: light dark` keeps following the OS (the default behavior).
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${redHatDisplay.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      {/* Colors come from semantic tokens that re-resolve per Mode via
      light-dark()/color-scheme, so no `dark:` variants are needed. */}
      <body className="bg-surface-primary text-text-primary min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a
          href="#main-content"
          className="fixed top-[-40px] left-2 z-50 bg-action-primary px-4 py-2 text-sm font-semibold text-text-on-accent transition-all focus:top-2 focus:rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-focus-ring"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}