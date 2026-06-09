"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import handleSubmitLogin from "../admin/handleSubmitLogin";
import { brandFont } from "../fonts";

type LoginFormProps = {
  onSuccess?: () => void;
};

export default function Customer_LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await handleSubmitLogin({ e, setError });

      // Po uspesnom logine obnovime layout a na samostatnej login stranke usera posleme na homepage.
      if (result.success) {
        toast.success(result.message);
        onSuccess?.(); // zavrie modal
        if (!onSuccess) {
          router.push("/");
        }
        router.refresh();
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
        <div className="mb-6 text-center sm:mb-8 p-6 md:p-0">
          <p className="mx-auto mb-3 inline-flex rounded-full border border-redMain/20 bg-redMain/8 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-redDark">
            Zákaznícka sekcia
          </p>
          <h1
            className={`premium-title text-3xl font-semibold italic tracking-tight sm:text-4xl ${brandFont.className}`}
          >
            Prihlásiť sa
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Zadajte prihlasovacie údaje pre vstup do zákazníckej sekcie.
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
              autoComplete="current-password"
              disabled={isLoading}
              className="w-full rounded-xl border border-goldDark/25 bg-white/90 px-4 py-3 text-greyMain shadow-sm outline-none transition duration-200 placeholder:text-neutral-400 focus:border-redMain/50 focus:ring-4 focus:ring-redMain/10 disabled:opacity-60"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl border border-redMain/30 bg-redMain px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_24px_rgba(190,18,60,0.22)] transition duration-200 hover:bg-redDark hover:shadow-[0_14px_28px_rgba(139,9,44,0.24)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-redMain/25 disabled:cursor-not-allowed disabled:opacity-70 hover:cursor-pointer active:scale-98"
          >
            {isLoading ? "Prihlasujem..." : "Prihlásiť sa"}
          </button>
        </form>
      </div>
    </section>
  );
}
