import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vertical Extension of Civil Engineering Building | Sayed',
  description: 'UG Thesis project on vertical extension and seismic evaluation of the Civil Engineering Building at CUET, originally built in 1968',
  openGraph: {
    title: 'Vertical Extension of Civil Engineering Building',
    description: 'UG Thesis project on vertical extension and seismic evaluation of the Civil Engineering Building at CUET, originally built in 1968',
    url: 'https://sayed.app/projects/vertical-extension-of-civil-engineering-building',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Vertical Extension of Civil Engineering Building',
        width: 1200,
        height: 630,
        alt: 'Vertical Extension of Civil Engineering Building | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vertical Extension of Civil Engineering Building',
    description: 'UG Thesis project on vertical extension and seismic evaluation',
    images: ['/api/og/project?title=Vertical Extension of Civil Engineering Building'],
  },
};
