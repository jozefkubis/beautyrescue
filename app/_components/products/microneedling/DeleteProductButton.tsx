import type { TknCategoryWithProducts } from "@/app/_lib/data_services_all/data_tkn";
import { FaRegTrashCan } from "react-icons/fa6";

type DeleteProductButtonProps = {
  category: TknCategoryWithProducts;
  product: TknCategoryWithProducts["products"][number];
  linksDisabled: boolean;
  deleteProductHandleClick: (categorySlug: string, productSlug: string) => void;
};

export default function DeleteProductButton({
  category,
  product,
  linksDisabled,
  deleteProductHandleClick,
}: DeleteProductButtonProps) {
  return (
    <button
      onClick={() => deleteProductHandleClick(category.slug, product.slug)}
      type="button"
      title="Odstrániť produkt"
      aria-label={`Odstrániť produkt ${product.name ?? product.slug}`}
      disabled={linksDisabled}
      className={`inline-flex items-center gap-2 rounded-full border border-redDark/15 bg-[#fff4f4] p-3 text-sm font-medium text-redDark shadow-sm transition duration-200 ${
        linksDisabled
          ? "cursor-not-allowed opacity-60"
          : "hover:-translate-y-0.5 hover:cursor-pointer hover:border-redDark/30 hover:bg-[#ffeaea] hover:shadow-[0_8px_18px_rgba(190,18,60,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-redMain/20"
      }`}
    >
      <FaRegTrashCan className="text-[13px]" />
    </button>
  );
}
