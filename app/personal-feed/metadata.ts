import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal feed',
  alternates: { canonical: '/personal-feed' },
  description: 'Posts from @sayed.page, my personal Bluesky account.',
  openGraph: {
    title: 'Personal feed',
    description: 'Posts from @sayed.page, my personal Bluesky account.',
    url: 'https://sayed.app/personal-feed',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Personal Feed (@sayed.page)',
        width: 1200,
        height: 630,
        alt: 'Personal feed',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal feed',
    description: 'Posts from @sayed.page, my personal Bluesky account.',
    images: ['/api/og/project?title=Personal Feed (@sayed.page)'],
  },
};
