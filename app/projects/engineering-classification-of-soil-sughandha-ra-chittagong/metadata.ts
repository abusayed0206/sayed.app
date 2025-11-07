import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Classification of Soil | Sughandha R/A, Chittagong | Sayed',
  description: 'Geotechnical engineering lab project under CE 332 course at CUET - Comprehensive soil classification and analysis',
  openGraph: {
    title: 'Engineering Classification of Soil | Sughandha R/A, Chittagong',
    description: 'Geotechnical engineering lab project under CE 332 course at CUET - Comprehensive soil classification and analysis',
    url: 'https://sayed.app/projects/engineering-classification-of-soil-sughandha-ra-chittagong',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Engineering Classification of Soil',
        width: 1200,
        height: 630,
        alt: 'Engineering Classification of Soil | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Classification of Soil | Sughandha R/A, Chittagong',
    description: 'Geotechnical engineering lab project under CE 332 course at CUET',
    images: ['/api/og/project?title=Engineering Classification of Soil'],
  },
};
