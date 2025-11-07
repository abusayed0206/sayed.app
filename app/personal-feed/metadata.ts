import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Feed | Sayed',
  description: 'Updates from @sayed.page - Personal social media feed on Bluesky',
  openGraph: {
    title: 'Personal Feed | Sayed',
    description: 'Updates from @sayed.page - Personal social media feed on Bluesky',
    url: 'https://sayed.app/personal-feed',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Personal Feed (@sayed.page)',
        width: 1200,
        height: 630,
        alt: 'Personal Feed | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Feed | Sayed',
    description: 'Updates from @sayed.page - Personal social media feed on Bluesky',
    images: ['/api/og/project?title=Personal Feed (@sayed.page)'],
  },
};
