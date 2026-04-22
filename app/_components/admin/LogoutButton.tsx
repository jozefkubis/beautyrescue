"use client";

import { logOut } from "@/app/_lib/actions_all/auth_actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    const confirmed = window.confirm("Naozaj sa chcete odhlásiť?");
    if (!confirmed) return;

    try {
      setIsLoading(true);

      const result = await logOut();

      if (!result?.success) {
        toast.error(result?.message || "Odhlásenie nebolo úspešné!");
        return;
      }

      toast.success("Odhlásenie bolo úspešné!");
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Nastala chyba pri odhlasovaní.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center justify-center rounded-full p-1 text-lg text-transparent ring-0 ring-[#ffd982] transition-all duration-300 ease-in-out hover:cursor-pointer hover:text-[#ffd982] hover:ring-2 disabled:cursor-not-allowed disabled:opacity-50 font-bold"
      aria-label="Logout"
      title="Logout"
    >
      <IoMdLogOut />
    </button>
  );
}
