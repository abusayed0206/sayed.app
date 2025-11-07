import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feed | Sayed',
  description: 'Updates from @sayed.app - Automated bot account feed on Bluesky',
  openGraph: {
    title: 'Feed | Sayed',
    description: 'Updates from @sayed.app - Automated bot account feed on Bluesky',
    url: 'https://sayed.app/feed',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Feed (@sayed.app)',
        width: 1200,
        height: 630,
        alt: 'Feed | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feed | Sayed',
    description: 'Updates from @sayed.app - Automated bot account feed on Bluesky',
    images: ['/api/og/project?title=Feed (@sayed.app)'],
  },
};
