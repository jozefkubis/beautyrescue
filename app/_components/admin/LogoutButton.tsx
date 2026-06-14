"use client";

import { logOut } from "@/app/_lib/actions_all/auth_actions";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";

export default function LogoutButton() {
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

      window.location.href = "/";
      toast.success("Odhlásenie bolo úspešné!");
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
  className="
    flex items-center justify-center
    rounded-full p-2 text-xl
    text-[#ffd982]
    ring-2 ring-[#ffd982]
    transition-all duration-300 ease-in-out

    hover:scale-110
    hover:rotate-12
    hover:shadow-[0_0_15px_rgba(255,217,130,0.6)]
    hover:ring-4

    active:scale-95

    disabled:cursor-not-allowed
    disabled:opacity-50
    disabled:hover:scale-100
    disabled:hover:rotate-0

    cursor-pointer
  "
  aria-label="Logout"
  title="Logout"
>
  <IoMdLogOut />
</button>
  );
}
