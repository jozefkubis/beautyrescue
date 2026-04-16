import Microneedling_update_form from "@/app/_components/products/microneedling/Microneedling_update_form";
import { getCurrentUser } from "@/app/_lib/actions/auth_actions";
import getMicroneedling from "@/app/_lib/data_services/data_microneedling";
import getServiceBySlug from "@/app/_lib/data_services_all/data_services";
import {
  getTknCategories,
  getTknProductsByCategory,
} from "@/app/_lib/data_services_all/data_tkn";

// Admin stránka pre Microneedling nastaví práva a pripraví TKN dáta pre formulár.
export default async function Page() {
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
            Na úpravu sekcie Microneedling sa musíš prihlásiť ako administrátor.
          </p>
        </div>
      </div>
    );
  }

  const [microneedlingData, categories, microneedling] = await Promise.all([
    getMicroneedling("microneedling"),
    getTknCategories(),
    getServiceBySlug("microneedling"),
  ]);

  const tknCategories = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      products: await getTknProductsByCategory(category.slug),
    })),
  );

  return (
    <Microneedling_update_form
      microneedlingData={microneedlingData}
      microneedling={microneedling}
      tknCategories={tknCategories}
      isAdmin={isAdmin}
    />
  );
}
