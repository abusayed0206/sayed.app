import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Telegraph CMS | Sayed',
  description: 'A simple and elegant content management system built on Telegraph API for creating and managing articles',
  openGraph: {
    title: 'Telegraph CMS',
    description: 'A simple and elegant content management system built on Telegraph API for creating and managing articles',
    url: 'https://sayed.app/projects/telegraph-cms',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Telegraph CMS',
        width: 1200,
        height: 630,
        alt: 'Telegraph CMS | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telegraph CMS',
    description: 'A simple content management system built on Telegraph API',
    images: ['/api/og/project?title=Telegraph CMS'],
  },
};
