import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laws of Bangladesh | Sayed',
  description: 'Browse all Bangladeshi laws organized by volume, year, or chronological list. Covers legislation from 1799 to present with a user-friendly interface.',
  openGraph: {
    title: 'Laws of Bangladesh',
    description: 'Browse all Bangladeshi laws organized by volume, year, or chronological list. Covers legislation from 1799 to present with a user-friendly interface.',
    url: 'https://sayed.app/projects/laws-of-bangladesh',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Laws%20of%20Bangladesh',
        width: 1200,
        height: 630,
        alt: 'Laws of Bangladesh | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laws of Bangladesh',
    description: 'Browse all Bangladeshi laws organized by volume, year, or chronological list. Covers legislation from 1799 to present with a user-friendly interface.',
    images: ['/api/og/project?title=Laws%20of%20Bangladesh'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
