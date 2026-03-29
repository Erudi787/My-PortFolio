import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Elwison Denampo | Full-Stack Developer Portfolio",
    template: "%s | Elwison Denampo",
  },
  description: "Full-Stack Developer specializing in backend development, system design, and scalable APIs. Experienced with FastAPI, Next.js, PostgreSQL, and AI integration.",
  keywords: [
    "Full-Stack Developer",
    "Backend Developer",
    "Full Stack Developer",
    "FastAPI",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Python",
    "Cebu",
    "Philippines",
  ],
  authors: [{ name: "Elwison Denampo" }],
  creator: "Elwison Denampo",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Elwison Denampo Portfolio",
    title: "Elwison Denampo | Full-Stack Developer",
    description: "Full-Stack Developer specializing in backend development and scalable systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elwison Denampo | Full-Stack Developer",
    description: "Full-Stack Developer specializing in backend development and scalable systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-[#F8F9FA] dark:bg-[#030712] text-[#070B0C] dark:text-[#f8fafc] antialiased transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#043CAA] focus:text-white focus:rounded-md focus:outline-none"
          >
            Skip to main content
          </a>

          <Header />
          <main id="main-content" className="min-h-screen pt-20" role="main">
            {children}
            <Analytics />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
