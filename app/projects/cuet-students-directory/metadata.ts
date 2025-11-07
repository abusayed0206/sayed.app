import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CUET Students Directory | Sayed',
  description: 'A web app of all CUET students directory in a simple, fast, sortable, and searchable interface',
  openGraph: {
    title: 'CUET Students Directory',
    description: 'A web app of all CUET students directory in a simple, fast, sortable, and searchable interface',
    url: 'https://sayed.app/projects/cuet-students-directory',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=CUET Students Directory',
        width: 1200,
        height: 630,
        alt: 'CUET Students Directory | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CUET Students Directory',
    description: 'A web app of all CUET students directory',
    images: ['/api/og/project?title=CUET Students Directory'],
  },
};
