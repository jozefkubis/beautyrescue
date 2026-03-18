import { brandFont } from "@/app/_components/fonts"
import {
  getTknCategory,
  tknCategories,
} from "@/app/_lib/data_services/tkn_catalog"
import { getTknProductImage } from "@/app/_lib/data_services/tkn_image_map"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

type CategoryPageProps = {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return tknCategories.map((category) => ({ category: category.slug }))
}

export default async function Page({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params
  const category = getTknCategory(categorySlug)

  if (!category) {
    notFound()
  }

  return (
    <div className="w-full px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <section className="section-shell fade-up p-5 lg:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-goldDark/70">
          TKN Kategória
        </p>
        <h1
          className={`premium-title mt-2 text-2xl font-semibold italic lg:text-5xl ${brandFont.className}`}
        >
          {category.name}
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-greyMain/80 lg:text-base">
          {category.description}
        </p>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-greyMain/80 lg:text-base">
          {category.intro}
        </p>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 lg:gap-6">
        {category.products.map((product) => {
          const imageSrc = getTknProductImage(product.slug)

          return (
            <article
              key={product.slug}
              className="section-shell fade-up overflow-hidden p-5 lg:p-8"
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-greyMain lg:text-2xl">
                    {product.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-greyMain/80 lg:text-base">
                    {product.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.indications.map((indication) => (
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
                    Otvoriť detail produktu
                  </Link>
                </div>

                {imageSrc ? (
                  <div className="relative min-h-44 overflow-hidden rounded-xl border border-goldDark/25">
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative flex min-h-44 items-center justify-center rounded-xl border border-dashed border-goldDark/35 bg-slate-100/70 p-5">
                    <span className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Image placeholder
                    </span>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
