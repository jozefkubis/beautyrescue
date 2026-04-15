import { brandFont } from "@/app/_components/fonts";
import { dataDashboard } from "@/app/_lib/data_services/data_dashboard";
import { getTknProductImage } from "@/app/_lib/data_services/tkn_image_map";
import {
  getTknCategoriesBySlug,
  getTknProductsByCategory,
  type TknProductRow,
} from "@/app/_lib/data_services_all/data_tkn";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
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

// Detail kategórie načíta jednu DB sekciu a zobrazí jej produkty.
export default async function Page({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const [category, products] = await Promise.all([
    getTknCategoriesBySlug(categorySlug),
    getTknProductsByCategory(categorySlug),
  ]);

  if (!category) {
    notFound();
  }

  const categoryText = category.text?.trim() ?? "";

  return (
    <div className="w-full px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <section className="section-shell fade-up p-5 lg:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-goldDark/70">
          {dataDashboard.tknCategory.pageBadge}
        </p>
        <h1
          className={`premium-title mt-2 text-2xl font-semibold italic lg:text-5xl ${brandFont.className}`}
        >
          {category.title}
        </h1>
        {categoryText ? (
          <p className="mt-4 max-w-4xl whitespace-pre-wrap text-sm leading-6 text-greyMain/80 lg:text-base">
            {categoryText}
          </p>
        ) : null}
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 lg:gap-6">
        {products.map((product) => {
          const imageSrc =
            product.image_url || getTknProductImage(product.slug);
          const productName = product.name ?? "TKN produkt";
          const productSummary = product.summary ?? product.description ?? "";
          const indications = getIndications(product);

          return (
            <article
              key={product.id}
              className="section-shell fade-up overflow-hidden p-5 lg:p-8"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6 lg:gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-greyMain lg:text-2xl">
                    {productName}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-greyMain/80 lg:text-base">
                    {productSummary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {indications.map((indication) => (
                      <span
                        key={indication}
                        className="rounded-full border border-goldDark/25 bg-white/70 px-3 py-1 text-xs text-goldDark"
                      >
                        {indication}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/cosmetics/microneedling/tkn/${category.slug}/${product.slug}`}
                    className="mt-6 inline-flex items-center rounded-full border border-goldDark/30 bg-white px-4 py-2 text-sm font-semibold text-redDark transition-colors duration-300 hover:bg-[#fff4ea]"
                  >
                    {dataDashboard.tknCategory.openProductCta}
                  </Link>
                </div>

                {imageSrc ? (
                  <div className="flex justify-center md:justify-end">
                    <div className="relative isolate">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-4 rounded-full bg-linear-to-br from-goldLight/50 via-goldLight/20 to-goldDark/35 blur-2xl"
                      />
                      <div className="relative aspect-square w-36 overflow-hidden rounded-full border-4 border-goldDark/40 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:w-40 lg:w-44">
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
                      <div className="relative flex aspect-square w-36 items-center justify-center rounded-full border-2 border-dashed border-goldDark/35 bg-slate-100/70 p-5 text-center sm:w-40 lg:w-44">
                        <span className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                          {dataDashboard.tknCategory.imagePlaceholder}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
