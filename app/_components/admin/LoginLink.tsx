import { RiAdminLine } from "react-icons/ri";

type LoginLinkProps = {
  setOpenModal: (open: boolean) => void;
};

export default function LoginLink({ setOpenModal }: LoginLinkProps) {
  return (
    <button
      type="button"
      onClick={() => setOpenModal(true)}
      className="
        flex items-center justify-center
        rounded-full p-2 text-xl
        text-transparent
        ring-2 ring-transparent
        transition-all duration-300 ease-in-out

        hover:scale-110
        hover:rotate-12
        hover:text-[#ffd982]
        hover:ring-[#ffd982]
        hover:shadow-[0_0_15px_rgba(255,217,130,0.6)]
        hover:ring-4

        active:scale-95

        cursor-pointer
      "
      aria-label="Admin panel"
      title="Admin panel"
    >
      <RiAdminLine />
    </button>
  );
}
