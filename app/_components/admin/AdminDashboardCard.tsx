import Link from "next/link";
// import { IoSettingsOutline } from "react-icons/io5"
import { RiArrowRightUpLine } from "react-icons/ri";

type AdminDashboardCardProps = {
  href: string;
  title: string;
  // description: string
  label: string;
  icon: React.ComponentType; // Očekává se komponenta pro ikonu
};

export default function AdminDashboardCard({
  href,
  title,
  // description,
  label,
  icon: Icon,
}: AdminDashboardCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[28px] border border-goldDark/15 bg-white/72 p-5 shadow-[0_14px_32px_rgba(157,116,16,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-redMain/18 hover:bg-white/84 hover:shadow-[0_22px_46px_rgba(157,116,16,0.14)] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(190,18,60,0.08),transparent_34%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-goldDark/15 bg-[linear-gradient(180deg,rgba(255,249,241,0.96)_0%,rgba(255,242,230,0.92)_100%)] text-xl text-goldDark shadow-[0_8px_18px_rgba(157,116,16,0.12)] transition-transform duration-300 group-hover:scale-105 group-hover:text-redDark">
            <Icon />
          </span>

          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-goldDark/15 bg-white/88 text-lg text-goldDark shadow-sm transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-redMain/20 group-hover:text-redDark">
            <RiArrowRightUpLine />
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-redDark/75">
            {label}
          </p>
          <h3 className="text-xl font-semibold tracking-tight text-goldDark sm:text-2xl">
            {title}
          </h3>
          {/* <p className="text-sm leading-7 text-greyMain/75 sm:text-[15px]">
            {description}
          </p> */}
        </div>
      </div>
    </Link>
  );
}
