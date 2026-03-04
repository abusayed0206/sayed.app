import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watch Dashboard | Sayed',
  description: 'A personal Trakt.tv dashboard showing recently watched movies and shows, watchlist, comments, custom lists, and library search — 800+ movies and 130+ shows tracked.',
  openGraph: {
    title: 'Watch Dashboard',
    description: 'A personal Trakt.tv dashboard showing recently watched movies and shows, watchlist, comments, custom lists, and library search — 800+ movies and 130+ shows tracked.',
    url: 'https://sayed.app/projects/trakt-web-dashboard',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Watch%20Dashboard',
        width: 1200,
        height: 630,
        alt: 'Watch Dashboard | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Watch Dashboard',
    description: 'A personal Trakt.tv dashboard showing recently watched movies and shows, watchlist, comments, custom lists, and library search — 800+ movies and 130+ shows tracked.',
    images: ['/api/og/project?title=Watch%20Dashboard'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
