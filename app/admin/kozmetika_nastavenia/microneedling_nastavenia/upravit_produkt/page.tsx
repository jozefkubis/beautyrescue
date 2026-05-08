import { getCurrentUser } from "@/app/_lib/actions_all/auth_actions";
// import { getTknCategories } from "@/app/_lib/data_services_all/data_tkn";
import Update_product_form from "@/app/_components/products/microneedling/Update_product_form";
import { getProductBySlug } from "@/app/_lib/data_services_all/data_tkn";
import Link from "next/link";

type UpdateProductPageProps = {
  searchParams: Promise<{ category?: string; product?: string }>;
};

// Jednoducha admin stranka iba pre aktualizáciu existujúceho produktu v TKN kategorie.
export default async function Page({ searchParams }: UpdateProductPageProps) {
  const user = await getCurrentUser();

  const isAdmin =
    user?.email === process.env.ADMIN_EMAIL_1 ||
    user?.email === process.env.ADMIN_EMAIL_2;

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center px-4">
        <div className="section-shell w-full max-w-2xl p-8 text-center">
          <h1 className="mb-3 text-3xl font-semibold text-redDark">
            Prístup zamietnutý
          </h1>
          <p className="text-sm text-greyMain">
            Na aktualizáciu produktu sa musíš prihlásiť ako administrátor.
          </p>
        </div>
      </div>
    );
  }

  const params = await searchParams;
  const product = await getProductBySlug(params?.product || "");

  return (
    <section className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up mx-auto w-full max-w-4xl p-5 lg:p-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold italic text-goldDark lg:text-3xl">
            Aktualizovať produkt
          </h1>
          <Link
            href="/admin/kozmetika_nastavenia/microneedling_nastavenia"
            className="inline-flex h-10 items-center rounded-full border border-goldDark/30 bg-white px-4 text-xs font-semibold uppercase tracking-[0.12em] text-goldDark transition duration-200 hover:bg-[#fff6ee]"
          >
            Späť
          </Link>
        </div>

        <Update_product_form product={product} />
      </div>
    </section>
  );
}
