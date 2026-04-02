import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

type SectionNavigationProps = {
  sections: number[] | string[];
  index: number;
  setIndex: (index: number) => void;
  numberOfSections: number;
};

export default function SectionNavigation({
  sections,
  index,
  setIndex,
  numberOfSections,
}: SectionNavigationProps) {
  function handleIndexChange(newIndex: number) {
    if (newIndex < 1) {
      setIndex(1);
    } else if (newIndex > numberOfSections) {
      setIndex(numberOfSections);
    } else {
      setIndex(newIndex);
    }
  }

  return (
    <div className="rounded-2xl border border-goldDark/10 bg-[#fffaf5] p-3 sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          title="Previous section"
          onClick={() => handleIndexChange(index - 1)}
          disabled={index === 1}
          aria-label="Predchádzajúca sekcia"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-goldDark/20 bg-white text-goldDark transition hover:bg-[#fff6ee] hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40 hover:cursor-pointer disabled:hover:bg-white"
        >
          <IoIosArrowDropleftCircle className="text-2xl" />
        </button>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/70">
            Sekcia {index} z {numberOfSections}
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            {sections.map((step, idx) => (
              <span
                key={idx}
                className={`h-2.5 rounded-full transition-all ${
                  index === idx + 1 ? "w-7 bg-goldDark" : "w-2.5 bg-goldDark/25"
                }`}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          title="Next section"
          onClick={() => handleIndexChange(index + 1)}
          disabled={index === numberOfSections}
          aria-label="Ďalšia sekcia"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-goldDark/20 bg-white text-goldDark transition hover:bg-[#fff6ee] hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40 hover:cursor-pointer disabled:hover:bg-white"
        >
          <IoIosArrowDroprightCircle className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
