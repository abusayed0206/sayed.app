import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feed',
  alternates: { canonical: '/feed' },
  description: 'Updates from @sayed.app, the automated project account on Bluesky.',
  openGraph: {
    title: 'Feed',
    description: 'Updates from @sayed.app, the automated project account on Bluesky.',
    url: 'https://sayed.app/feed',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Feed (@sayed.app)',
        width: 1200,
        height: 630,
        alt: 'Feed',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feed',
    description: 'Updates from @sayed.app, the automated project account on Bluesky.',
    images: ['/api/og/project?title=Feed (@sayed.app)'],
  },
};
