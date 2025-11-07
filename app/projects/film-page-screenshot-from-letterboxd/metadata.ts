import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Film Page Screenshot from Letterboxd | Sayed',
  description: 'Automated tool to capture and save film page screenshots from Letterboxd for archival and sharing purposes',
  openGraph: {
    title: 'Film Page Screenshot from Letterboxd',
    description: 'Automated tool to capture and save film page screenshots from Letterboxd for archival and sharing purposes',
    url: 'https://sayed.app/projects/film-page-screenshot-from-letterboxd',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Film Page Screenshot from Letterboxd',
        width: 1200,
        height: 630,
        alt: 'Film Page Screenshot from Letterboxd | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Film Page Screenshot from Letterboxd',
    description: 'Automated screenshot tool for Letterboxd',
    images: ['/api/og/project?title=Film Page Screenshot from Letterboxd'],
  },
};
