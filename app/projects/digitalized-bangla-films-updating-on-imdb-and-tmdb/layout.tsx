import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digitalized Bangla Films | Sayed',
  description: 'A data project to add and update old Bangla films on IMDb and TMDB, preserving Bengali cinema history digitally.',
  openGraph: {
    title: 'Digitalized Bangla Films',
    description: 'A data project to add and update old Bangla films on IMDb and TMDB, preserving Bengali cinema history digitally.',
    url: 'https://sayed.app/projects/digitalized-bangla-films-updating-on-imdb-and-tmdb',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Digitalized%20Bangla%20Films',
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
    title: 'Digitalized Bangla Films',
    description: 'A data project to add and update old Bangla films on IMDb and TMDB, preserving Bengali cinema history digitally.',
    images: ['/api/og/project?title=Digitalized%20Bangla%20Films'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
