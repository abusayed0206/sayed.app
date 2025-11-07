import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bangla Movies & Series TMDb Wrapper | Sayed',
  description: 'A Node.js library to access Bangla movies and series data from TMDb API with easy-to-use methods',
  openGraph: {
    title: 'Bangla Movies & Series TMDb Wrapper',
    description: 'A Node.js library to access Bangla movies and series data from TMDb API with easy-to-use methods',
    url: 'https://sayed.app/projects/bangla-movies-series-tmdb-wrapper',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Bangla Movies & Series TMDb Wrapper',
        width: 1200,
        height: 630,
        alt: 'Bangla Movies & Series TMDb Wrapper | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangla Movies & Series TMDb Wrapper',
    description: 'A Node.js library for TMDb API',
    images: ['/api/og/project?title=Bangla Movies & Series TMDb Wrapper'],
  },
};
