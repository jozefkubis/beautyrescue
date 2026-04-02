import Microneedling_update_form from "@/app/_components/products/microneedling/Microneedling_update_form";
import { getCurrentUser } from "@/app/_lib/actions/auth_actions";
import getMicroneedling from "@/app/_lib/data_services/data_microneedling";
import getTknVisibility from "@/app/_lib/data_services/data_tkn_visibility";

export default async function Page() {
  const [user, microneedlingData, tknVisibility] = await Promise.all([
    getCurrentUser(),
    getMicroneedling("microneedling"),
    getTknVisibility(),
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
            Na úpravu sekcie Microneedling sa musíš prihlásiť ako administrátor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Microneedling_update_form
      microneedlingData={microneedlingData}
      tknVisibility={tknVisibility}
      isAdmin={isAdmin}
    />
  );
}
