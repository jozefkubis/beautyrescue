import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function AddUserLink() {
  return (
    <div className="flex justify-end pt-1">
      <Link
        href="/admin/registracia"
        className="inline-flex h-10 items-center rounded-full border border-goldDark/30 bg-[#fff6ee] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-goldDark transition duration-200"
      >
        <FaPlus className="mr-1 text-[11px]" />
        Pridaj používateľa
      </Link>
    </div>
  );
}
