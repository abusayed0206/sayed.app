import type { Metadata } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sayed.app'),
  title: "Sayed | Projects",
  description: "To showcase my projects and research work",
  keywords: ["portfolio", "projects", "research"],
  authors: [
    {
      name: "Sayed | Projects",
      url: "https://sayed.app",
    },
  ],
  creator: "Sayed | Projects",
  openGraph: {
    title: "Sayed | Projects",
    description: "To showcase my projects and research work",
    url: "https://sayed.app/",
    siteName: "Sayed",
    images: [
      {
        url: "/api/og/project?title=Sayed | Projects",
        width: 1200,
        height: 630,
        alt: "Sayed | Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayed | Projects",
    description: "To showcase my projects and research work",
    images: ["/api/og/project?title=Sayed | Projects"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${hindSiliguri.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
