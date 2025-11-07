import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digitalized Bangla Films on IMDb & TMDb | Sayed',
  description: 'A comprehensive project to digitalize and update Bangla film information on IMDb and TMDb databases',
  openGraph: {
    title: 'Digitalized Bangla Films on IMDb & TMDb',
    description: 'A comprehensive project to digitalize and update Bangla film information on IMDb and TMDb databases',
    url: 'https://sayed.app/projects/digitalized-bangla-films-updating-on-imdb-and-tmdb',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Digitalized Bangla Films on IMDb & TMDb',
        width: 1200,
        height: 630,
        alt: 'Digitalized Bangla Films | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digitalized Bangla Films on IMDb & TMDb',
    description: 'Digitalizing Bangla film information for global databases',
    images: ['/api/og/project?title=Digitalized Bangla Films on IMDb & TMDb'],
  },
};
