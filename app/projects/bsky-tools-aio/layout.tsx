import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bsky Tools AIO | Sayed',
  description: 'All-in-one Bluesky toolkit: Handle-to-DID converter, account age calculator, domain verification, post screenshot tool, and profile downloader.',
  openGraph: {
    title: 'Bsky Tools AIO',
    description: 'All-in-one Bluesky toolkit: Handle-to-DID converter, account age calculator, domain verification, post screenshot tool, and profile downloader.',
    url: 'https://sayed.app/projects/bsky-tools-aio',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Bsky%20Tools%20AIO',
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
    description: 'All-in-one Bluesky toolkit: Handle-to-DID converter, account age calculator, domain verification, post screenshot tool, and profile downloader.',
    images: ['/api/og/project?title=Bsky%20Tools%20AIO'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
