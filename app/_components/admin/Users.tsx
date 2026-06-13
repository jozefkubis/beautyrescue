"use client";

import { brandFont } from "@/app/_components/fonts";
import type { usersProps } from "@/app/_lib/data_services_all/data_users";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteUserById } from "../../_lib/actions_all/users_actions";

type Props = {
  nonAdminUsers: usersProps;
};

// Jednoduchý admin prehľad používateľov so základnou akciou pre budúce mazanie.
export default function Users({ nonAdminUsers }: Props) {
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
    <section className="w-full px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-goldDark/35 to-transparent" />

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="inline-flex rounded-full border border-redMain/15 bg-redMain/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-redDark">
              Admin sekcia
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <h1
                  className={`premium-title text-3xl font-semibold italic tracking-tight text-goldDark sm:text-4xl lg:text-5xl ${brandFont.className}`}
                >
                  Používatelia
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-greyMain/80 sm:text-base">
                  Prehľad registrovaných používateľov.
                </p>
              </div>

              <div className="rounded-2xl border border-goldDark/15 bg-[linear-gradient(180deg,rgba(255,252,247,0.94)_0%,rgba(255,245,235,0.88)_100%)] px-5 py-4 text-sm text-greyMain shadow-[0_14px_32px_rgba(157,116,16,0.08)]">
                Celkom používateľov:{" "}
                <span className="font-semibold text-goldDark">
                  {nonAdminUsers.length}
                </span>
              </div>
            </div>
          </div>

          {nonAdminUsers.length > 0 ? (
            <div className="overflow-hidden rounded-[28px] border border-goldDark/15 bg-white/80 shadow-[0_14px_32px_rgba(157,116,16,0.08)]">
              <div className="hidden grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto] gap-4 border-b border-goldDark/10 bg-[linear-gradient(180deg,rgba(255,249,241,0.96)_0%,rgba(255,242,230,0.92)_100%)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-redDark/80 md:grid">
                <span>Meno</span>
                <span>Email</span>
                <span>Akcia</span>
              </div>

              <div className="divide-y divide-goldDark/10">
                {nonAdminUsers.map((user) => (
                  <div
                    key={user.id}
                    className="grid gap-4 px-5 py-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto] md:items-center md:px-6"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-redDark/70 md:hidden">
                        Meno
                      </p>
                      <p className="text-base font-semibold text-goldDark">
                        {user.name || "Bez mena"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-redDark/70 md:hidden">
                        Email
                      </p>
                      <p className="break-all text-sm text-greyMain sm:text-base">
                        {user.email}
                      </p>
                    </div>

                    <div className="flex md:justify-end">
                      <button
                        type="button"
                        onClick={() => handleDelete(user.id)}
                        disabled={deletingUserId === user.id}
                        className="inline-flex items-center gap-2 rounded-full border border-redMain/20 bg-redMain/8 px-4 py-2 text-sm font-semibold text-redDark transition-colors duration-200 hover:border-redMain/35 hover:bg-redMain/12 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-redMain/30"
                      >
                        <RiDeleteBinLine className="text-base" />
                        {deletingUserId === user.id ? "Mažem..." : "Kôš"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-[28px] border border-goldDark/15 bg-[linear-gradient(180deg,rgba(255,252,247,0.94)_0%,rgba(255,245,235,0.88)_100%)] px-6 py-10 text-center shadow-[0_14px_32px_rgba(157,116,16,0.08)]">
              <p className="text-lg font-semibold text-goldDark">
                Zatiaľ tu nie sú žiadni používatelia.
              </p>
              <p className="mt-2 text-sm text-greyMain/80">
                Keď sa niekto zaregistruje, zobrazí sa v tomto zozname.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
