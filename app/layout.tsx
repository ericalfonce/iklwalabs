import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";

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
  metadataBase: new URL("https://iklwalabs.com"),
  title: "IklwaLabs — Cybersecurity & IT Solutions, Tanzania",
  description:
    "IklwaLabs secures African businesses with web vulnerability scanning, digital forensics, and IT solutions. Based in Arusha, Tanzania.",
  openGraph: {
    title: "IklwaLabs — Cybersecurity & IT Solutions, Tanzania",
    description:
      "IklwaLabs secures African businesses with web vulnerability scanning, digital forensics, and IT solutions. Based in Arusha, Tanzania.",
    url: "https://iklwalabs.com",
    siteName: "IklwaLabs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IklwaLabs — Cybersecurity & IT Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IklwaLabs — Cybersecurity & IT Solutions, Tanzania",
    description:
      "IklwaLabs secures African businesses with web vulnerability scanning, digital forensics, and IT solutions.",
    images: ["/og-image.png"],
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
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
