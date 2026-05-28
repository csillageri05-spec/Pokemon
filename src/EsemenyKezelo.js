/**
 * @class EsemenyKezelo
 * @classdesc A billentyűzet eseményeit figyelő és rögzítő osztály.
 */
export default class EsemenyKezelo {
  /**
   * @private
   * @type {Object}
   * @description A lenyomott gombokat tároló objektum. A kulcs a gomb neve, az érték egy boolean.
   */
  #gombok;

  /**
   * Létrehozza az EsemenyKezelo példányt és elinditja az eseményfigyelőket.
   */
  constructor() {
    this.#gombok = {};
    this.#esemenykezelok();
  }

  /**
   * @private
   * @description Beállitja a 'keydown' es 'keyup' eseményfigyelőket az ablakra .
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
   * Visszaadja az éppen lenyomott gombok állapotát.
   * @returns {Object} A gombok állapotát tartalmazó objektum.
   */
  gombokLekerdezese() {
    return this.#gombok;
  }
}