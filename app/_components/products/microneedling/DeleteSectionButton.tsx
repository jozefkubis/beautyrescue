import type { TknCategoryWithProducts } from "@/app/_lib/data_services_all/data_tkn";
import { FaRegTrashCan } from "react-icons/fa6";

type DeleteSectionButtonProps = {
  category: TknCategoryWithProducts;
  linksDisabled: boolean;
  deleteCategoryHandleClick: (
    categorySlug: string,
    productSlugs: string[],
  ) => void;
};

export default function DeleteSectionButton({
  category,
  linksDisabled,
  deleteCategoryHandleClick,
}: DeleteSectionButtonProps) {
  return (
    <button
      onClick={() =>
        deleteCategoryHandleClick(
          category.slug,
          category.products.map((product) => product.slug),
        )
      }
      type="button"
      title="Odstrániť sekciu"
      aria-label={`Odstrániť sekciu ${category.title}`}
      disabled={linksDisabled}
      className="inline-flex items-center gap-2 rounded-full border border-redDark/15 bg-[#fff4f4] p-3 text-sm font-medium text-redDark shadow-sm transition duration-200 hover:-translate-y-0.5 hover:cursor-pointer hover:border-redDark/30 hover:bg-[#ffeaea] hover:shadow-[0_8px_18px_rgba(190,18,60,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-redMain/20 disabled:cursor-not-allowed disabled:border-red-100 disabled:bg-red-50/50 disabled:text-red-300 disabled:hover:translate-y-0"
    >
      <FaRegTrashCan className="text-[13px]" />
    </button>
  );
}
