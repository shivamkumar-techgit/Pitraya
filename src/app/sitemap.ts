import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { getSiteUrl } from "@/lib/config/site";
import { getAllArticles } from "@/lib/blog/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Service routes
  const serviceRoutes: MetadataRoute.Sitemap = [
    "pind-daan",
    "shradh",
    "brahmin-booking",
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Blog routes — dynamically loaded from content/blog/ file repository
  const allBlogPosts = getAllArticles();
  const blogRoutes: MetadataRoute.Sitemap = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate),
    changeFrequency: "weekly",
    priority: post.isPillar ? 1.0 : 0.8,
  }));

  // Dynamic Database Package routes
  let packageRoutes: MetadataRoute.Sitemap = [];
  try {
    const packages = await prisma.package.findMany({ select: { id: true, createdAt: true } });
    packageRoutes = packages.map((pkg) => ({
      url: `${baseUrl}/packages/${pkg.id}`,
      lastModified: pkg.createdAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));
  } catch (err) {
    console.warn("⚠️ Sitemap warning: Could not fetch packages from database:", err);
  }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...packageRoutes];
}
