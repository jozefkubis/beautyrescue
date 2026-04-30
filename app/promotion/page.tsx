import { createPageMetadata } from "../_lib/seo";

export const metadata = createPageMetadata("promotion");

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="text-center section-shell fade-up max-w-full px-6 py-16 sm:p-30">
        <h1 className="mb-4 text-5xl font-bold text-goldDark">
          Na tejto stránke sa pracuje
        </h1>
        <p className="text-xl text-goldDark/80">
          Akcia panel je v procese vývoja...
        </p>
      </div>
    </div>
  );
}
