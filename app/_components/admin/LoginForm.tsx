"use client"

import { useState } from "react"
import { brandFont } from "../fonts"

type LoginFormData = {
  email: string
  password: string
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  function validate(values: LoginFormData) {
    const nextErrors: Partial<LoginFormData> = {}

    if (!values.email.trim()) {
      nextErrors.email = "Email je povinný."
    }

    if (!values.password.trim()) {
      nextErrors.password = "Heslo je povinné."
    }

    return nextErrors
  }

  async function handleLogin(values: LoginFormData) {
    // TODO: napoj sem autentifikaciu (Supabase/Auth API)
    console.log("Login payload:", values)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(formData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    try {
      setIsSubmitting(true)
      await handleLogin(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-md px-5 py-8 sm:py-12">
      <div className="section-shell fade-up rounded-[28px] p-6 sm:p-8">
        <div className="mb-6 text-center sm:mb-8">
          <p className="mx-auto mb-3 inline-flex rounded-full border border-redMain/20 bg-redMain/8 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-redDark">
            Admin prihlásenie
          </p>
          <h1
            className={`premium-title text-3xl font-semibold italic tracking-tight sm:text-4xl ${brandFont.className}`}
          >
            Prihlásiť sa
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Zadajte prihlasovacie údaje pre vstup do administrácie.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
              value={formData.email}
              onChange={handleChange}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-xl border border-goldDark/25 bg-white/90 px-4 py-3 text-greyMain shadow-sm outline-none transition duration-200 placeholder:text-neutral-400 focus:border-redMain/50 focus:ring-4 focus:ring-redMain/10"
              placeholder="vas@email.com"
              required
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-redDark">
                {errors.email}
              </p>
            )}
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
              value={formData.password}
              onChange={handleChange}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="w-full rounded-xl border border-goldDark/25 bg-white/90 px-4 py-3 text-greyMain shadow-sm outline-none transition duration-200 placeholder:text-neutral-400 focus:border-redMain/50 focus:ring-4 focus:ring-redMain/10"
              placeholder="••••••••"
              required
            />
            {errors.password && (
              <p id="password-error" className="text-sm text-redDark">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl border border-redMain/30 bg-redMain px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_24px_rgba(190,18,60,0.22)] transition duration-200 hover:bg-redDark hover:shadow-[0_14px_28px_rgba(139,9,44,0.24)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-redMain/25 disabled:cursor-not-allowed disabled:opacity-70 hover:cursor-pointer active:scale-98"
          >
            {isSubmitting ? "Prihlasujem..." : "Prihlásiť sa"}
          </button>
        </form>
      </div>
    </section>
  )
}
