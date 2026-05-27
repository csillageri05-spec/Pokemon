/**
 * @class EsemenyKezelo
 * @classdesc A billentyuzet esemenyeit (gombnyomasokat) figyelo es rogzito osztaly.
 */
export default class EsemenyKezelo {
  /**
   * @private
   * @type {Object}
   * @description A lenyomott gombokat tarolo objektum. A kulcs a gomb neve, az ertek egy boolean.
   */
  #gombok;

  /**
   * Letrehozza az EsemenyKezelo peldanyt es elinditja az esemenyfigyeloket.
   */
  constructor() {
    this.#gombok = {};
    this.#esemenykezelok();
  }

  /**
   * @private
   * @description Beallitja a 'keydown' es 'keyup' esemenyfigyeloket az ablakra (window).
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
   * Visszaadja az eppen lenyomott gombok allapotat.
   * @returns {Object} A gombok allapotat tartalmazo objektum.
   */
  gombokLekerdezese() {
    return this.#gombok;
  }
}