import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bangla Quran Windows App | Sayed',
  description: 'A Windows desktop application for reading and listening to the Quran with Bangla translation',
  openGraph: {
    title: 'Bangla Quran Windows App',
    description: 'A Windows desktop application for reading and listening to the Quran with Bangla translation',
    url: 'https://sayed.app/projects/bangla-quran-windows-app',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Bangla Quran Windows App',
        width: 1200,
        height: 630,
        alt: 'Bangla Quran Windows App | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangla Quran Windows App',
    description: 'Windows desktop app for Quran with Bangla translation',
    images: ['/api/og/project?title=Bangla Quran Windows App'],
  },
};
