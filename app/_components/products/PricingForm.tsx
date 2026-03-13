"use client"

type Treatment = {
  id: number
  treatment: string
  price: string
  sale: string
}

type PricingFormProps = {
  title: string
  treatments: Treatment[]
  isAdmin?: boolean
}

export default function PricingForm({
  title,
  treatments,
  isAdmin: initialIsAdmin = false,
}: PricingFormProps) {
  const isAdmin = initialIsAdmin

  return (
    <section className="w-full px-4">
      <div className="mx-auto w-full max-w-5xl">
        <div className="overflow-hidden rounded-[30px] border border-goldDark/35 bg-linear-to-br from-white via-[#fff8f1] to-[#fff2e5] section-shell">
          <div className="border-b border-goldDark/20 bg-linear-to-r from-goldLight/18 via-transparent to-redMain/10 px-6 py-6 md:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 inline-flex w-fit rounded-full border border-redMain/25 bg-redMain/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-redDark">
                  Cenník procedúr
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-700 2xl:text-3xl">
                  {title}
                </h2>
              </div>
            </div>
          </div>

          <form className="p-4 md:p-6">
            <div className="mb-3 hidden grid-cols-[1.8fr_0.6fr_0.5fr] gap-3 rounded-2xl border border-goldDark/20 bg-white/70 px-4 py-3 md:grid">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500/70">
                Ošetrenie
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500/70">
                Cena
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500/70">
                Akcia
              </span>
            </div>

            <div className="space-y-3 text-sm 2xl:text-lg">
              {treatments.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-2xl border border-goldDark/20 bg-white/82 p-3 transition-all duration-300 hover:border-redMain/35 hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.8fr_0.6fr_0.5fr]">
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold uppercase tracking-[0.14em] text-gray-500/50 md:hidden">
                        Ošetrenie
                      </label>
                      <input
                        type="text"
                        value={item.treatment}
                        readOnly
                        aria-label="Ošetrenie"
                        className="h-12 2xl:h-14 w-full rounded-2xl border border-goldDark/20 bg-[#fffaf5] px-4  text-gray-700 outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold uppercase tracking-[0.14em] text-gray-500/50 md:hidden">
                        Cena
                      </label>
                      <input
                        type="text"
                        value={item.price}
                        readOnly
                        aria-label="Cena"
                        className="h-12 2xl:h-14 w-full rounded-2xl border border-goldDark/30 bg-linear-to-b from-[#fff7e8] to-[#fff1d4] px-4 font-semibold text-goldDark outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold uppercase tracking-[0.14em] text-gray-500/50 md:hidden">
                        Akcia
                      </label>
                      <input
                        type="text"
                        value={item.sale}
                        readOnly
                        aria-label="Akcia"
                        className="h-12 2xl:h-14 w-full rounded-2xl border border-redMain/25 bg-[#fff5f6] px-4 font-semibold text-redDark outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isAdmin && (
              <div className="mt-6 flex flex-col gap-4 border-t border-goldDark/20 pt-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-medium text-greyMain/85">
                    Počet položiek v cenníku:{" "}
                    <span className="font-semibold text-redDark">
                      {treatments.length}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-redMain/35 bg-linear-to-r from-redMain to-redDark px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(190,18,60,0.26)] transition duration-300 hover:ring-2 hover:ring-goldLight focus:ring-2 focus:ring-goldLight hover:shadow-[0_12px_26px_rgba(190,18,60,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-goldDark/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff5ec] hover:cursor-pointer active:scale-98"
                >
                  Aktualizovať cenník
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
