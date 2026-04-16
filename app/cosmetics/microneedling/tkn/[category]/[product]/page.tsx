import { brandFont } from "@/app/_components/fonts";
import { dataDashboard } from "@/app/_lib/data_services_all/data_dashboard";
import {
  getProductBySlug,
  getTknCategoriesBySlug,
  type TknProductRow,
} from "@/app/_lib/data_services_all/data_tkn";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ category: string; product: string }>;
};

function getIndications(product: TknProductRow) {
  const content = product.content;

  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return [] as string[];
  }

  const maybeIndications = (content as { indications?: unknown }).indications;

  if (!Array.isArray(maybeIndications)) {
    return [] as string[];
  }

  return maybeIndications
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

// Detail produktu načíta priamo jednu DB položku a jej materskú kategóriu.
export default async function Page({ params }: ProductPageProps) {
  const { category, product } = await params;

  // Produkt aj kategoriu nacitame paralelne, potom overime, ci spolu naozaj patria.
  const [categoryData, productData] = await Promise.all([
    getTknCategoriesBySlug(category),
    getProductBySlug(product),
  ]);

  if (
    !categoryData ||
    !productData ||
    !categoryData.is_active ||
    !productData.is_active ||
    productData.category_id !== categoryData.id
  ) {
    notFound();
  }

  // Fallback mapu uz nepouzivame, ideme iba cez image_url ulozene v DB.
  const imageSrc = productData.image_url;
  const productName = productData.name ?? "TKN produkt";
  const productSummary = productData.summary ?? "";
  const productDetails = productData.description ?? "";
  const indications = getIndications(productData);

  return (
    <div className="w-full px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <section className="section-shell fade-up p-5 lg:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-goldDark/70">
          {dataDashboard.tknProduct.pageBadge}
        </p>
        <h1
          className={`premium-title mt-2 text-2xl font-semibold italic lg:text-5xl ${brandFont.className}`}
        >
          {productName}
        </h1>
        <div className="mt-3 text-sm text-greyMain/80">
          <Link
            href={`/cosmetics/microneedling/tkn/${categoryData.slug}`}
            className="font-medium text-redDark"
          >
            {categoryData.title}
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6 lg:gap-8">
          <div>
            <h2 className="text-lg font-semibold text-greyMain lg:text-xl">
              {dataDashboard.tknProduct.treatmentHeading}
            </h2>
            <p className="mt-3 text-sm leading-6 text-greyMain/80 lg:text-base">
              {productSummary}
            </p>
            <p className="mt-3 text-sm leading-6 text-greyMain/80 lg:text-base whitespace-pre-wrap">
              {productDetails}
            </p>

            <h3 className="mt-6 text-base font-semibold text-greyMain lg:text-lg">
              {dataDashboard.tknProduct.indicationsHeading}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-greyMain/85 lg:text-base">
              {indications.map((indication) => (
                <li key={indication} className="flex items-start gap-2">
                  <span
                    className="mt-1 h-2 w-2 rounded-full bg-goldDark/80"
                    aria-hidden="true"
                  />
                  <span>{indication}</span>
                </li>
              ))}
            </ul>
          </div>

          {imageSrc ? (
            <div className="flex justify-center md:justify-end">
              <div className="relative isolate">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 rounded-full bg-linear-to-br from-goldLight/50 via-goldLight/20 to-goldDark/35 blur-2xl"
                />
                <div className="relative aspect-square w-76 overflow-hidden rounded-full border-4 border-goldDark/40 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:w-84 lg:w-[24rem]">
                  <Image
                    src={imageSrc}
                    alt={productName}
                    fill
                    className="object-contain p-3"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center md:justify-end">
              <div className="relative isolate">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 rounded-full bg-linear-to-br from-goldLight/35 via-goldLight/10 to-goldDark/25 blur-2xl"
                />
                <div className="relative flex aspect-square w-76 items-center justify-center rounded-full border-2 border-dashed border-goldDark/35 bg-slate-100/70 p-5 text-center sm:w-84 lg:w-[24rem]">
                  <span className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {dataDashboard.tknProduct.imagePlaceholder}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
