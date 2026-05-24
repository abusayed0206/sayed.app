import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kriti Bangla Fonts | Sayed',
  description:
    'WordPress plugin to add high-quality Bangla fonts with live preview, searchable catalog, and flexible delivery via Kriti CDN or locally hosted .woff2 files.',
  openGraph: {
    title: 'Kriti Bangla Fonts',
    description:
      'WordPress plugin to add high-quality Bangla fonts with live preview, searchable catalog, and flexible delivery via Kriti CDN or locally hosted .woff2 files.',
    url: 'https://sayed.app/projects/kriti-bangla-fonts',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Kriti%20Bangla%20Fonts',
        width: 1200,
        height: 630,
        alt: 'Kriti Bangla Fonts | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kriti Bangla Fonts',
    description:
      'WordPress plugin to add high-quality Bangla fonts with live preview, searchable catalog, and flexible delivery via Kriti CDN or locally hosted .woff2 files.',
    images: ['/api/og/project?title=Kriti%20Bangla%20Fonts'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
