import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bangla Quran Windows App | Sayed',
  description: 'Flutter-based Windows app for listening to the complete Quran in Bangla. 114 Surahs, auto-play, offline support, and no ads.',
  openGraph: {
    title: 'Bangla Quran Windows App',
    description: 'Flutter-based Windows app for listening to the complete Quran in Bangla. 114 Surahs, auto-play, offline support, and no ads.',
    url: 'https://sayed.app/projects/bangla-quran-windows-app',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Bangla%20Quran%20Windows%20App',
        width: 1200,
        height: 630,
        alt: 'Bangla Quran Windows App | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangla Quran Windows App',
    description: 'Flutter-based Windows app for listening to the complete Quran in Bangla. 114 Surahs, auto-play, offline support, and no ads.',
    images: ['/api/og/project?title=Bangla%20Quran%20Windows%20App'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
