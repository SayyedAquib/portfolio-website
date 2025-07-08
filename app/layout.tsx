import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aquib Sayyed - Software Engineer",
  description:
    "Frontend Developer & TECH Enthusiast specializing in React, Next.js, and modern web technologies. View my portfolio and get in touch.",
  keywords: [
    "frontend developer",
    "react developer",
    "next.js",
    "javascript",
    "typescript",
    "web developer",
    "ui/ux",
  ],
  authors: [{ name: "Aquib Sayyed" }],
  creator: "Aquib Sayyed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aquibsayyed.vercel.app/",
    title: "Aquib Sayyed - Frontend Developer",
    description:
      "Frontend Developer & TECH Enthusiast specializing in React, Next.js, and modern web technologies.",
    siteName: "Aquib Sayyed Portfolio",
    images: [
      {
        url: "https://ik.imagekit.io/ftt55iirby/image.png?updatedAt=1751962968700",
        width: 1200,
        height: 630,
        alt: "Aquib Sayyed - Frontend Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aquib Sayyed - Frontend Developer",
    description:
      "Frontend Developer & TECH Enthusiast specializing in React, Next.js, and modern web technologies.",
    creator: "@Sayyed_Aquibb",
    images: [
      "https://ik.imagekit.io/ftt55iirby/image.png?updatedAt=1751962968700",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.dev",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
