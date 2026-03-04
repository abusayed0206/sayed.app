import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDPO Helper | Sayed',
  description: "Exercise your rights under Bangladesh's Personal Data Protection Ordinance, 2025. Generate legally compliant emails for data access, correction, deletion, and portability requests.",
  openGraph: {
    title: 'PDPO Helper',
    description: "Exercise your rights under Bangladesh's Personal Data Protection Ordinance, 2025. Generate legally compliant emails for data access, correction, deletion, and portability requests.",
    url: 'https://sayed.app/projects/pdpo',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=PDPO%20Helper',
        width: 1200,
        height: 630,
        alt: 'PDPO Helper | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDPO Helper',
    description: "Exercise your rights under Bangladesh's Personal Data Protection Ordinance, 2025. Generate legally compliant emails for data access, correction, deletion, and portability requests.",
    images: ['/api/og/project?title=PDPO%20Helper'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
