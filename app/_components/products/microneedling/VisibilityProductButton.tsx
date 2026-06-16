import type { TknCategoryWithProducts } from "@/app/_lib/data_services_all/data_tkn";
import CheckboxField from "../../CheckboxField";

type VisibilityState = {
  categories: Record<string, boolean>;
  products: Record<string, boolean>;
};

type VisibilityProductButtonProps = {
  product: TknCategoryWithProducts["products"][number];
  visibilityValues: VisibilityState;
  handleProductToggle: (slug: string, value: boolean) => void;
  linksDisabled: boolean;
};

export default function VisibilityProductButton({
  product,
  visibilityValues,
  handleProductToggle,
  linksDisabled,
}: VisibilityProductButtonProps) {
  return (
    <CheckboxField
      labelActive="Aktívne"
      labelInactive="Neaktívne"
      checked={visibilityValues.products[product.slug] ?? true}
      onChange={(e) => handleProductToggle(product.slug, e.target.checked)}
      disabled={linksDisabled}
    />
  );
}
