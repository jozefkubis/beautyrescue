import AboutUpdateForm from "@/app/_components/about/AboutUpdateForm";
import { getCurrentUser } from "@/app/_lib/actions/auth_actions";
import { getAboutUs } from "@/app/_lib/data_services_all/data_about";

export default async function Page() {
  const [user, aboutUsData] = await Promise.all([
    getCurrentUser(),
    getAboutUs("about-us"),
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
            Na úpravu sekcie O nás sa musíš prihlásiť ako administrátor.
          </p>
        </div>
      </div>
    );
  }

  return <AboutUpdateForm aboutUsData={aboutUsData} isAdmin={isAdmin} />;
}
