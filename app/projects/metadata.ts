import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Sayed',
  description: 'Explore my academic research and personal projects in civil engineering, web development, and more',
  openGraph: {
    title: 'Projects | Sayed',
    description: 'Explore my academic research and personal projects in civil engineering, web development, and more',
    url: 'https://sayed.app/projects',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Projects',
        width: 1200,
        height: 630,
        alt: 'Projects | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Sayed',
    description: 'Explore my academic research and personal projects in civil engineering, web development, and more',
    images: ['/api/og/project?title=Projects'],
  },
};
