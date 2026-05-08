import Kyselina_hyaluronova_update_form from "@/app/_components/products/kyselina-hyaluronova/Kyselina_hyaluronova_update_form";
import { getCurrentUser } from "@/app/_lib/actions_all/auth_actions";
import getServiceBySlug from "@/app/_lib/data_services_all/data_services";

export default async function Page() {
  const [
    user,
    kyselinaHyaluronovaData,
    kyselinaHyaluronovaLipsData,
    kyselinaHyaluronovaFaceData,
  ] = await Promise.all([
    getCurrentUser(),
    getServiceBySlug("kyselina-hyaluronova"),
    getServiceBySlug("kyselina-hyaluronova-lips"),
    getServiceBySlug("kyselina-hyaluronova-face"),
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
            Na úpravu sekcie Kyselina hyalurónová sa musíš prihlásiť ako
            administrátor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Kyselina_hyaluronova_update_form
      kyselinaHyaluronovaData={kyselinaHyaluronovaData}
      kyselinaHyaluronovaLipsData={kyselinaHyaluronovaLipsData}
      kyselinaHyaluronovaFaceData={kyselinaHyaluronovaFaceData}
      isAdmin={isAdmin}
    />
  );
}
