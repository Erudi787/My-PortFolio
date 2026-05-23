import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";

// Inter variable — the workhorse. All weights up to 800 for bold display.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// JetBrains Mono — small mono accents (timestamps, status pills, etc.)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Fraunces — used only for the *one* serif italic moment per page.
// Keeps the rhetorical contrast without falling back into editorial pattern.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Elwison Denampo — Full-Stack Engineer",
    template: "%s · Elwison Denampo",
  },
  description:
    "Full-stack engineer shipping production systems — most recently a property-management platform with 45+ NestJS modules and an EdTech platform engineered for 3,000+ concurrent users.",
  keywords: [
    "Full-Stack Engineer",
    "Backend Engineer",
    "NestJS",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Cebu",
    "Philippines",
  ],
  authors: [{ name: "Elwison Denampo" }],
  creator: "Elwison Denampo",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Elwison Denampo",
    title: "Elwison Denampo — Full-Stack Engineer",
    description:
      "Full-stack engineer shipping production systems — NestJS, FastAPI, Next.js, Postgres.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elwison Denampo — Full-Stack Engineer",
    description: "Building production systems — NestJS, FastAPI, Next.js, Postgres.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} font-sans bg-bg text-fg antialiased`}
      >
        {/* 5 named-theme presets, iris is the canonical default. */}
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="iris"
          themes={['iris', 'emerald', 'copper', 'voltage', 'mono']}
          enableSystem={false}
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-fg focus:text-bg focus:rounded-md focus:outline-none"
          >
            Skip to main content
          </a>

          <Header />
          <main id="main-content" className="min-h-screen" role="main">
            {children}
            <Analytics />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
