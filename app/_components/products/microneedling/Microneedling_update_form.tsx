"use client";

import CheckboxField from "@/app/_components/CheckboxField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import {
  deleteTknCategory,
  deleteTknProduct,
  updateMicroneedling,
  updateTknVisibility,
} from "@/app/_lib/actions/actions_microneedling";
import type { TknCategory } from "@/app/_lib/data_services/data_tkn_db";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";
import FileField from "../../FileField";
import SectionNavigation from "../../SectionNavigation";

type MicroneedlingData = {
  slug?: string;
  name?: string;
  image_url?: string;
  content?: {
    paragraphs?: string[];
  };
  attributes?: {
    contraindicationsTitle?: string;
    contraindications?: string[];
  };
  is_active?: boolean;
};

type Props = {
  microneedlingData: MicroneedlingData;
  tknCategories: TknCategory[];
  isAdmin?: boolean;
};

type VisibilityState = {
  categories: Record<string, boolean>;
  products: Record<string, boolean>;
};

// Z DB kategórií si pripravíme jednoduchý map objekt pre checkboxy v admin formulári.
function buildInitialVisibility(tknCategories: TknCategory[]): VisibilityState {
  const categories: Record<string, boolean> = {};
  const products: Record<string, boolean> = {};

  for (const category of tknCategories) {
    categories[category.dbSlug] = category.is_active;
    for (const product of category.products) {
      products[product.dbSlug] = product.is_active;
    }
  }

  return { categories, products };
}

// Admin formulár pre hlavný obsah Microneedling a DB správu TKN sekcií a produktov.
export default function Microneedling_update_form({
  microneedlingData,
  tknCategories,
  isAdmin,
}: Props) {
  const [isPendingMain, startTransitionMain] = useTransition();
  const [isPendingVisibility, startTransitionVisibility] = useTransition();

  // ===== INICIALIZÁCIA PRE HLAVNÝ OBSAH =====
  // Vypočítaj počiatočné hodnoty z props. useMemo zabezpečí, že sa to prepočítá iba keď sa zmenia props
  const initialMainValues = useMemo(
    () => ({
      name: microneedlingData?.name ?? "",
      image_url: microneedlingData?.image_url ?? "",
      paragraphs: microneedlingData?.content?.paragraphs?.join("\n\n") ?? "",
      contraindicationsTitle:
        microneedlingData?.attributes?.contraindicationsTitle ?? "",
      contraindications:
        microneedlingData?.attributes?.contraindications?.join("\n") ?? "",
      isActive: microneedlingData?.is_active ?? false,
    }),
    [microneedlingData],
  );

  // ===== INICIALIZÁCIA PRE TKN VIDITEĽNOSŤ =====
  // Vypočítaj počiatočné hodnoty z props
  const initialVisibilityValues = useMemo(
    () => buildInitialVisibility(tknCategories),
    [tknCategories],
  );

  // ===== STATE MANAGEMENT PRE HLAVNÝ OBSAH =====
  // mainValues = aktuálne hodnoty ktoré admin píše (live state)
  // lastSavedMainValues = poslední stav z DB (na detekciu zmien a Undo)
  const [mainValues, setMainValues] = useState(initialMainValues);
  const [lastSavedMainValues, setLastSavedMainValues] =
    useState(initialMainValues);

  // Vybraný obrázok držíme samostatne, aby sa poslal ako File vo FormData.
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  // ===== STATE MANAGEMENT PRE TKN SEKCIE A PRODUKTY =====
  // visibilityValues = lokálny checkbox state (admin zmeny)
  // lastSavedVisibilityValues = posledný uložený stav z databázy
  const [visibilityValues, setVisibilityValues] = useState(
    initialVisibilityValues,
  );
  const [lastSavedVisibilityValues, setLastSavedVisibilityValues] = useState(
    initialVisibilityValues,
  );
  const [deletedCategorySlugs, setDeletedCategorySlugs] = useState<string[]>(
    [],
  );
  const [deletedProductSlugs, setDeletedProductSlugs] = useState<string[]>([]);

  // ===== CHECKBOX ZMENY =====
  // Keď admin klinkne checkbox, zmení sa visibilityValues
  // Prepne lokálny stav jedného produktu, aby admin videl zmenu hneď bez čakania.
  function handleProductToggle(slug: string, value: boolean) {
    // ✓ Toto funguje — local state sa zmení, checkbox sa zobrazí nový stav
    setVisibilityValues((prev) => ({
      ...prev,
      products: { ...prev.products, [slug]: value },
    }));
  }

  // Jednoduchý univerzálny setter pre hlavný formulár.
  function handleMainChange(
    field: keyof typeof mainValues,
    value: string | boolean,
  ) {
    setMainValues((prev) => ({ ...prev, [field]: value }));
  }

  // Prepne lokálny stav celej kategórie.
  function handleCategoryToggle(slug: string, value: boolean) {
    setVisibilityValues((prev) => ({
      ...prev,
      categories: { ...prev.categories, [slug]: value },
    }));
  }

  // Vráti hlavný formulár na poslednú uloženú verziu.
  function handleMainUndo() {
    setMainValues(lastSavedMainValues);
    setSelectedImageFile(null);
    toast.success("Zmeny boli vrátené");
  }

  // Vráti checkboxy na posledný stav, ktorý už bol uložený v databáze.
  function handleVisibilityUndo() {
    // Undo má vracať posledný uložený stav, nie iba prvý stav po načítaní stránky.
    setVisibilityValues(lastSavedVisibilityValues);
    toast.success("TKN viditeľnosť bola vrátená");
  }

  // Pošle hlavný obsah na server action a uloží texty + obrázok.
  function handleMainSubmit(formData: FormData) {
    startTransitionMain(async () => {
      try {
        formData.set("slug", microneedlingData?.slug ?? "microneedling");
        formData.set(
          "data",
          JSON.stringify({
            name: mainValues.name,
            paragraphs: mainValues.paragraphs,
            contraindicationsTitle: mainValues.contraindicationsTitle,
            contraindications: mainValues.contraindications,
            is_active: mainValues.isActive,
          }),
        );

        if (selectedImageFile) {
          formData.set("image_file", selectedImageFile);
        }

        await updateMicroneedling(formData);
        setLastSavedMainValues(mainValues);
        toast.success("Microneedling bol uložený");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní Microneedling");
      }
    });
  }

  // Uloží stavy kategórií a produktov priamo do DB cez `is_active`.
  function handleVisibilitySubmit(formData: FormData) {
    startTransitionVisibility(async () => {
      try {
        // Pošli aktuálny visibilityValues na server
        formData.set("data", JSON.stringify(visibilityValues));
        await updateTknVisibility(formData);
        // Aktualizuj lastSavedVisibilityValues — admin stránka sa NEreloaduje,
        // takže tento lokálny state je jediný zdroj pravdy pre Undo a hasVisibilityChanges.
        setLastSavedVisibilityValues(visibilityValues);
        toast.success("TKN viditeľnosť bola uložená");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní TKN viditeľnosti");
      }
    });
  }

  const hasMainChanges =
    JSON.stringify(mainValues) !== JSON.stringify(lastSavedMainValues) ||
    selectedImageFile !== null;

  // Porovnaj s lastSavedVisibilityValues — admin stránka sa po TKN save NEreloaduje,
  // takže lastSavedVisibilityValues je stabilný zdroj pravdy bez race condition.
  const hasVisibilityChanges =
    JSON.stringify(visibilityValues) !==
    JSON.stringify(lastSavedVisibilityValues);

  const sections = ["Hlavný obsah", "TKN viditeľnosť"];
  const [index, setIndex] = useState(1);
  const numberOfSections = sections.length;

  // Po jednom potvrdení trvalo vymaže celú sekciu aj všetky produkty v nej.
  async function deleteCategoryHandleClick(
    categoryDbSlug: string,
    categorySlug: string,
    productDbSlugs: string[],
  ) {
    if (
      !confirm(
        "Naozaj chcete odstrániť celú TKN sekciu aj všetky produkty v nej?",
      )
    ) {
      return;
    }

    startTransitionVisibility(async () => {
      try {
        const result = await deleteTknCategory(categoryDbSlug, categorySlug);

        if (!result?.ok) {
          throw new Error(result?.error ?? "Sekciu sa nepodarilo odstrániť.");
        }

        const hiddenProducts = Object.fromEntries(
          productDbSlugs.map((slug) => [slug, false]),
        );

        // Po úspechu sekciu okamžite schováme aj lokálne, aby admin videl výsledok bez reloadu.
        setDeletedCategorySlugs((prev) =>
          prev.includes(categoryDbSlug) ? prev : [...prev, categoryDbSlug],
        );
        setDeletedProductSlugs((prev) =>
          Array.from(new Set([...prev, ...productDbSlugs])),
        );
        setVisibilityValues((prev) => ({
          ...prev,
          categories: { ...prev.categories, [categoryDbSlug]: false },
          products: { ...prev.products, ...hiddenProducts },
        }));
        setLastSavedVisibilityValues((prev) => ({
          ...prev,
          categories: { ...prev.categories, [categoryDbSlug]: false },
          products: { ...prev.products, ...hiddenProducts },
        }));

        toast.success("Sekcia bola úspešne odstránená");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri odstraňovaní sekcie");
      }
    });
  }

  // Po jednom potvrdení trvalo vymaže iba konkrétny produkt.
  async function deleteProductHandleClick(
    categorySlug: string,
    productDbSlug: string,
    productSlug: string,
  ) {
    if (!confirm("Naozaj chcete odstrániť tento produkt?")) {
      return;
    }

    startTransitionVisibility(async () => {
      try {
        const result = await deleteTknProduct(
          productDbSlug,
          categorySlug,
          productSlug,
        );

        if (!result?.ok) {
          throw new Error(result?.error ?? "Produkt sa nepodarilo odstrániť.");
        }

        // Lokálne skryjeme produkt hneď po úspechu, aby admin videl výsledok bez refreshu.
        setDeletedProductSlugs((prev) =>
          prev.includes(productDbSlug) ? prev : [...prev, productDbSlug],
        );
        setVisibilityValues((prev) => ({
          ...prev,
          products: { ...prev.products, [productDbSlug]: false },
        }));
        setLastSavedVisibilityValues((prev) => ({
          ...prev,
          products: { ...prev.products, [productDbSlug]: false },
        }));

        toast.success("Produkt bol úspešne odstránený");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri odstraňovaní produktu");
      }
    });
  }

  return (
    <section className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-8 p-5 lg:gap-8 lg:p-8 lg:px-44">
        <SectionNavigation
          sections={sections}
          index={index}
          setIndex={setIndex}
          numberOfSections={numberOfSections}
        />
        {index === 1 && (
          <>
            <div className="px-6 pb-2 pt-6 md:px-8">
              <div className="flex flex-col items-center text-center">
                <p className="inline-flex rounded-full bg-[#fff6ee] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-goldDark">
                  Nastavenia obsahu
                </p>
                <h1 className="mt-4 text-3xl font-semibold italic text-goldDark sm:text-4xl">
                  Microneedling
                </h1>
              </div>
            </div>

            <form
              action={handleMainSubmit}
              className="space-y-5 px-5 pb-2 md:px-8"
            >
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="Názov"
                  value={mainValues.name}
                  onChange={(e) => handleMainChange("name", e.target.value)}
                  readOnly={!isAdmin}
                />
                <TextareaField
                  label="Obsah (odseky, oddelené prázdnym riadkom)"
                  value={mainValues.paragraphs}
                  onChange={(e) =>
                    handleMainChange("paragraphs", e.target.value)
                  }
                  readOnly={!isAdmin}
                  rows={10}
                />
                <InputField
                  label="Nadpis kontraindikácií"
                  value={mainValues.contraindicationsTitle}
                  onChange={(e) =>
                    handleMainChange("contraindicationsTitle", e.target.value)
                  }
                  readOnly={!isAdmin}
                />
                <TextareaField
                  label="Kontraindikácie (každá na novom riadku)"
                  value={mainValues.contraindications}
                  onChange={(e) =>
                    handleMainChange("contraindications", e.target.value)
                  }
                  readOnly={!isAdmin}
                  rows={7}
                />
                <FileField
                  type="file"
                  label="Hlavná fotka (image_url)"
                  value={mainValues.image_url}
                  onChange={(e) =>
                    setSelectedImageFile(e.target.files?.[0] ?? null)
                  }
                  readOnly={!isAdmin}
                />
                {selectedImageFile ? (
                  <p className="text-xs text-greyMain/80">
                    Vybraný súbor: {selectedImageFile.name}
                  </p>
                ) : null}
                <CheckboxField
                  labelActive="Aktívne"
                  labelInactive="Neaktívne"
                  checked={mainValues.isActive}
                  onChange={(e) =>
                    handleMainChange("isActive", e.target.checked)
                  }
                  disabled={!isAdmin}
                />
                <div className="flex flex-col gap-3 border-t border-goldDark/10 pt-5 sm:flex-row sm:items-center sm:justify-end">
                  <UndoButton
                    onClick={handleMainUndo}
                    disabled={!hasMainChanges || isPendingMain || !isAdmin}
                  >
                    Undo
                  </UndoButton>

                  <SubmitButton
                    loading={isPendingMain}
                    disabled={!hasMainChanges || isPendingMain || !isAdmin}
                  >
                    Uložiť zmeny
                  </SubmitButton>
                </div>
              </div>
            </form>
          </>
        )}
        {index === 2 && (
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
                if (deletedCategorySlugs.includes(category.dbSlug)) {
                  return null;
                }

                const visibleProducts = category.products.filter(
                  (product) => !deletedProductSlugs.includes(product.dbSlug),
                );

                return (
                  <div
                    key={category.slug}
                    className="rounded-2xl border border-goldDark/15 bg-[#fffaf5] p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-greyMain">
                          {category.name}
                        </h3>
                        <p className="text-xs text-goldDark/70">Sekcia</p>
                      </div>
                      <button
                        onClick={() =>
                          deleteCategoryHandleClick(
                            category.dbSlug,
                            category.slug,
                            category.products.map((product) => product.dbSlug),
                          )
                        }
                        type="button"
                        title="Odstrániť sekciu"
                        aria-label={`Odstrániť sekciu ${category.name}`}
                        disabled={!isAdmin || isPendingVisibility}
                        className="inline-flex h-10 items-center gap-2 rounded-full border border-redDark/15 bg-[#fff4f4] px-3 text-sm font-medium text-redDark shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-redDark/30 hover:bg-[#ffeaea] hover:shadow-[0_8px_18px_rgba(190,18,60,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-redMain/20 disabled:cursor-not-allowed disabled:border-red-100 disabled:bg-red-50/50 disabled:text-red-300 disabled:hover:translate-y-0 hover:cursor-pointer"
                      >
                        <FaRegTrashCan className="text-[13px]" />
                        <span className="hidden sm:inline text-xs">
                          Odstrániť
                        </span>
                      </button>
                      <CheckboxField
                        labelActive="Aktívne"
                        labelInactive="Neaktívne"
                        checked={
                          visibilityValues.categories[category.dbSlug] ?? true
                        }
                        onChange={(e) =>
                          handleCategoryToggle(
                            category.dbSlug,
                            e.target.checked,
                          )
                        }
                        disabled={!isAdmin || isPendingVisibility}
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
                            {product.name}
                          </p>
                          <button
                            onClick={() =>
                              deleteProductHandleClick(
                                category.slug,
                                product.dbSlug,
                                product.slug,
                              )
                            }
                            type="button"
                            title="Odstrániť produkt"
                            aria-label={`Odstrániť produkt ${product.name}`}
                            disabled={!isAdmin || isPendingVisibility}
                            className="inline-flex h-10 items-center gap-2 rounded-full border border-redDark/15 bg-[#fff4f4] px-3 text-sm font-medium text-redDark shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-redDark/30 hover:bg-[#ffeaea] hover:shadow-[0_8px_18px_rgba(190,18,60,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-redMain/20 disabled:cursor-not-allowed disabled:border-red-100 disabled:bg-red-50/50 disabled:text-red-300 disabled:hover:translate-y-0 hover:cursor-pointer"
                          >
                            <FaRegTrashCan className="text-[13px]" />
                            <span className="hidden sm:inline text-xs">
                              Odstrániť
                            </span>
                          </button>
                          <CheckboxField
                            labelActive="Aktívne"
                            labelInactive="Neaktívne"
                            checked={
                              visibilityValues.products[product.dbSlug] ?? true
                            }
                            onChange={(e) =>
                              handleProductToggle(
                                product.dbSlug,
                                e.target.checked,
                              )
                            }
                            disabled={!isAdmin || isPendingVisibility}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 border-t border-goldDark/10 pt-5 sm:flex-row sm:items-center sm:justify-end">
              <UndoButton
                onClick={handleVisibilityUndo}
                disabled={
                  !hasVisibilityChanges || isPendingVisibility || !isAdmin
                }
              >
                Undo
              </UndoButton>
              <SubmitButton
                loading={isPendingVisibility}
                disabled={
                  !hasVisibilityChanges || isPendingVisibility || !isAdmin
                }
              >
                Uložiť zmeny
              </SubmitButton>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
