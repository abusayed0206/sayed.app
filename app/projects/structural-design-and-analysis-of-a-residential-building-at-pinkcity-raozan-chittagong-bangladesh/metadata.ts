import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Structural Design and Analysis of a Residential Building | Sayed',
  description: 'Comprehensive structural design and analysis of a 10-storied residential building at Pinkcity, Raozan, Chittagong following BNBC 2020',
  openGraph: {
    title: 'Structural Design and Analysis of a Residential Building',
    description: 'Comprehensive structural design and analysis of a 10-storied residential building at Pinkcity, Raozan, Chittagong following BNBC 2020',
    url: 'https://sayed.app/projects/structural-design-and-analysis-of-a-residential-building-at-pinkcity-raozan-chittagong-bangladesh',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Structural Design and Analysis of a Residential Building',
        width: 1200,
        height: 630,
        alt: 'Structural Design and Analysis | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Structural Design and Analysis of a Residential Building',
    description: 'Comprehensive structural design and analysis following BNBC 2020',
    images: ['/api/og/project?title=Structural Design and Analysis of a Residential Building'],
  },
};
