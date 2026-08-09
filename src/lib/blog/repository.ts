import * as fs from "fs";
import * as path from "path";

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogSection {
  heading: string;
  body: string;
}

export type CtaType = "booking" | "early-booking" | "hotel-package" | "consult-pandit";

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  intentCategory: string;
  isPillar: boolean;
  pillarSlug: string | null;
  readTime: string;
  author: string;
  reviewedBy: string | null;
  publishDate: string;
  updatedDate: string;
  keywords: string[];
  tags: string[];
  featuredImage: string;
  summary: string;
  content: string;
  sections: BlogSection[];
  faqs: BlogFaq[];
  sources: string[];
  ctaType: CtaType;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function loadAllPostsFromDisk(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => {
      try {
        const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
        return JSON.parse(raw) as BlogPost;
      } catch {
        console.error(`[Blog Repository] Failed to parse: ${file}`);
        return null;
      }
    })
    .filter(Boolean) as BlogPost[];
}

// In production: cache once. In dev: always re-read so hot reload sees new files.
let _prodCache: BlogPost[] | null = null;

function getCache(): BlogPost[] {
  if (process.env.NODE_ENV === "production") {
    if (!_prodCache) _prodCache = loadAllPostsFromDisk();
    return _prodCache;
  }
  // Development: always fresh read so new JSON files appear instantly
  return loadAllPostsFromDisk();
}

/** Returns all articles sorted by publishDate descending */
export function getAllArticles(): BlogPost[] {
  return [...getCache()].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

/** Returns paginated articles */
export function getPaginatedArticles(
  page: number = 1,
  limit: number = 10
): { posts: BlogPost[]; total: number; totalPages: number } {
  const all = getAllArticles();
  const start = (page - 1) * limit;
  return {
    posts: all.slice(start, start + limit),
    total: all.length,
    totalPages: Math.ceil(all.length / limit),
  };
}

/** Returns a single article by slug */
export function getArticleBySlug(slug: string): BlogPost | undefined {
  return getCache().find((p) => p.slug === slug);
}

/** Returns all articles in a given category */
export function getArticlesByCategory(category: string): BlogPost[] {
  if (category === "All") return getAllArticles();
  return getAllArticles().filter(
    (p) => p.intentCategory.toLowerCase() === category.toLowerCase()
  );
}

/** Returns the single pillar article */
export function getPillarArticle(): BlogPost | undefined {
  return getCache().find((p) => p.isPillar);
}

/** Returns all cluster articles for a pillar */
export function getClusterArticles(pillarSlug: string): BlogPost[] {
  return getAllArticles().filter((p) => p.pillarSlug === pillarSlug);
}

/** Returns all unique intent categories */
export function getAllCategories(): string[] {
  const cats = new Set(getCache().map((p) => p.intentCategory));
  return ["All", ...Array.from(cats).sort()];
}

/** Returns all slugs (for sitemap generation) */
export function getAllSlugs(): string[] {
  return getCache().map((p) => p.slug);
}
