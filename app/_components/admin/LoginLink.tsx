import Link from "next/link";
import { RiAdminLine } from "react-icons/ri";

type LoginLinkProps = {
  setOpenModal: (open: boolean) => void;
};

export default function LoginLink({ setOpenModal }: LoginLinkProps) {
  return (
    <Link
      href="/admin"
      onClick={() => setOpenModal(true)}
      className="flex items-center justify-center rounded-full p-1 text-lg text-transparent ring-0 ring-[#ffd982] transition-all duration-300 ease-in-out hover:cursor-pointer hover:text-[#ffd982] hover:ring-2 font-bold"
      aria-label="Admin panel"
      title="Admin panel"
    >
      <RiAdminLine />
    </Link>
  );
}
