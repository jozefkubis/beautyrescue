import type { TknCategoryWithProducts } from "@/app/_lib/data_services_all/data_tkn";
import Link from "next/link";
import type { MouseEvent } from "react";
import { FaPlus } from "react-icons/fa6";

type AddNewProductProps = {
  category: TknCategoryWithProducts;
  linksDisabled: boolean;
  preventDisabledLinkClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  disabledLinkClass: string;
};

export default function AddNewProduct({
  category,
  linksDisabled,
  preventDisabledLinkClick,
  disabledLinkClass,
}: AddNewProductProps) {
  return (
    <div className="flex justify-end pt-1">
      <Link
        href={`/admin/kozmetika_nastavenia/microneedling_nastavenia/pridat_produkt?category=${category.slug}`}
        aria-disabled={linksDisabled}
        onClick={preventDisabledLinkClick}
        className={`inline-flex h-10 items-center rounded-full border border-goldDark/30 bg-[#fff6ee] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-goldDark transition duration-200 ${disabledLinkClass}`}
      >
        <FaPlus className="mr-1 text-[11px]" />
        Pridať produkt
      </Link>
    </div>
  );
}
