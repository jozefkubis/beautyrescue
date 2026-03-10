export default function ContactForm() {
  return (
    <div>
      <h2 className="mx-auto mb-4 text-xl font-semibold tracking-wide text-[#ffe2a5] xl:text-2xl">
        Napíšte nám
      </h2>

      <form className="flex flex-col gap-4 text-xs xl:text-sm">
        <input
          type="text"
          placeholder="Vaše meno"
          className="rounded-xl border border-goldLight/20 bg-white/10 px-4 py-2.5 text-background placeholder:text-white/60 transition focus:outline-none focus:ring-2 focus:ring-goldLight"
        />

        <input
          type="email"
          placeholder="Váš e-mail"
          className="rounded-xl border border-goldLight/20 bg-white/10 px-4 py-2.5 text-background placeholder:text-white/60 transition focus:outline-none focus:ring-2 focus:ring-goldLight"
        />

        <textarea
          rows={4}
          placeholder="Vaša správa"
          className="rounded-xl border border-goldLight/20 bg-white/10 px-4 py-2.5 text-background placeholder:text-white/60 transition focus:outline-none focus:ring-2 focus:ring-goldLight"
        />

        <button
          type="submit"
          className="rounded-xl bg-linear-to-r from-goldDark via-goldLight to-goldDark py-2.5 font-medium text-greyMain shadow-[0_10px_24px_rgba(212,175,55,0.25)] transition hover:cursor-pointer hover:brightness-105 active:scale-95"
        >
          Odoslať správu
        </button>
      </form>
    </div>
  )
}
