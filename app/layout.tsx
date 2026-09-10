import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import ThemedBackground from "@/components/theme/ThemedBackground";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Prashant Pal — Full Stack Developer",
  description:
    "Prashant Pal — Full Stack Developer & System Architect. Building scalable web applications with React, Node.js & NestJS at MediaNv Aidos Pvt Ltd, Ahmedabad. 40% backend stability, 30% memory reduction, 40% LCP lift.",
  metadataBase: new URL("https://prashantpal.dev"),
  openGraph: {
    title: "Prashant Pal — Full Stack Developer",
    description:
      "Full Stack Engineer architecting high-throughput systems with React 19, Next.js, NestJS & AWS.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1D1D1F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Material Symbols - required by Stitch design */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Prashant Pal",
              jobTitle: "Full Stack Engineer",
              email: "mailto:palprashant156@gmail.com",
              worksFor: { "@type": "Organization", name: "MediaNv Aidos Pvt Ltd" },
              knowsAbout: ["React", "Next.js", "Node.js", "NestJS", "PostgreSQL", "AWS", "Docker"],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-background font-body-md text-body-md text-on-surface antialiased`}
        style={{ background: "var(--bg-gradient)", transition: "background 700ms ease, color 700ms ease" }}
      >
        <ThemeProvider>
          <ThemedBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
