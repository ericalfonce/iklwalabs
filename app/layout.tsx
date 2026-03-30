import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iklwalabs.co.tz"),
  title: {
    default: "IklwaLabs — Cybersecurity & IT Solutions | Arusha, Tanzania",
    template: "%s | IklwaLabs",
  },
  description:
    "IklwaLabs is a cybersecurity and IT solutions company based in Arusha, Tanzania. We offer web vulnerability scanning, digital forensics, security training, and IT infrastructure services for African SMEs.",
  keywords: [
    "cybersecurity Tanzania",
    "cybersecurity company Arusha",
    "web vulnerability scanner Tanzania",
    "IT security East Africa",
    "digital forensics Tanzania",
    "website security audit Tanzania",
    "MulikaScans",
    "IklwaLabs",
    "cybersecurity SME Africa",
  ],
  authors: [{ name: "IklwaLabs", url: "https://iklwalabs.co.tz" }],
  creator: "IklwaLabs",
  publisher: "IklwaLabs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  openGraph: {
    type: "website",
    locale: "en_TZ",
    url: "https://iklwalabs.co.tz",
    siteName: "IklwaLabs",
    title: "IklwaLabs — Cybersecurity & IT Solutions | Arusha, Tanzania",
    description:
      "Securing African businesses with web vulnerability scanning, digital forensics, and IT solutions. Based in Arusha, Tanzania.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IklwaLabs — Cybersecurity & IT Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IklwaLabs — Cybersecurity & IT Solutions | Arusha, Tanzania",
    description:
      "Securing African businesses with web vulnerability scanning, digital forensics, and IT solutions.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://iklwalabs.co.tz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <JsonLd />
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
