import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

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
        url: "/imgs/OG.png",
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
    images: ["/imgs/OG.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hindSiliguri.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
