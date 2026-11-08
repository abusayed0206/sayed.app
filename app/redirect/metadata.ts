import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fediverse profile redirect',
  // Utility pages (redirector, generator, per-profile redirects): keep them out of search results
  robots: { index: false, follow: true },
  description: 'Share a Fediverse profile once; everyone opens it on their own instance.',
  openGraph: {
    title: 'Fediverse profile redirect',
    description: 'Share a Fediverse profile once; everyone opens it on their own instance.',
    url: 'https://sayed.app/redirect',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Fediverse profile redirect',
        width: 1200,
        height: 630,
        alt: 'Fediverse profile redirect',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fediverse profile redirect',
    description: 'Share a Fediverse profile once; everyone opens it on their own instance.',
    images: ['/api/og/project?title=Fediverse profile redirect'],
  },
};
