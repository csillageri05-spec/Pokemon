/**
 * @class EsemenyKezelo
 * @classdesc A billentyűzet eseményeit (gombnyomásokat) figyelő és állapotukat rögzítő osztály.
 */
export default class EsemenyKezelo {
  /**
   * @private
   * @type {Object<string, boolean>}
   * @description A lenyomott gombokat tároló objektum. A kulcs a gomb neve (pl. 'ArrowUp'), az érték egy logikai igaz/hamis.
   */
  #gombok;

  /**
   * Létrehozza az EsemenyKezelo példányt és elindítja a globális eseményfigyelőket.
   */
  constructor() {
    this.#gombok = {};
    this.#esemenykezelok();
  }

  /**
   * @private
   * @description Beállítja a 'keydown' és 'keyup' eseményfigyelőket az ablakra (window).
   */
  #esemenykezelok() {
    window.addEventListener("keydown", (e) => {
      this.#gombok[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.#gombok[e.key] = false;
    });
  }

  /**
   * Visszaadja a jelenleg lenyomott gombok aktuális állapotát.
   * * @returns {Object<string, boolean>} A gombok állapotát tartalmazó objektum.
   */
  gombokLekerdezese() {
    return this.#gombok;
  }
}