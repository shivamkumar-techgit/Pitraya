import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { getSiteUrl } from "@/lib/config/site";
import { getAllArticles } from "@/lib/blog/repository";
import { CITIES } from "@/data/cities";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/portal",
    "/about",
    "/faq",
    "/contact",
    "/hotels",
    "/destinations",
    "/terms",
    "/privacy-policy",
    "/refund-policy",
    "/cancellation-policy",
    "/gallery",
    "/planner",
    "/packages",
    "/blog",
    "/glossary",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // City location routes
  const locationRoutes: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${baseUrl}/pind-daan-from/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Service routes
  const serviceRoutes: MetadataRoute.Sitemap = [
    "pind-daan",
    "shradh",
    "brahmin-booking",
    "asthi-visarjan",
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
    const packages = await prisma.package.findMany({
      select: { id: true, createdAt: true },
    });
    packageRoutes = packages.map((pkg) => ({
      url: `${baseUrl}/packages/${pkg.id}`,
      lastModified: pkg.createdAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));
  } catch (err) {
    console.warn(
      "⚠️ Sitemap warning: Could not fetch packages from database:",
      err
    );
  }

  return [
    ...staticRoutes,
    ...locationRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...packageRoutes,
  ];
}
