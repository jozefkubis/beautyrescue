"use client";

import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type Status = {
  type: "success" | "error";
  message: string;
} | null;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Niečo sa pokazilo pri odosielaní.");
      }

      setStatus({
        type: "success",
        message: "Správa bola úspešne odoslaná.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error: unknown) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Nepodarilo sa odoslať správu.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div>
      <h2 className="mx-auto mb-4 text-xl font-semibold tracking-wide text-[#ffe2a5] xl:text-2xl">
        Napíšte nám
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-xs xl:text-sm"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Vaše meno"
          required
          className="rounded-xl border border-goldLight/20 bg-white/10 px-4 py-2.5 text-background placeholder:text-white/60 transition focus:outline-none focus:ring-2 focus:ring-goldLight"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Váš e-mail"
          required
          className="rounded-xl border border-goldLight/20 bg-white/10 px-4 py-2.5 text-background placeholder:text-white/60 transition focus:outline-none focus:ring-2 focus:ring-goldLight"
        />

        <textarea
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Vaša správa"
          required
          className="rounded-xl border border-goldLight/20 bg-white/10 px-4 py-2.5 text-background placeholder:text-white/60 transition focus:outline-none focus:ring-2 focus:ring-goldLight"
        />

        <button
          type="submit"
          disabled={isSending}
          className="rounded-xl bg-linear-to-r from-goldDark via-goldLight to-goldDark py-2.5 font-medium text-greyMain shadow-[0_10px_24px_rgba(212,175,55,0.25)] transition hover:cursor-pointer hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSending ? "Odosielam..." : "Odoslať správu"}
        </button>

        {status && (
          <p
            className={`text-sm ${
              status.type === "success" ? "text-green-300" : "text-red-300"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}
