import { brandFont } from "@/app/_components/fonts";
import { dataDashboard } from "@/app/_lib/data_services/data_dashboard";
import getTknVisibility from "@/app/_lib/data_services/data_tkn_visibility";
import {
  applyTknVisibility,
  tknCategories,
} from "@/app/_lib/data_services/tkn_catalog";
import { getTknProductImage } from "@/app/_lib/data_services/tkn_image_map";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{ category: string; product: string }>;
};

export function generateStaticParams() {
  return tknCategories.flatMap((category) =>
    category.products.map((product) => ({
      category: category.slug,
      product: product.slug,
    })),
  );
}

export default async function Page({ params }: ProductPageProps) {
  const { category, product } = await params;
  const tknVisibility = await getTknVisibility();
  const visibleTknCategories = applyTknVisibility(tknCategories, tknVisibility);
  const visibleCategory = visibleTknCategories.find(
    (item) => item.slug === category,
  );
  const visibleProduct = visibleCategory?.products.find(
    (item) => item.slug === product,
  );
  const detail =
    visibleCategory && visibleProduct
      ? { category: visibleCategory, product: visibleProduct }
      : null;
  const imageSrc = getTknProductImage(product);

  if (!detail) {
    notFound();
  }

  return (
    <div className="w-full px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <section className="section-shell fade-up p-5 lg:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-goldDark/70">
          {dataDashboard.tknProduct.pageBadge}
        </p>
        <h1
          className={`premium-title mt-2 text-2xl font-semibold italic lg:text-5xl ${brandFont.className}`}
        >
          {detail.product.name}
        </h1>
        <div className="mt-3 text-sm text-greyMain/80">
          <Link
            href={`/cosmetics/microneedling/tkn/${detail.category.slug}`}
            className="font-medium text-redDark"
          >
            {detail.category.name}
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6 lg:gap-8">
          <div>
            <h2 className="text-lg font-semibold text-greyMain lg:text-xl">
              {dataDashboard.tknProduct.treatmentHeading}
            </h2>
            <p className="mt-3 text-sm leading-6 text-greyMain/80 lg:text-base">
              {detail.product.summary}
            </p>
            <p className="mt-3 text-sm leading-6 text-greyMain/80 lg:text-base">
              {detail.product.details}
            </p>

            <h3 className="mt-6 text-base font-semibold text-greyMain lg:text-lg">
              {dataDashboard.tknProduct.indicationsHeading}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-greyMain/85 lg:text-base">
              {detail.product.indications.map((indication) => (
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
                    alt={detail.product.name}
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
