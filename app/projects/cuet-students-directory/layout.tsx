import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CUET Student Directory | Sayed',
  description: 'Search student information by ID, name, department, or batch from Chittagong University of Engineering and Technology.',
  openGraph: {
    title: 'CUET Student Directory',
    description: 'Search student information by ID, name, department, or batch from Chittagong University of Engineering and Technology.',
    url: 'https://sayed.app/projects/cuet-students-directory',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=CUET%20Student%20Directory',
        width: 1200,
        height: 630,
        alt: 'CUET Student Directory | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CUET Student Directory',
    description: 'Search student information by ID, name, department, or batch from Chittagong University of Engineering and Technology.',
    images: ['/api/og/project?title=CUET%20Student%20Directory'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
