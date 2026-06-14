import { deleteUserById } from "@/app/_lib/actions_all/users_actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";

export default function DeleteUserButton({ userId }: { userId: string }) {
  const router = useRouter();
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  async function handleDelete(userId: string) {
    if (!confirm("Naozaj chcete odstrániť tohto používateľa?")) return;

    setDeletingUserId(userId);

    try {
      const result = await deleteUserById(userId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
    } catch (error) {
      console.error("handleDelete error:", error);
      toast.error("Používateľa sa nepodarilo odstrániť.");
    } finally {
      setDeletingUserId(null);
    }
  }

  return (
    <div className="flex md:justify-end">
      <button
        type="button"
        onClick={() => handleDelete(userId)}
        disabled={deletingUserId === userId}
        className="inline-flex items-center gap-2 rounded-full border border-redMain/20 bg-redMain/8 px-4 py-2 text-sm font-semibold text-redDark transition-colors duration-200 hover:border-redMain/35 hover:bg-redMain/12 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-redMain/30"
      >
        <RiDeleteBinLine className="text-base" />
        {deletingUserId === userId ? "Mažem..." : "Kôš"}
      </button>
    </div>
  );
}
