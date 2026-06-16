import type { TknCategoryWithProducts } from "@/app/_lib/data_services_all/data_tkn";
import type { MouseEvent } from "react";
import SubmitButton from "../../SubmitButton";
import UndoButton from "../../UndoButton";
import AddNewProduct from "./AddNewProduct";
import AddNewSection from "./AddNewSection";
import DeleteProductButton from "./DeleteProductButton";
import DeleteSectionButton from "./DeleteSectionButton";
import EditProductLink from "./EditProductLink";
import EditSectionButton from "./EditSectionButton";
import VisibilityProductButton from "./VisibilityProductButton";
import VisibilitySectionButton from "./VisibilitySectionButton";

type VisibilityState = {
  categories: Record<string, boolean>;
  products: Record<string, boolean>;
};

type Index_2_formProps = {
  tknCategories: TknCategoryWithProducts[];
  visibilityValues: VisibilityState;
  handleCategoryToggle: (slug: string, value: boolean) => void;
  handleProductToggle: (slug: string, value: boolean) => void;
  deleteCategoryHandleClick: (
    categorySlug: string,
    productSlugs: string[],
  ) => void;
  deleteProductHandleClick: (categorySlug: string, productSlug: string) => void;
  deletedCategorySlugs: string[];
  deletedProductSlugs: string[];
  handleVisibilitySubmit: (formData: FormData) => void;
  handleVisibilityUndo: () => void;
  hasVisibilityChanges: boolean;
  isAdmin: boolean;
  isPendingVisibility: boolean;
};

export default function Index_2_form({
  tknCategories,
  visibilityValues,
  handleCategoryToggle,
  handleProductToggle,
  deleteCategoryHandleClick,
  deleteProductHandleClick,
  deletedCategorySlugs,
  deletedProductSlugs,
  handleVisibilitySubmit,
  handleVisibilityUndo,
  hasVisibilityChanges,
  isAdmin,
  isPendingVisibility,
}: Index_2_formProps) {
  const linksDisabled = !isAdmin || isPendingVisibility;
  const disabledLinkClass = linksDisabled
    ? "cursor-not-allowed opacity-60"
    : "hover:-translate-y-0.5 hover:bg-[#ffeedf]";

  function preventDisabledLinkClick(event: MouseEvent<HTMLAnchorElement>) {
    if (linksDisabled) {
      event.preventDefault();
    }
  }

  return (
    <form
      action={handleVisibilitySubmit}
      className="space-y-5 border-t border-goldDark/10 px-5 pb-6 pt-5 md:px-8"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold italic text-goldDark sm:text-2xl">
          TKN sekcie a produkty
        </h2>
        <p className="text-sm text-greyMain/80">
          Tu sa mení iba viditeľnosť. Texty ostávajú bez zmeny.
        </p>
      </div>

      <div className="space-y-4">
        {tknCategories.map((category) => {
          if (deletedCategorySlugs.includes(category.slug)) {
            return null;
          }

          const visibleProducts = category.products.filter(
            (product) => !deletedProductSlugs.includes(product.slug),
          );

          return (
            <div
              key={category.slug}
              className="rounded-2xl border border-goldDark/15 bg-[#fffaf5] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-greyMain">
                    {category.title}
                  </h3>
                  <p className="text-xs text-goldDark/70">Sekcia</p>
                </div>

                <div className="flex items-center gap-2">
                  <EditSectionButton
                    linksDisabled={linksDisabled}
                    preventDisabledLinkClick={preventDisabledLinkClick}
                    disabledLinkClass={disabledLinkClass}
                    category={category}
                  />

                  <DeleteSectionButton
                    category={category}
                    linksDisabled={linksDisabled}
                    deleteCategoryHandleClick={deleteCategoryHandleClick}
                  />
                </div>

                <VisibilitySectionButton
                  category={category}
                  visibilityValues={visibilityValues}
                  handleCategoryToggle={handleCategoryToggle}
                  linksDisabled={linksDisabled}
                />
              </div>

              <div className="mt-4 space-y-2 border-t border-goldDark/10 pt-3">
                {visibleProducts.length === 0 ? (
                  <p className="rounded-xl bg-white px-3 py-2 text-sm text-greyMain/70">
                    V tejto sekcii už momentálne nie je žiadny viditeľný
                    produkt.
                  </p>
                ) : null}

                {visibleProducts.map((product) => (
                  <div
                    key={product.slug}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white px-3 py-2"
                  >
                    <p className="text-sm text-greyMain">
                      {product.name ?? product.slug}
                    </p>

                    <div className="flex items-center gap-2">
                      <EditProductLink
                        product={product}
                        linksDisabled={linksDisabled}
                        preventDisabledLinkClick={preventDisabledLinkClick}
                        disabledLinkClass={disabledLinkClass}
                      />

                      <DeleteProductButton
                        category={category}
                        product={product}
                        linksDisabled={linksDisabled}
                        deleteProductHandleClick={deleteProductHandleClick}
                      />
                    </div>

                    <VisibilityProductButton
                      product={product}
                      visibilityValues={visibilityValues}
                      handleProductToggle={handleProductToggle}
                      linksDisabled={linksDisabled}
                    />
                  </div>
                ))}

                <AddNewProduct
                  category={category}
                  linksDisabled={linksDisabled}
                  preventDisabledLinkClick={preventDisabledLinkClick}
                  disabledLinkClass={disabledLinkClass}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 border-t border-goldDark/10 pt-5 sm:flex-row sm:items-center sm:justify-end">
        <AddNewSection
          linksDisabled={linksDisabled}
          preventDisabledLinkClick={preventDisabledLinkClick}
          disabledLinkClass={disabledLinkClass}
        />

        <UndoButton
          onClick={handleVisibilityUndo}
          disabled={!hasVisibilityChanges || isPendingVisibility || !isAdmin}
        >
          Undo
        </UndoButton>
        <SubmitButton
          loading={isPendingVisibility}
          disabled={!hasVisibilityChanges || isPendingVisibility || !isAdmin}
        >
          Uložiť zmeny
        </SubmitButton>
      </div>
    </form>
  );
}
