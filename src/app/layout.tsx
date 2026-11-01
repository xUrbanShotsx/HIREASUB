import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import { Motion } from "@/components/Motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const mono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description =
  "HireASub connects builders and homeowners with licensed, insured subcontractors. Post a job, compare fixed quotes and book the trade, with licences and insurance checked first.";

export const metadata: Metadata = {
  title: {
    default: "HireASub | Hire licensed subcontractors, checked before they arrive",
    template: "%s | HireASub",
  },
  description,
  applicationName: "HireASub",
  openGraph: {
    type: "website",
    siteName: "HireASub",
    locale: "en_AU",
    title: "HireASub | Hire licensed subcontractors",
    description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e42855",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-AU"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <Motion />
        <Navbar />
        <main className="flex-1 pt-20 sm:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
