import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StarBackground from "../components/StarBackground";
import MountainSilhouette from "../components/MountainSilhouette";
import SeasonalParticles from "../components/SeasonalParticles";
import FloatingBackToTop from "../components/FloatingBackToTop";
import Preloader from "../components/Preloader";
import { ThemeProvider } from "../components/ThemeProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Elwison Denampo | Full-Stack Developer",
    template: "%s | Elwison Denampo",
  },
  description:
    "Full-stack developer building production systems. Recent work includes an auto-updating podcast site for Dr. Rena Malik, MD on AWS (Astro + CDK + Lambda + DynamoDB) and LaChowOS, a property-management platform with 45+ NestJS modules.",
  keywords: [
    "Full-Stack Developer",
    "Backend Developer",
    "NestJS",
    "FastAPI",
    "Next.js",
    "Astro",
    "TypeScript",
    "AWS",
    "AWS CDK",
    "AWS Lambda",
    "DynamoDB",
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
    title: "Elwison Denampo | Full-Stack Developer",
    description: "Full-stack developer building production systems — NestJS, FastAPI, Next.js, Astro, AWS CDK, Postgres.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elwison Denampo | Full-Stack Developer",
    description: "Full-stack developer building production systems — NestJS, FastAPI, Next.js, Astro, AWS CDK, Postgres.",
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="spring-night"
          themes={[
            'spring-night', 'spring-morning',
            'summer-night', 'summer-morning',
            'autumn-night', 'autumn-morning',
            'winter-night', 'winter-morning',
            'meteors-night', 'meteors-morning',
          ]}
          enableSystem={false}
        >
          <a
            href="#hero"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
          >
            Skip to main content
          </a>

          <Preloader />
          <StarBackground />
          <MountainSilhouette />
          <SeasonalParticles />
          <Navbar />

          <main className="relative z-10">
            {children}
            <Analytics />
          </main>

          <Footer />
          <FloatingBackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
