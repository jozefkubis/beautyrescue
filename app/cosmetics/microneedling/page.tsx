import Microneedling from "@/app/_components/products/microneedling/Microneedling";
import { getCurrentUser } from "@/app/_lib/actions/auth_actions";
import getServiceBySlug from "@/app/_lib/data_services_all/data_services";
import {
  getTknCategories,
  getTknProductsByCategory,
} from "@/app/_lib/data_services_all/data_tkn";

// Hlavná Microneedling stránka načíta len to, čo naozaj potrebuje.
export default async function Page() {
  const [user, microneedling] = await Promise.all([
    getCurrentUser(),
    getServiceBySlug("microneedling"),
  ]);

  const isAdmin =
    user?.email === process.env.ADMIN_EMAIL_1 ||
    user?.email === process.env.ADMIN_EMAIL_2;
  const isActive = microneedling?.is_active ?? false;

  if (!isActive) {
    return (
      <div className="flex h-screen items-center justify-center px-4">
        <div className="section-shell fade-up w-full max-w-2xl p-8 text-center md:p-10">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-goldDark uppercase">
            Signature Collection
          </p>
          <h1 className="premium-title mb-4 text-3xl leading-tight font-semibold md:text-4xl">
            Luxus potrebuje svoj moment.
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-greyMain md:text-base">
            Táto procedúra je dočasne pozastavená, aby sme zachovali náš
            prémiový štandard výsledkov. Pre osobné odporúčanie alternatívy nás
            kontaktujte a pripravíme pre vás individuálny plán.
          </p>
        </div>
      </div>
    );
  }

  const categories = await getTknCategories();

  // Do komponentu posielame strom kategorii aj produktov uz poskladany,
  // aby mal render jednoduchy vstup bez dalsich DB volani.
  const tknCategories = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      products: await getTknProductsByCategory(category.slug),
    })),
  );

  return (
    <Microneedling
      microneedling={microneedling}
      tknCategories={tknCategories}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  );
}
