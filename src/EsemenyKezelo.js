/**
 * @class EsemenyKezelo
 * @classdesc A billentyűzet eseményeit (gombnyomásokat) figyelő és állapotukat rögzítő osztály.
 */
export default class EsemenyKezelo {
  /**
   * @private
   * @type {Object<string, boolean>}
   * @description A lenyomott gombokat tároló objektum.
   */
  #gombok;

  /**
   * Létrehozza az EsemenyKezelo példányt és elindítja a figyelőket.
   */
  constructor() {
    this.#gombok = {};
    this.#esemenykezelok();
  }

  /**
   * @private
   * @description Beállítja a 'keydown' és 'keyup' eseményfigyelőket.
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
   * Visszaadja a jelenleg lenyomott gombok állapotát.
   * @returns {Object<string, boolean>}
   */
  gombokLekerdezese() {
    return this.#gombok;
  }
}