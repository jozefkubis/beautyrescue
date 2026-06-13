"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { brandFont } from "../fonts";
import handleSubmitRegister from "./handleSubmitRegister";

// Tento komponent zobrazuje jednoduchý registračný formulár pre admin sekciu.
export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await handleSubmitRegister({ e, setError });

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/pouzivatelia");
      } else {
        toast.error(result.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-md">
      <div className="section-shell fade-up rounded-[28px] sm:p-8">
        <div className="mb-6 p-6 text-center sm:mb-8 md:p-0">
          <p className="mx-auto mb-3 inline-flex rounded-full border border-redMain/20 bg-redMain/8 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-redDark">
            Registrácia nového účtu
          </p>
          <h1
            className={`premium-title text-3xl font-semibold italic tracking-tight sm:text-4xl ${brandFont.className}`}
          >
            Registrovať účet
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Vyplň meno, email, heslo a potvrdenie hesla.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 p-6 md:p-0"
        >
          {error && (
            <div className="rounded-lg border border-redMain/30 bg-redMain/8 p-4 text-sm text-redDark">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium tracking-wide text-goldDark"
            >
              Meno
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              disabled={isLoading}
              className="w-full rounded-xl border border-goldDark/25 bg-white/90 px-4 py-3 text-greyMain shadow-sm outline-none transition duration-200 placeholder:text-neutral-400 focus:border-redMain/50 focus:ring-4 focus:ring-redMain/10 disabled:opacity-60"
              placeholder="Meno používateľa"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium tracking-wide text-goldDark"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              disabled={isLoading}
              className="w-full rounded-xl border border-goldDark/25 bg-white/90 px-4 py-3 text-greyMain shadow-sm outline-none transition duration-200 placeholder:text-neutral-400 focus:border-redMain/50 focus:ring-4 focus:ring-redMain/10 disabled:opacity-60"
              placeholder="vas@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium tracking-wide text-goldDark"
            >
              Heslo
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
              className="w-full rounded-xl border border-goldDark/25 bg-white/90 px-4 py-3 text-greyMain shadow-sm outline-none transition duration-200 placeholder:text-neutral-400 focus:border-redMain/50 focus:ring-4 focus:ring-redMain/10 disabled:opacity-60"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="passwordConfirmation"
              className="text-sm font-medium tracking-wide text-goldDark"
            >
              Potvrdenie hesla
            </label>
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
              className="w-full rounded-xl border border-goldDark/25 bg-white/90 px-4 py-3 text-greyMain shadow-sm outline-none transition duration-200 placeholder:text-neutral-400 focus:border-redMain/50 focus:ring-4 focus:ring-redMain/10 disabled:opacity-60"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl border border-redMain/30 bg-redMain px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_24px_rgba(190,18,60,0.22)] transition duration-200 hover:cursor-pointer hover:bg-redDark hover:shadow-[0_14px_28px_rgba(139,9,44,0.24)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-redMain/25 disabled:cursor-not-allowed disabled:opacity-70 active:scale-98"
          >
            {isLoading ? "Registrujem..." : "Registrovať"}
          </button>
        </form>
      </div>
    </section>
  );
}
