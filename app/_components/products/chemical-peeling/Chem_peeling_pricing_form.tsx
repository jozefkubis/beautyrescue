const treatments = [
  {
    id: 1,
    treatment: "Chemický peeling - tvár",
    price: "40,- €",
    sale: "0 %",
  },
  {
    id: 2,
    treatment: "Chemický peeling - tvár a krk",
    price: "50,- €",
    sale: "0 %",
  },
  {
    id: 3,
    treatment: "Chemický peeling - tvár, krk a dekolt",
    price: "60,- €",
    sale: "0 %",
  },
  {
    id: 4,
    treatment: "Chemický peeling 35% TCA – tvár",
    price: "60,- €",
    sale: "0 %",
  },
  {
    id: 5,
    treatment: "Chemický peeling 35% TCA – 1 bod do 1 cm",
    price: "5,- €",
    sale: "0 %",
  },
  {
    id: 6,
    treatment: "Vstupná konzultácia",
    price: "15,- €",
    sale: "0 %",
  },
]

export default function Chem_peeling_pricing_form() {
  return (
    <section className="w-full px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="overflow-hidden rounded-[28px] border border-goldDark/40 bg-gradient-to-br from-greyMain via-[#151515] to-[#0f0f0f] shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
          {/* Header */}
          <div className="border-b border-goldDark/20 bg-gradient-to-r from-goldDark/10 via-transparent to-goldLight/10 px-6 py-6 md:px-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 inline-flex w-fit rounded-full border border-goldDark/30 bg-goldDark/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-goldLight">
                  Cenník procedúr
                </p>

                <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  Chemický peeling
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                  Náhľad formulára v štýle appky. Verejne môže pôsobiť ako
                  luxusná tabuľka, admin režim neskôr len prepneš na
                  editovateľné polia.
                </p>
              </div>

              <div className="rounded-2xl border border-goldDark/20 bg-white/5 px-4 py-3 text-right backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Status
                </p>
                <p className="text-sm font-medium text-goldLight">
                  Design preview
                </p>
              </div>
            </div>
          </div>

          <form className="p-4 md:p-6">
            {/* Table Head */}
            <div className="mb-3 hidden grid-cols-[1.8fr_0.6fr_0.5fr] gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 md:grid">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                Ošetrenie
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                Cena
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                Akcia
              </span>
            </div>

            {/* Rows */}
            <div className="space-y-3">
              {treatments.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-2xl border border-white/6 bg-white/[0.025] p-3 transition-all duration-300 hover:border-goldDark/30 hover:bg-white/[0.045] hover:shadow-[0_8px_30px_rgba(0,0,0,0.22)]"
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.8fr_0.6fr_0.5fr]">
                    {/* Ošetrenie */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 md:hidden">
                        Ošetrenie
                      </label>
                      <input
                        type="text"
                        value={item.treatment}
                        disabled
                        placeholder="Ošetrenie"
                        className="h-14 w-full rounded-2xl border border-white/8 bg-[#121212] px-4 text-sm font-medium text-white/85 outline-none placeholder:text-white/25 disabled:cursor-not-allowed disabled:opacity-100 disabled:text-white/85"
                      />
                    </div>

                    {/* Cena */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 md:hidden">
                        Cena
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={item.price}
                          disabled
                          placeholder="Cena"
                          className="h-14 w-full rounded-2xl border border-goldDark/15 bg-gradient-to-b from-[#171717] to-[#111111] px-4 text-sm font-semibold text-goldLight outline-none disabled:cursor-not-allowed disabled:opacity-100 disabled:text-goldLight"
                        />
                      </div>
                    </div>

                    {/* Akcia */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 md:hidden">
                        Akcia
                      </label>
                      <input
                        type="text"
                        value={item.sale}
                        disabled
                        placeholder="Akcia"
                        title="Akcia"
                        className="h-14 w-full rounded-2xl border border-white/8 bg-[#121212] px-4 text-sm font-medium text-white/70 outline-none disabled:cursor-not-allowed disabled:opacity-100 disabled:text-white/70"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 flex flex-col gap-4 border-t border-white/6 pt-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-white/75">
                  Spolu pripravených položiek:{" "}
                  <span className="text-goldLight">{treatments.length}</span>
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Zatiaľ len vizuálny návrh bez logiky a bez napojenia.
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-goldDark/40 bg-gradient-to-r from-goldDark via-goldLight to-goldDark px-6 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(212,175,55,0.25)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(212,175,55,0.35)] active:scale-[0.99] hover:cursor-pointer"
              >
                Uložiť dizajn
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
