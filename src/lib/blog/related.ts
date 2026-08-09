import type { BlogPost } from "./repository";

/**
 * Returns up to `limit` related articles for a given post,
 * scored by shared tags, shared category, and pillar cluster membership.
 */
export function getRelatedArticles(
  post: BlogPost,
  allPosts: BlogPost[],
  limit: number = 4
): BlogPost[] {
  const others = allPosts.filter((p) => p.slug !== post.slug);

  const scored = others.map((candidate) => {
    let score = 0;

    // Same pillar cluster
    if (candidate.pillarSlug === post.pillarSlug && post.pillarSlug !== null)
      score += 5;

    // Same intent category
    if (candidate.intentCategory === post.intentCategory) score += 3;

    // Shared tags
    const sharedTags = candidate.tags.filter((t) => post.tags.includes(t));
    score += sharedTags.length * 2;

    // Shared keywords
    const sharedKeywords = candidate.keywords.filter((k) =>
      post.keywords.some((pk) => pk.toLowerCase().includes(k.toLowerCase()))
    );
    score += sharedKeywords.length;

    return { candidate, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
