export default function EcgLine() {
  const butterflyPath = "/images/butterfly.png" // cesta k obrázku motýľa

  // FARBA ČIARY/TEXTU
  const strokeColorHex = "var(--color-goldDark)"
  const strokeColorClass = "stroke-[var(--color-goldDark)]"
  const textColorClass = "fill-[var(--color-goldDark)]"

  // HRÚBKA ČIARY (Tailwind class)
  const strokeWidthClass = "stroke-[1]"

  // CELKOVÝ ČAS JEDNEJ SLUČKY ANIMÁCIE
  const cycleDuration = "8s"

  // NÁPIS SA ODKRÝVA PO PÍSMENÁCH
  const brandText = "BEAUTY RESCUE".split("")
  const textStart = 0.2
  const textStep = 0.03
  const letterFadeDuration = 0.03
  const textStartX = 178

  return (
    <div className="relative mx-auto h-40 w-full">
      <svg viewBox="0 0 1000 200" className="w-full">
        {/* DEFINÍCIE: glow pre text + gradient pre EKG */}
        <defs>
          {/* jemný glow pre nápis */}
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* zlatý gradient EKG, ktorý sa na konci viac rozsvieti */}
          <linearGradient id="ekg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={strokeColorHex} stopOpacity="0.15">
              <animate
                attributeName="stop-opacity"
                values="0;0.15;0.3"
                keyTimes="0;0.7;1"
                dur={cycleDuration}
                fill="freeze"
              />
            </stop>
            <stop offset="50%" stopColor={strokeColorHex} stopOpacity="0.35">
              <animate
                attributeName="stop-opacity"
                values="0;0.35;0.7"
                keyTimes="0;0.7;1"
                dur={cycleDuration}
                fill="freeze"
              />
            </stop>
            <stop offset="100%" stopColor={strokeColorHex} stopOpacity="0.2">
              <animate
                attributeName="stop-opacity"
                values="0;0.2;0.4"
                keyTimes="0;0.7;1"
                dur={cycleDuration}
                fill="freeze"
              />
            </stop>
          </linearGradient>
        </defs>

        {/* 1) ROVNÁ LÍNIA ZĽAVA */}
        <path
          pathLength={180}
          className={`fill-none ${strokeColorClass} ${strokeWidthClass} [stroke-dasharray:180] [stroke-dashoffset:180]`}
          d="M0,100 L180,100"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="180;0;0"
            keyTimes="0;0.2;1"
            dur={cycleDuration}
            repeatCount="1"
            fill="freeze"
          />
        </path>

        {/* 2) NÁPIS NA BASELINE, PÍSMENÁ IDÚ PO PORADÍ + GLOW */}
        <text
          x={String(textStartX)}
          y="100"
          textAnchor="start"
          filter="url(#text-glow)" // jemný zlatý glow
          className={`${textColorClass} text-xl font-semibold tracking-[0.08em]`}
        >
          {brandText.map((char, index) => {
            const revealAt = textStart + index * textStep
            const revealEnd = Math.min(revealAt + letterFadeDuration, 0.99)
            const keyTimes = `0;${revealAt.toFixed(3)};${revealEnd.toFixed(
              3,
            )};1`

            return (
              <tspan
                key={`${char}-${index}`}
                opacity="0"
                y="75" // začína vyššie nad baseline
              >
                {char === " " ? "\u00A0" : char}

                {/* Fade in */}
                <animate
                  attributeName="opacity"
                  values="0;0;1;1"
                  keyTimes={keyTimes}
                  dur={cycleDuration}
                  repeatCount="1"
                  fill="freeze"
                />

                {/* Jemný pád zhora pomocou y */}
                <animate
                  attributeName="y"
                  values="75;75;100;100"
                  keyTimes={keyTimes}
                  dur={cycleDuration}
                  repeatCount="1"
                  fill="freeze"
                />
              </tspan>
            )
          })}
        </text>

        {/* MOTÝĽ ZA POSLEDNÝM "E" – pád + flutter */}
        <image
          href={butterflyPath}
          x="354"
          y="84"
          width="32"
          height="32"
          opacity="0"
        >
          {/* tvoje pôvodné časovanie fade-in */}
          <animate
            attributeName="opacity"
            values="0;0;1;1"
            keyTimes="0;0.55;0.58;1"
            dur={cycleDuration}
            repeatCount="1"
            fill="freeze"
          />

          {/* pád / posun – ak chceš opačný smer, vieš si doladiť values */}
          <animate
            attributeName="y"
            values="84;84;74;74"
            keyTimes="0;0.55;0.58;1"
            dur={cycleDuration}
            repeatCount="1"
            fill="freeze"
          />

          {/* jemný flutter po dosadnutí – mikro pohyb hore/dole */}
          {/* <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -1.5; 0 1.5; 0 0"
            begin="6s" // začne až ku koncu cyklu, keď už všetko sedí
            dur="1.5s"
            repeatCount="indefinite"
          /> */}
        </image>

        {/* 3) PRAVÁ EKG ČASŤ – kreslenie + rozsvietený gradient */}
        <path
          pathLength={700}
          className={`fill-none ${strokeWidthClass} [stroke-dasharray:700] [stroke-dashoffset:700]`}
          stroke="url(#ekg-gradient)" // namiesto plain farby použijeme gradient
          d="
            M376,100
            L450,100
            L470,100
            C478,100 485,92 492,92
            C497,92 500,100 506,100
            L516,100
            L524,104
            L528,54
            L532,116
            L536,100
            L570,100
            C582,100 590,84 598,84
            C606,84 614,100 626,100
            L650,100
            L670,100
            C678,100 685,92 692,92
            C697,92 700,100 706,100
            L716,100
            L724,104
            L728,54
            L732,116
            L736,100
            L770,100
            C782,100 790,84 798,84
            C806,84 814,100 826,100
            L850,100
            L870,100
            C878,100 885,92 892,92
            C897,92 900,100 906,100
            L916,100
            L924,104
            L928,54
            L932,116
            L936,100
            L1000,100
          "
        >
          <animate
            attributeName="stroke-dashoffset"
            values="700;700;700;0;0"
            keyTimes="0;0.595;0.62;0.97;1"
            dur={cycleDuration}
            repeatCount="1"
            fill="freeze"
          />
        </path>
      </svg>
    </div>
  )
}
