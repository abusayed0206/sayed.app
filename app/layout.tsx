import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Siliguri, Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif-display" });
// Geist has no Bengali glyphs; this fills them in for names like সাঈদ.
const bangla = Hind_Siliguri({ subsets: ["bengali"], weight: ["400", "600"], variable: "--font-bangla" });

const description =
  "The project hub of Abu Sayed: Windows apps used by 6,000+ people, Bangla web tools and APIs, open-source libraries, and civil engineering research.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sayed.app"),
  title: { default: "sayed.app: projects by Abu Sayed", template: "%s · sayed.app" },
  description,
  keywords: ["Abu Sayed", "projects", "Bangla apps", "Windows apps", "Cloudflare", "civil engineering"],
  authors: [{ name: "ABU SAYED", url: "https://sayed.dev" }],
  creator: "ABU SAYED",
  openGraph: {
    title: "sayed.app: projects by Abu Sayed",
    description,
    url: "https://sayed.app/",
    siteName: "sayed.app",
    images: [{ url: "/api/og/project?title=Projects%20by%20Abu%20Sayed", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

// Applies the saved theme before first paint.
const themeScript = `(function(){try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${serif.variable} ${bangla.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background text-foreground font-sans antialiased min-h-dvh flex flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-card focus:px-3 focus:py-2 focus:rounded-md">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
