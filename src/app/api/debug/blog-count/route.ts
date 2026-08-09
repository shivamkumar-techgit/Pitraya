import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/blog/repository";

/** Debug endpoint: GET /api/debug/blog-count */
export async function GET() {
  const articles = getAllArticles();
  return NextResponse.json({
    count: articles.length,
    slugs: articles.map((a) => a.slug),
    titles: articles.map((a) => a.title),
  });
}
