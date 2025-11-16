import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDPO Helper | Sayed',
  description: 'A web application to make email for sending to data fiduciary to complying with the Personal Data Protection Ordinance, 2025 (PDPO)',
  openGraph: {
    title: 'Personal Data Protection Ordinance, 2025 (PDPO) helper',
    description: 'A web application to make email for sending to data fiduciary to complying with the Personal Data Protection Ordinance, 2025 (PDPO)',
    url: 'https://sayed.app/projects/pdpo',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=PDPO Helper',
        width: 1200,
        height: 630,
        alt: 'PDPO Helper | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDPO Helper',
    description: 'Compliance tool for Personal Data Protection Ordinance, 2025',
    images: ['/api/og/project?title=PDPO Helper'],
  },
};
