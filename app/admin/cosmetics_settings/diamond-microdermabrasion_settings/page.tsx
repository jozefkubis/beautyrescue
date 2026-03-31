import Diamond_microderma_update_form from "@/app/_components/products/diamond-microdermabrasion/Diamond_microderma_update_form";
import { getCurrentUser } from "@/app/_lib/actions/auth_actions";
import getDiamondMicrodermabrasion from "@/app/_lib/data_services/data_diamond_microdermabrasion";

export default async function Page() {
  const [user, diamondMicrodermabrasionData] = await Promise.all([
    getCurrentUser(),
    getDiamondMicrodermabrasion("diamond-microdermabrasion"),
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
            Na úpravu sekcie Diamantová mikrodermabrázia sa musíš prihlásiť ako
            administrátor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Diamond_microderma_update_form
      diamondMicrodermabrasionMainData={diamondMicrodermabrasionData}
      isAdmin={isAdmin}
    />
  );
}
