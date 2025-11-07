import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bsky Tools AIO | Sayed',
  description: 'An all-in-one toolkit for Bluesky (ATProto) with various utilities for managing your social presence',
  openGraph: {
    title: 'Bsky Tools AIO',
    description: 'An all-in-one toolkit for Bluesky (ATProto) with various utilities for managing your social presence',
    url: 'https://sayed.app/projects/bsky-tools-aio',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Bsky Tools AIO',
        width: 1200,
        height: 630,
        alt: 'Bsky Tools AIO | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bsky Tools AIO',
    description: 'All-in-one toolkit for Bluesky (ATProto)',
    images: ['/api/og/project?title=Bsky Tools AIO'],
  },
};
