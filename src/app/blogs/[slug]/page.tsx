import { notFound, redirect } from "next/navigation";
import { getArticleBySlug } from "@/lib/blog/repository";

export interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogSlugRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Permanently redirect /blogs/[slug] to canonical /blog/[slug]
  redirect(`/blog/${slug}`);
}
