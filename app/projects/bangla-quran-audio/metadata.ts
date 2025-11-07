import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bangla Quran Audio | Sayed',
  description: 'A web application providing the complete Quran with Bangla translation and audio recitation',
  openGraph: {
    title: 'Bangla Quran Audio',
    description: 'A web application providing the complete Quran with Bangla translation and audio recitation',
    url: 'https://sayed.app/projects/bangla-quran-audio',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Bangla Quran Audio',
        width: 1200,
        height: 630,
        alt: 'Bangla Quran Audio | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangla Quran Audio',
    description: 'Complete Quran with Bangla translation and audio',
    images: ['/api/og/project?title=Bangla Quran Audio'],
  },
};
