import type { MetadataRoute } from "next";
import {
  getTknCategories,
  getTknProductsByCategoryId,
} from "./_lib/data_services_all/data_tkn";
import { absoluteUrl, publicSeoPages } from "./_lib/seo";

// Tento sitemap handler povie Next.js, ake URL ma vygenerovat do XML sitemapy.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Staticke verejne stranky berieme z centralneho SEO zoznamu,
  // aby sa nemuseli cesty vypisovat aj tu rucne.
  const staticRoutes = publicSeoPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: page.path === "/" ? 1 : 0.8,
  }));

  const categories = await getTknCategories();

  // Do sitemapy davame len aktivne TKN kategorie, aby sa neindexovali skryte sekcie.
  const activeCategories = categories.filter((category) => category.is_active);
  const categoryRoutes = activeCategories.map((category) => ({
    url: absoluteUrl(`/kozmetika/microneedling/tkn/${category.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Pre kazdu aktivnu kategoriu nacitame jej produkty a do sitemapy vlozime
  // len aktivne detailne stranky produktov.
  const productGroups = await Promise.all(
    activeCategories.map(async (category) => {
      const products = await getTknProductsByCategoryId(category.id);

      return products
        .filter((product) => product.is_active)
        .map((product) => ({
          url: absoluteUrl(
            `/kozmetika/microneedling/tkn/${category.slug}/${product.slug}`,
          ),
          lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.5,
        }));
    }),
  );

  return [...staticRoutes, ...categoryRoutes, ...productGroups.flat()];
}
