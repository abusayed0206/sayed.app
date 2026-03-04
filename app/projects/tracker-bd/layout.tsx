import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'tracker.bd | Sayed',
  description: "Bangladesh's all-in-one tracking platform. Track parcels from 7+ couriers, check gold/silver/USD prices, verify phone numbers, look up domains via RDAP/WHOIS/DNS, and track flights.",
  openGraph: {
    title: 'tracker.bd',
    description: "Bangladesh's all-in-one tracking platform. Track parcels from 7+ couriers, check gold/silver/USD prices, verify phone numbers, look up domains via RDAP/WHOIS/DNS, and track flights.",
    url: 'https://sayed.app/projects/tracker-bd',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=tracker.bd',
        width: 1200,
        height: 630,
        alt: 'tracker.bd | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'tracker.bd',
    description: "Bangladesh's all-in-one tracking platform. Track parcels from 7+ couriers, check gold/silver/USD prices, verify phone numbers, look up domains via RDAP/WHOIS/DNS, and track flights.",
    images: ['/api/og/project?title=tracker.bd'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
