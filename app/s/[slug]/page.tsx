import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SlugRedirectPage({ params }: PageProps) {
  const { slug } = await params;

  // Reconstruct the original shortened URL from link.sayed.app
  const originalShortUrl = `https://link.sayed.app/${slug}`;
  
  // Redirect to the original short URL which will then redirect to the final destination
  redirect(originalShortUrl);
}

export const runtime = "edge";
