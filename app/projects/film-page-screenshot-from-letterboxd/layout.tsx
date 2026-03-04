import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Letterboxd Film Poster | Sayed',
  description: 'Auto-generated poster-style screenshot of the last 50 watched films from Letterboxd RSS feed. Updated daily at 1920x1080.',
  openGraph: {
    title: 'Letterboxd Film Poster',
    description: 'Auto-generated poster-style screenshot of the last 50 watched films from Letterboxd RSS feed. Updated daily at 1920x1080.',
    url: 'https://sayed.app/projects/film-page-screenshot-from-letterboxd',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Letterboxd%20Film%20Poster',
        width: 1200,
        height: 630,
        alt: 'Letterboxd Film Poster | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Letterboxd Film Poster',
    description: 'Auto-generated poster-style screenshot of the last 50 watched films from Letterboxd RSS feed. Updated daily at 1920x1080.',
    images: ['/api/og/project?title=Letterboxd%20Film%20Poster'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
