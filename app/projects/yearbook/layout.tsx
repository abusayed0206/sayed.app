import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YearBook of Sayed | Sayed',
  description: "A personal yearbook containing classmates' names and IDs from primary school, high school, college, and university (CUET).",
  openGraph: {
    title: 'YearBook of Sayed',
    description: "A personal yearbook containing classmates' names and IDs from primary school, high school, college, and university (CUET).",
    url: 'https://sayed.app/projects/yearbook',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=YearBook%20of%20Sayed',
        width: 1200,
        height: 630,
        alt: 'YearBook of Sayed | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YearBook of Sayed',
    description: "A personal yearbook containing classmates' names and IDs from primary school, high school, college, and university (CUET).",
    images: ['/api/og/project?title=YearBook%20of%20Sayed'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
