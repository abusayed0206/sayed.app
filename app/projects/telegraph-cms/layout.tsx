import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Telegraph CMS | Sayed',
  description: "Use Telegram's Telegraph platform as a headless CMS and blogging tool for your website. Currently hosting 500k+ posts.",
  openGraph: {
    title: 'Telegraph CMS',
    description: "Use Telegram's Telegraph platform as a headless CMS and blogging tool for your website. Currently hosting 500k+ posts.",
    url: 'https://sayed.app/projects/telegraph-cms',
    siteName: 'Sayed',
    images: [
      {
        url: '/api/og/project?title=Telegraph%20CMS',
        width: 1200,
        height: 630,
        alt: 'Telegraph CMS | Sayed',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telegraph CMS',
    description: "Use Telegram's Telegraph platform as a headless CMS and blogging tool for your website. Currently hosting 500k+ posts.",
    images: ['/api/og/project?title=Telegraph%20CMS'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
