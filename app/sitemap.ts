import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  publicSeoPages,
} from "./_lib/seo";
import {
  getTknCategories,
  getTknProductsByCategory,
} from "./_lib/data_services_all/data_tkn";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticRoutes = publicSeoPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: page.path === "/" ? 1 : 0.8,
  }));

  const categories = await getTknCategories();
  const activeCategories = categories.filter((category) => category.is_active);
  const categoryRoutes = activeCategories.map((category) => ({
    url: absoluteUrl(`/cosmetics/microneedling/tkn/${category.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const productGroups = await Promise.all(
    activeCategories.map(async (category) => {
      const products = await getTknProductsByCategory(category.slug);

      return products
        .filter((product) => product.is_active)
        .map((product) => ({
          url: absoluteUrl(
            `/cosmetics/microneedling/tkn/${category.slug}/${product.slug}`,
          ),
          lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.5,
        }));
    }),
  );

  return [...staticRoutes, ...categoryRoutes, ...productGroups.flat()];
}
