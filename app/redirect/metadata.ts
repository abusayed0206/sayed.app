import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirect Service | Sayed',
  description: 'URL shortening and redirect management service - Coming soon',
  openGraph: {
    title: 'Redirect Service | Sayed',
    description: 'URL shortening and redirect management service - Coming soon',
    url: 'https://sayed.app/redirect',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Redirect Service',
        width: 1200,
        height: 630,
        alt: 'Redirect Service | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redirect Service | Sayed',
    description: 'URL shortening and redirect management service - Coming soon',
    images: ['/api/og/project?title=Redirect Service'],
  },
};
