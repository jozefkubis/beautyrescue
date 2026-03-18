import ExpandTextLG from "../../ExpandTextLG"

export default function Oxygeneo() {
  return (
    <div>
      <div className="space-y-4">
        <ExpandTextLG>
          <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
            <p className="text-gray-700 leading-8">
              Okysličenie pleti zlepšuje bunkový rast a bunkovú biosyntézu,
              stimuluje proliferáciu fibroblastov a diferenciáciu
              keratinocytov.. osvieži/oživí 🙂
            </p>

            <p className="text-gray-700 leading-8">
              Oxygeneo je neinvazívne kozmetické ošetrenie, ktoré dodá pleti
              kyslík jedinečným spôsobom, využíva totiž Bohrov efekt (závislosť
              saturácie hemoglobínu kyslíkom od koncentrácie CO2 , pH a teploty
              tkanív) – „prekysličuje pleť zvnútra“.
            </p>

            <div>
              <p className="text-gray-700 leading-8">
                Ošetrenie prebieha v niekoľkých náväzných krokoch:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>-exfoliácia odumretých buniek,</strong>
                </li>
                <li>
                  <strong>-infúzia aktívnych látok</strong> do pleti
                  prostredníctvo 2 typov gélov – NeoRevive (pre suchšiu pleť a
                  omladenie) alebo NeoBright (pre mastnejšiu pleť a
                  rozjasnenie),
                </li>
                <li>
                  <strong>-rádiofrekvencia</strong> (spolu s exfoliáciou
                  podnecuje fibroblasty ku kolagenoneogenéze).
                </li>
              </ul>
              <p className="text-xs mt-2">
                (čítajte viac na:{" "}
                <a
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5774907/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-redDark hover:underline font-semibold"
                >
                  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5774907/
                </a>
                )
              </p>
            </div>

            <p className="text-gray-700 leading-8">
              Výsledkom je jemnejšia a svieža dokysličená dovýživená pleť,
              zmiernenie unavených vačkov pod očami, redukcia farebných
              nejednotností a rozšírených pórov.
            </p>
          </div>
        </ExpandTextLG>
      </div>
    </div>
  )
}
