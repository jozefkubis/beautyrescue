/**
 * === KATEGÓRIA: Loading Spinner ===
 * Veľký fullscreen loading spinner pre zobrazenie nachádzaného stavu
 * Štýlovanie je v globals.css - .spinner trieda
 */

/**
 * Spinner komponenta - rotating loader
 * Využíva sa pri nachádzaní celej stránky alebo sekcie
 * @component
 * @returns {ReactElement} Spinning animation element
 * @example
 * <Spinner />
 */
function Spinner() {
  return <div className="spinner"></div>
}

export default Spinner
