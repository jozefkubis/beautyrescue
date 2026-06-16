import type { TknCategoryWithProducts } from "@/app/_lib/data_services_all/data_tkn";
import Link from "next/link";

type EditSectionButtonProps = {
  linksDisabled: boolean;
  preventDisabledLinkClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => void;
  disabledLinkClass: string;
  category: TknCategoryWithProducts;
};

export default function EditSectionButton({
  linksDisabled,
  preventDisabledLinkClick,
  disabledLinkClass,
  category,
}: EditSectionButtonProps) {
  return (
    <Link
      href={`/admin/kozmetika_nastavenia/microneedling_nastavenia/upravit_sekciu?category=${category.slug}`}
      aria-disabled={linksDisabled}
      onClick={preventDisabledLinkClick}
      className={`inline-flex h-10 items-center rounded-full border border-goldDark/30 bg-[#fff6ee] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-goldDark transition duration-200 ${disabledLinkClass}`}
    >
      <span>Editovať</span>
    </Link>
  );
}
