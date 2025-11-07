import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RDAP Client | Sayed',
  description: 'A Registration Data Access Protocol (RDAP) client for querying domain and IP address registration information',
  openGraph: {
    title: 'RDAP Client',
    description: 'A Registration Data Access Protocol (RDAP) client for querying domain and IP address registration information',
    url: 'https://sayed.app/projects/rdapclient',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=RDAP Client',
        width: 1200,
        height: 630,
        alt: 'RDAP Client | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RDAP Client',
    description: 'Modern RDAP client for domain and IP lookup',
    images: ['/api/og/project?title=RDAP Client'],
  },
};
