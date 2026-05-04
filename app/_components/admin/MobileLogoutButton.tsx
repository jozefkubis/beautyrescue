"use client";

import { logOut } from "@/app/_lib/actions_all/auth_actions";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";

// Mobilne tlacidlo na odhlasenie, aby bolo v headri citatelne a pohodlne na kliknutie.
export default function MobileLogoutButton() {
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
      className="inline-flex p-2 items-center justify-center rounded-lg border border-goldLight/35 bg-white/10 text-[#ffe2a5] shadow-md shadow-black/15 backdrop-blur-sm transition-all duration-300 ease-out active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Odhlásiť sa"
      title="Odhlásiť sa"
    >
      <IoMdLogOut
        size={28}
        className={
          isLoading ? "animate-spin" : "transition-transform duration-300"
        }
      />
    </button>
  );
}
