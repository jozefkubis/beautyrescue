import Jalupro_update_form from "@/app/_components/products/jalupro/Jalupro_update_form";
import { getCurrentUser } from "@/app/_lib/actions/auth_actions";
import {
  getJalupro,
  getJaluproClassic,
  getJaluproHMW,
  getJaluproSuperHydro,
  getJaluproYoungEye,
} from "@/app/_lib/data_services/data_jalupro";

export default async function Page() {
  const [
    user,
    jaluproData,
    jaluproClassicData,
    jaluproHMWData,
    jaluproSuperHydroData,
    jaluproYoungEyeData,
  ] = await Promise.all([
    getCurrentUser(),
    getJalupro("jalupro"),
    getJaluproClassic("jalupro-classic"),
    getJaluproHMW("jalupro-hmw"),
    getJaluproSuperHydro("jalupro-super-hydro"),
    getJaluproYoungEye("jalupro-young-eye"),
  ]);

  const isAdmin = Boolean(user && user.email === process.env.ADMIN_EMAIL);

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center px-4">
        <div className="section-shell w-full max-w-2xl p-8 text-center">
          <h1 className="mb-3 text-3xl font-semibold text-redDark">
            Prístup zamietnutý
          </h1>
          <p className="text-sm text-greyMain">
            Na úpravu sekcie Jalupro sa musíš prihlásiť ako administrátor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Jalupro_update_form
      jaluproData={jaluproData}
      jaluproClassicData={jaluproClassicData}
      jaluproHMWData={jaluproHMWData}
      jaluproSuperHydroData={jaluproSuperHydroData}
      jaluproYoungEyeData={jaluproYoungEyeData}
      isAdmin={isAdmin}
    />
  );
}
