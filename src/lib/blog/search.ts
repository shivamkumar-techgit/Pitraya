import type { BlogPost } from "./repository";

/**
 * Multi-field search across title, summary, keywords, and tags.
 * Returns articles sorted by relevance score (descending).
 */
export function searchArticles(posts: BlogPost[], query: string): BlogPost[] {
  if (!query.trim()) return posts;
  const q = query.toLowerCase().trim();

  const scored = posts.map((post) => {
    let score = 0;
    if (post.title.toLowerCase().includes(q)) score += 5;
    if (post.summary.toLowerCase().includes(q)) score += 3;
    if (post.keywords.some((k) => k.toLowerCase().includes(q))) score += 4;
    if (post.tags.some((t) => t.toLowerCase().includes(q))) score += 3;
    if (post.content.toLowerCase().includes(q)) score += 1;
    if (post.metaDescription.toLowerCase().includes(q)) score += 2;
    return { post, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => post);
}
