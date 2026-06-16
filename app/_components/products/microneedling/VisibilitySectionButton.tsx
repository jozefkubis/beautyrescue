import type { TknCategoryWithProducts } from "@/app/_lib/data_services_all/data_tkn";
import CheckboxField from "../../CheckboxField";

type VisibilityState = {
  categories: Record<string, boolean>;
  products: Record<string, boolean>;
};

type VisibilitySectionButtonProps = {
  category: TknCategoryWithProducts;
  visibilityValues: VisibilityState;
  handleCategoryToggle: (slug: string, value: boolean) => void;
  linksDisabled: boolean;
};

export default function VisibilitySectionButton({
  category,
  visibilityValues,
  handleCategoryToggle,
  linksDisabled,
}: VisibilitySectionButtonProps) {
  return (
    <CheckboxField
      labelActive="Aktívne"
      labelInactive="Neaktívne"
      checked={visibilityValues.categories[category.slug] ?? true}
      onChange={(e) => handleCategoryToggle(category.slug, e.target.checked)}
      disabled={linksDisabled}
    />
  );
}
