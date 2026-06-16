import type { TknCategoryWithProducts } from "@/app/_lib/data_services_all/data_tkn";
import Link from "next/link";
import type { MouseEvent } from "react";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import CheckboxField from "../../CheckboxField";
import SubmitButton from "../../SubmitButton";
import UndoButton from "../../UndoButton";

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
                  <Link
                    href={`/admin/kozmetika_nastavenia/microneedling_nastavenia/upravit_sekciu?category=${category.slug}`}
                    aria-disabled={linksDisabled}
                    onClick={preventDisabledLinkClick}
                    className={`inline-flex h-10 items-center rounded-full border border-goldDark/30 bg-[#fff6ee] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-goldDark transition duration-200 ${disabledLinkClass}`}
                  >
                    <span>Editovať</span>
                  </Link>

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
                </div>

                <CheckboxField
                  labelActive="Aktívne"
                  labelInactive="Neaktívne"
                  checked={visibilityValues.categories[category.slug] ?? true}
                  onChange={(e) =>
                    handleCategoryToggle(category.slug, e.target.checked)
                  }
                  disabled={linksDisabled}
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
                      <Link
                        href={`/admin/kozmetika_nastavenia/microneedling_nastavenia/upravit_produkt?product=${product.slug}`}
                        aria-disabled={linksDisabled}
                        onClick={preventDisabledLinkClick}
                        className={`inline-flex h-10 items-center rounded-full border border-goldDark/30 bg-[#fff6ee] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-goldDark transition duration-200 ${disabledLinkClass}`}
                      >
                        <span>Editovať</span>
                      </Link>

                      <button
                        onClick={() =>
                          deleteProductHandleClick(category.slug, product.slug)
                        }
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
                    </div>

                    <CheckboxField
                      labelActive="Aktívne"
                      labelInactive="Neaktívne"
                      checked={visibilityValues.products[product.slug] ?? true}
                      onChange={(e) =>
                        handleProductToggle(product.slug, e.target.checked)
                      }
                      disabled={linksDisabled}
                    />
                  </div>
                ))}

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
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 border-t border-goldDark/10 pt-5 sm:flex-row sm:items-center sm:justify-end">
        <div className="flex justify-end pt-1">
          <Link
            href="/admin/kozmetika_nastavenia/microneedling_nastavenia/pridat_sekciu"
            aria-disabled={linksDisabled}
            onClick={preventDisabledLinkClick}
            className={`inline-flex h-10 items-center rounded-full border border-goldDark/30 bg-[#fff6ee] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-goldDark transition duration-200 ${disabledLinkClass}`}
          >
            <FaPlus className="mr-1 text-[11px]" />
            Pridať sekciu
          </Link>
        </div>

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
