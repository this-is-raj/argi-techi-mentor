import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agro TechieMentor - Premium Agricultural Exports from India",
  description:
    "Export premium spices, pulses, fresh vegetables, and agricultural products from India to 50+ countries. Quality certified agricultural exports with global shipping.",
  keywords:
    "agricultural exports, spices, pulses, vegetables, grains, oil seeds, India exports, quality products",
  authors: [{ name: "Agro TechieMentor" }],
  creator: "Agro TechieMentor",
  publisher: "Agro TechieMentor",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agritechimentor.com",
    siteName: "Agro TechieMentor",
    title: "Agro TechieMentor - Premium Agricultural Exports",
    description:
      "Premium agricultural products exported from India to global markets",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Agro TechieMentor Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agro TechieMentor - Premium Agricultural Exports",
    description: "Export quality agricultural products from India",
  },
  generator: "Sanraaj.com",
  icons: {
    icon: [
      {
        url: "/Logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/Logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/Logo.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Agro TechieMentor",
              url: "https://agritechimentor.com",
              logo: "https://agritechimentor.com/logo.png",
              description: "Premium agricultural products exporter from India",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Sales",
                telephone: "+91-9549235277",
                email: "techiementor.co@gmail.com",
              },
              sameAs: [
                "https://www.facebook.com/agritechimentor",
                "https://twitter.com/agritechimentor",
              ],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
