import PromotionUpdateForm from "@/app/_components/admin/PromotionUpdateForm";
import { getCurrentUser } from "@/app/_lib/actions_all/auth_actions";
import getServiceBySlug from "@/app/_lib/data_services_all/data_services";

export default async function Page() {
  const [user, promotion] = await Promise.all([
    getCurrentUser(),
    getServiceBySlug("novinky"),
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
            Na úpravu sekcie Novinky sa musíš prihlásiť ako administrátor.
          </p>
        </div>
      </div>
    );
  }

  return <PromotionUpdateForm promotion={promotion} isAdmin={isAdmin} />;
}
