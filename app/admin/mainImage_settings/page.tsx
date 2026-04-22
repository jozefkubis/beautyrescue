import MainImage_update_form from "@/app/_components/home/main/news/news_on_image/MainImage_update_form";
import { getCurrentUser } from "@/app/_lib/actions_all/auth_actions";
import getHomeImage from "@/app/_lib/data_services/data_home_image";

export default async function Page() {
  const [user, homeImg] = await Promise.all([getCurrentUser(), getHomeImage()]);

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

  return <MainImage_update_form isAdmin={isAdmin} homeImg={homeImg} />;
}
