import Mezoterapia_update_form from "@/app/_components/products/mezoterapia/Mezoterapia_update_form";
import { getCurrentUser } from "@/app/_lib/actions/auth_actions";
import {
  getMezoterapia,
  getMezoterapiaInvasive,
  getMezoterapiaNonInvasive,
} from "@/app/_lib/data_services/data_mezoterapia";

export default async function Page() {
  const [
    user,
    mezoterapiaData,
    mezoterapiaInvasiveData,
    mezoterapiaNonInvasiveData,
  ] = await Promise.all([
    getCurrentUser(),
    getMezoterapia("mezoterapia"),
    getMezoterapiaInvasive("mezoterapia-invasive"),
    getMezoterapiaNonInvasive("mezoterapia-non-invasive"),
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
            Na úpravu sekcie Mezoterapia sa musíš prihlásiť ako administrátor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Mezoterapia_update_form
      mezoterapiaData={mezoterapiaData}
      mezoterapiaInvasiveData={mezoterapiaInvasiveData}
      mezoterapiaNonInvasiveData={mezoterapiaNonInvasiveData}
      isAdmin={isAdmin}
    />
  );
}
