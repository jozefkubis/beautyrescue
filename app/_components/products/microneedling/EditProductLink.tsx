import Link from "next/link";

type EditProductLinkProps = {
  product: { slug: string };
  linksDisabled: boolean;
  preventDisabledLinkClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => void;
  disabledLinkClass: string;
};

export default function EditProductLink({
  product,
  linksDisabled,
  preventDisabledLinkClick,
  disabledLinkClass,
}: EditProductLinkProps) {
  return (
    <Link
      href={`/admin/kozmetika_nastavenia/microneedling_nastavenia/upravit_produkt?product=${product.slug}`}
      aria-disabled={linksDisabled}
      onClick={preventDisabledLinkClick}
      className={`inline-flex h-10 items-center rounded-full border border-goldDark/30 bg-[#fff6ee] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-goldDark transition duration-200 ${disabledLinkClass}`}
    >
      <span>Editovať</span>
    </Link>
  );
}
