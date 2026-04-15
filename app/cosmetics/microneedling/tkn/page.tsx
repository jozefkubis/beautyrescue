import { brandFont } from "@/app/_components/fonts";
import { dataDashboard } from "@/app/_lib/data_services/data_dashboard";
import {
  getTknCategories,
  getTknProductsByCategory,
} from "@/app/_lib/data_services_all/data_tkn";
import Link from "next/link";

// Landing page TKN katalógu si vytiahne všetky aktívne kategórie priamo z DB.
export default async function Page() {
  const categories = await getTknCategories();

  const visibleTknCategories = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      products: await getTknProductsByCategory(category.slug),
    })),
  );

  return (
    <div className="w-full px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <section className="section-shell fade-up p-5 lg:p-8">
        <h1
          className={`premium-title text-2xl font-semibold italic lg:text-5xl ${brandFont.className}`}
        >
          {dataDashboard.tknLanding.title}
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-greyMain/80 lg:text-base">
          {dataDashboard.tknLanding.description}
        </p>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {visibleTknCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/cosmetics/microneedling/tkn/${category.slug}`}
            className="group section-shell fade-up block p-5 transition-transform duration-300 hover:-translate-y-0.5 lg:p-8"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-goldDark/70">
              {dataDashboard.tknLanding.categoryBadge}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-greyMain lg:text-2xl">
              {category.title}
            </h2>
            <p className="mt-3 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-greyMain/80 lg:text-base">
              {category.text}
            </p>
            <span className="mt-5 inline-flex rounded-full border border-goldDark/25 px-3 py-1 text-sm text-goldDark">
              {category.products.length}{" "}
              {dataDashboard.tknLanding.productsSuffix}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
