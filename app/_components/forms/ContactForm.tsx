export default function ContactForm() {
  return (
    <div>
      <h2 className="text-xl xl:text-2xl mx-auto font-semibold tracking-wide mb-4">
        Napíšte nám
      </h2>

      <form className="flex flex-col gap-4 text-xs xl:text-sm">
        <input
          type="text"
          placeholder="Vaše meno"
          className="px-4 py-2 rounded bg-background text-foreground placeholder:text-greyMain/70 focus:outline-none focus:ring-2 focus:ring-goldLight transition"
        />

        <input
          type="email"
          placeholder="Váš e-mail"
          className="px-4 py-2 rounded bg-background text-foreground placeholder:text-greyMain/70 focus:outline-none focus:ring-2 focus:ring-goldLight transition"
        />

        <textarea
          rows={4}
          placeholder="Vaša správa"
          className="px-4 py-2 rounded bg-background text-foreground placeholder:text-greyMain/70 focus:outline-none focus:ring-2 focus:ring-goldLight transition"
        />

        <button
          type="submit"
          className="bg-goldDark py-2 rounded text-white font-medium hover:bg-goldLight hover:text-greyMain transition hover:cursor-pointer active:scale-95"
        >
          Odoslať správu
        </button>
      </form>
    </div>
  )
}
