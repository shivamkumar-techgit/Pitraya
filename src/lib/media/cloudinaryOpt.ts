/**
 * Generates an automatically optimized Cloudinary URL for web rendering.
 * Applies `f_auto` (automatic format selection WebP/AVIF) and `q_auto` (automatic quality compression).
 */
export interface CloudinaryOptOptions {
  width?: number;
  height?: number;
  crop?: "limit" | "fill" | "fit" | "thumb";
  quality?: "auto" | "auto:good" | "auto:best" | number;
}

export function getCloudinaryOptimizedUrl(
  publicIdOrUrl: string,
  options: CloudinaryOptOptions = {}
): string {
  if (!publicIdOrUrl) return "";

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || "muskr8qq";

  // Handle full Cloudinary URL
  if (publicIdOrUrl.startsWith("http://") || publicIdOrUrl.startsWith("https://")) {
    if (publicIdOrUrl.includes("res.cloudinary.com") && !publicIdOrUrl.includes("/f_auto,q_auto")) {
      return publicIdOrUrl.replace("/upload/", "/upload/f_auto,q_auto/");
    }
    return publicIdOrUrl;
  }

  // Handle public_id path
  const widthParam = options.width ? `,w_${options.width}` : "";
  const heightParam = options.height ? `,h_${options.height}` : "";
  const cropParam = options.crop ? `,c_${options.crop}` : ",c_limit";
  const qualityParam = options.quality ? `,q_${options.quality}` : ",q_auto";

  const transformations = `f_auto${qualityParam}${cropParam}${widthParam}${heightParam}`;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicIdOrUrl.replace(/^\//, "")}`;
}
