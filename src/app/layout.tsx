import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/css';
import 'swiper/css/navigation'; // if you use navigation
import 'swiper/css/pagination'; // if you use pagination
import "yet-another-react-lightbox/styles.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: '--font-rubik' // Define CSS variable
});

export const metadata: Metadata = {
  title: "Erudi's Developer Portfolio",
  description: "Showcasing backend projects and expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} bg-[#F8F9FA] text-[#070B0C] antialiased`}>
        <Header />
        <main className="min-h-screen pt-20"> {/* Adjust pt if header height changes */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
