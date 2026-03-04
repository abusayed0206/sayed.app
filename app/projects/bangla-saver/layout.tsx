import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BanglaSaver | Sayed',
  description: 'Free screensaver manager for Windows 10 and 11. One-click Bangla screensaver setup, preview before applying, clean removal — under 3 MB, no admin rights needed.',
  openGraph: {
    title: 'BanglaSaver',
    description: 'Free screensaver manager for Windows 10 and 11. One-click Bangla screensaver setup, preview before applying, clean removal — under 3 MB, no admin rights needed.',
    url: 'https://sayed.app/projects/bangla-saver',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=BanglaSaver',
        width: 1200,
        height: 630,
        alt: 'BanglaSaver | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BanglaSaver',
    description: 'Free screensaver manager for Windows 10 and 11. One-click Bangla screensaver setup, preview before applying, clean removal — under 3 MB, no admin rights needed.',
    images: ['/api/og/project?title=BanglaSaver'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
