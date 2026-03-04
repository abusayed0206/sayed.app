import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bangla Movies & Series | Sayed',
  description: 'Browse the latest Bangla movies and TV series powered by TMDB API. Search, discover, and explore Bengali cinema and television.',
  openGraph: {
    title: 'Bangla Movies & Series',
    description: 'Browse the latest Bangla movies and TV series powered by TMDB API. Search, discover, and explore Bengali cinema and television.',
    url: 'https://sayed.app/projects/bangla-movies-series-tmdb-wrapper',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Bangla%20Movies%20%26%20Series',
        width: 1200,
        height: 630,
        alt: 'Bangla Movies & Series | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangla Movies & Series',
    description: 'Browse the latest Bangla movies and TV series powered by TMDB API. Search, discover, and explore Bengali cinema and television.',
    images: ['/api/og/project?title=Bangla%20Movies%20%26%20Series'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
