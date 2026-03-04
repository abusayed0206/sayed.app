import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bangla Quran Audio | Sayed',
  description: 'Listen to the complete Holy Quran with all 114 Surahs in a beautiful Bengali interface. Select any Surah and audio plays ayah by ayah.',
  openGraph: {
    title: 'Bangla Quran Audio',
    description: 'Listen to the complete Holy Quran with all 114 Surahs in a beautiful Bengali interface. Select any Surah and audio plays ayah by ayah.',
    url: 'https://sayed.app/projects/bangla-quran-audio',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Bangla%20Quran%20Audio',
        width: 1200,
        height: 630,
        alt: 'Bangla Quran Audio | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangla Quran Audio',
    description: 'Listen to the complete Holy Quran with all 114 Surahs in a beautiful Bengali interface. Select any Surah and audio plays ayah by ayah.',
    images: ['/api/og/project?title=Bangla%20Quran%20Audio'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
