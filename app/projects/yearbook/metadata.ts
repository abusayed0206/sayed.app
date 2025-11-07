import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yearbook | Sayed',
  description: 'A digital yearbook platform for preserving memories and connecting with classmates',
  openGraph: {
    title: 'Yearbook',
    description: 'A digital yearbook platform for preserving memories and connecting with classmates',
    url: 'https://sayed.app/projects/yearbook',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Yearbook',
        width: 1200,
        height: 630,
        alt: 'Yearbook | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yearbook',
    description: 'Digital yearbook platform for preserving memories',
    images: ['/api/og/project?title=Yearbook'],
  },
};
