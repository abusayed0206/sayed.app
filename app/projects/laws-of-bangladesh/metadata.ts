import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laws of Bangladesh | Sayed',
  description: 'A collection of Bangladesh laws in Bangla, making legal documents accessible and searchable',
  openGraph: {
    title: 'Laws of Bangladesh',
    description: 'A collection of Bangladesh laws in Bangla, making legal documents accessible and searchable',
    url: 'https://sayed.app/projects/laws-of-bangladesh',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Laws of Bangladesh',
        width: 1200,
        height: 630,
        alt: 'Laws of Bangladesh | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laws of Bangladesh',
    description: 'A collection of Bangladesh laws in Bangla',
    images: ['/api/og/project?title=Laws of Bangladesh'],
  },
};
