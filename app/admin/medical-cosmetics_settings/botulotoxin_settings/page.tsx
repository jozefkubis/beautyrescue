import Botulotoxin_update_form from "@/app/_components/products/botulotoxin/Botulotoxin_update_form";
import { getCurrentUser } from "@/app/_lib/actions/auth_actions";
import {
  getBotulotoxin,
  getBotulotoxinPotenie,
  getBotulotoxinVrasky,
} from "@/app/_lib/data_services/data_botulotoxin";

export default async function Page() {
  const [user, botulotoxinData, botulotoxinPotenieData, botulotoxinVraskyData] =
    await Promise.all([
      getCurrentUser(),
      getBotulotoxin("botulotoxin"),
      getBotulotoxinPotenie("botulotoxin-potenie"),
      getBotulotoxinVrasky("botulotoxin-vrasky"),
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
            Na úpravu sekcie Botulotoxín sa musíš prihlásiť ako administrátor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Botulotoxin_update_form
      botulotoxinData={botulotoxinData}
      botulotoxinPotenieData={botulotoxinPotenieData}
      botulotoxinVraskyData={botulotoxinVraskyData}
      isAdmin={isAdmin}
    />
  );
}
