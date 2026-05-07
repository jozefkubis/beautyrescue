type VisibleProduct = {
  is_active: boolean;
};

type VisibleCategory<TProduct extends VisibleProduct> = {
  is_active: boolean;
  products: TProduct[];
};

// Cisty UI helper bez server zavislosti, aby fungoval rovnako v server aj client komponente.
export function getVisibleTknCategories<
  TProduct extends VisibleProduct,
  TCategory extends VisibleCategory<TProduct>,
>(categories: TCategory[]): TCategory[] {
  return categories
    .filter((category) => category.is_active)
    .map(
      (category) =>
        ({
          ...category,
          products: category.products.filter((product) => product.is_active),
        }) as TCategory,
    )
    // .filter((category) => category.products.length > 0);
}
