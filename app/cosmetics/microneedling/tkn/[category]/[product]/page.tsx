import { brandFont } from "@/app/_components/fonts"
import {
  getTknProduct,
  tknCategories,
} from "@/app/_lib/data_services/tkn_catalog"
import { getTknProductImage } from "@/app/_lib/data_services/tkn_image_map"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

type ProductPageProps = {
  params: Promise<{ category: string; product: string }>
}

export function generateStaticParams() {
  return tknCategories.flatMap((category) =>
    category.products.map((product) => ({
      category: category.slug,
      product: product.slug,
    })),
  )
}

export default async function Page({ params }: ProductPageProps) {
  const { category, product } = await params
  const detail = getTknProduct(category, product)
  const imageSrc = getTknProductImage(product)

  if (!detail) {
    notFound()
  }

  return (
    <div className="w-full px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <section className="section-shell fade-up p-5 lg:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-goldDark/70">
          TKN Produkt
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

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
          <div>
            <h2 className="text-lg font-semibold text-greyMain lg:text-xl">
              Opis ošetrenia
            </h2>
            <p className="mt-3 text-sm leading-6 text-greyMain/80 lg:text-base">
              {detail.product.summary}
            </p>
            <p className="mt-3 text-sm leading-6 text-greyMain/80 lg:text-base">
              {detail.product.details}
            </p>

            <h3 className="mt-6 text-base font-semibold text-greyMain lg:text-lg">
              Indikácie
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
            <div className="relative min-h-64 overflow-hidden rounded-xl border border-goldDark/25">
              <Image
                src={imageSrc}
                alt={detail.product.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative flex min-h-64 items-center justify-center rounded-xl border border-dashed border-goldDark/35 bg-slate-100/70 p-5">
              <span className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Image placeholder
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
