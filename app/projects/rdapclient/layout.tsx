import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RDAP Lookup | Sayed',
  description: 'Comprehensive RDAP lookups for domains, IP addresses, and ASNs using data directly from IANA RDAP registry servers.',
  openGraph: {
    title: 'RDAP Lookup',
    description: 'Comprehensive RDAP lookups for domains, IP addresses, and ASNs using data directly from IANA RDAP registry servers.',
    url: 'https://sayed.app/projects/rdapclient',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=RDAP%20Lookup',
        width: 1200,
        height: 630,
        alt: 'RDAP Lookup | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RDAP Lookup',
    description: 'Comprehensive RDAP lookups for domains, IP addresses, and ASNs using data directly from IANA RDAP registry servers.',
    images: ['/api/og/project?title=RDAP%20Lookup'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
