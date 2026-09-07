import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Oswald, Inter } from "next/font/google";
import club from "@/data/club";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const heading = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  // Placeholder domain for absolute OG/Twitter image URLs — update once the
  // official Manassas United domain is live.
  metadataBase: new URL("https://www.manassasunited.org"),
  title: {
    default: club.seo.defaultTitle,
    template: `%s | ${club.clubName}`,
  },
  description: club.seo.defaultDescription,
  icons: {
    icon: club.logo.path,
    shortcut: club.logo.path,
    apple: club.logo.path,
  },
  openGraph: {
    title: club.seo.defaultTitle,
    description: club.seo.defaultDescription,
    siteName: club.clubName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: club.seo.defaultTitle,
    description: club.seo.defaultDescription,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
