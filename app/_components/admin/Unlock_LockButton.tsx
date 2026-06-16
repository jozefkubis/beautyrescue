"use client";

import { toggleSiteAccess } from "@/app/_lib/actions_all/actions_site_access";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { RiLockLine, RiLockUnlockLine } from "react-icons/ri";

type UnlockLockButtonProps = {
  initialIsPublic: boolean | undefined;
};

export default function Unlock_LockButton({
  initialIsPublic,
}: UnlockLockButtonProps) {
  const [isPublic, setIsPublic] = useState(initialIsPublic ?? false);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleSiteAccess();

      if (result.success) {
        setIsPublic(result.is_public);
        toast.success(result.message);
      } else {
        toast.error(result.message);
        console.error(result.message);
      }
    });
  }

  const Icon = isPublic ? RiLockLine : RiLockUnlockLine;

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-redMain/25 bg-linear-to-r from-redMain to-redDark px-5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_24px_rgba(190,18,60,0.22)] transition duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-[0_14px_30px_rgba(190,18,60,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-redMain/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
    >
      <Icon className="text-lg" aria-hidden="true" />
      <span>
        {isPending
          ? "Ukladám..."
          : isPublic
            ? "Zamknúť web"
            : "Sprístupniť web"}
      </span>
    </button>
  );
}
