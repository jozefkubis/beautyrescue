import Chemical_peeling_update_form from "@/app/_components/products/chemical-peeling/Chemical_peeling_update_form";
import { getCurrentUser } from "@/app/_lib/actions_all/auth_actions";
import getServiceBySlug from "@/app/_lib/data_services_all/data_services";

export default async function Page() {
  const [user, chemicalPeelingData] = await Promise.all([
    getCurrentUser(),
    getServiceBySlug("chemical-peeling"),
  ]);

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
            Na úpravu sekcie Chemický peeling sa musíš prihlásiť ako
            administrátor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Chemical_peeling_update_form
      chemicalPeelingData={chemicalPeelingData}
      isAdmin={isAdmin}
    />
  );
}
