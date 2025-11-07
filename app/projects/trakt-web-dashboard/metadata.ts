import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trakt Web Dashboard | Sayed',
  description: 'A comprehensive web dashboard for tracking movies and TV shows using Trakt API with rich analytics and visualizations',
  openGraph: {
    title: 'Trakt Web Dashboard',
    description: 'A comprehensive web dashboard for tracking movies and TV shows using Trakt API with rich analytics and visualizations',
    url: 'https://sayed.app/projects/trakt-web-dashboard',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Trakt Web Dashboard',
        width: 1200,
        height: 630,
        alt: 'Trakt Web Dashboard | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trakt Web Dashboard',
    description: 'Comprehensive dashboard for tracking movies and TV shows',
    images: ['/api/og/project?title=Trakt Web Dashboard'],
  },
};
