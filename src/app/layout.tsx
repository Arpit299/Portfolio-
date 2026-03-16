import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arpit Kumawat | AI Portfolio",
  description:
    "Premium AI portfolio showcasing expertise in prompt engineering, AI agents, RAG systems, and full-stack development. Architecting Intelligence. Mastering Time & Code.",
  keywords: [
    "AI Portfolio",
    "Prompt Engineering",
    "AI Agents",
    "RAG Systems",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "Machine Learning",
  ],
  authors: [{ name: "Arpit Kumawat" }],
  creator: "Arpit Kumawat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arpitkumawat.dev",
    title: "Arpit Kumawat | AI Portfolio",
    description: "Premium AI portfolio - Architecting Intelligence. Mastering Time & Code.",
    siteName: "Arpit Kumawat Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arpit Kumawat | AI Portfolio",
    description: "Premium AI portfolio - Architecting Intelligence. Mastering Time & Code.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Arpit Kumawat Portfolio",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#020C1B",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FFD700" />
        <meta name="msapplication-TileColor" content="#020C1B" />
      </head>
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
