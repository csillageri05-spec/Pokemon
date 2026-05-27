/**
 * @class Jatekos
 * @classdesc A jatekost (Pokemont) iranyito, poziciojat es megjeleniteset kezelo osztaly.
 */
export default class Jatekos {
  /**
   * Aktualis X pozicio.
   * @private
   * @type {number}
   */
  #x = 0;

  /**
   * Aktualis Y pozicio.
   * @private
   * @type {number}
   */
  #y = 0;

  /**
   * A karakter szelessege.
   * @private
   * @type {number}
   */
  #szelesseg = 0;

  /**
   * A karakter magassaga.
   * @private
   * @type {number}
   */
  #magassag = 0;

  /**
   * A mozgasi sebesseg (pixel/kocka).
   * @private
   * @type {number}
   */
  #sebesseg = 0;

  /**
   * A jatekost kepezito kep elem.
   * @private
   * @type {HTMLImageElement}
   */
  #elem;

  /**
   * Inicializalja a jatekost es letrehozza a hozza tartozo kepet a DOM-ban.
   * @param {number} x - Kezdo X pozicio.
   * @param {number} y - Kezdo Y pozicio.
   * @param {number} szelesseg - Karakter szelessege.
   * @param {number} magassag - Karakter magassaga.
   * @param {number} sebesseg - Mozgasi sebesseg.
   * @param {HTMLElement} szuloElem - A DOM elem, ahova a jatekos kerul.
   * @param {string} kepUrl - A megjelenitendo Pokemon kepenek eleresi utja.
   */
  constructor(x, y, szelesseg, magassag, sebesseg, szuloElem, kepUrl) {
    this.#x = x;
    this.#y = y;
    this.#szelesseg = szelesseg;
    this.#magassag = magassag;
    this.#sebesseg = sebesseg;

    this.#elem = document.createElement("img");
    this.#elem.src = kepUrl;
    this.#elem.style.position = "absolute";
    this.#elem.style.width = `${this.#szelesseg}px`;
    this.#elem.style.height = `${this.#magassag}px`;
    szuloElem.appendChild(this.#elem);
  }

  /** @returns {number} X pozicio. */
  get x() { return this.#x; }
  /** @returns {number} Y pozicio. */
  get y() { return this.#y; }
  /** @returns {number} Szelesseg. */
  get szelesseg() { return this.#szelesseg; }
  /** @returns {number} Magassag. */
  get magassag() { return this.#magassag; }

  /**
   * Kiszamolja az uj koordinatakat a lenyomott gombok es a palya hatarai alapjan.
   * @param {Object} gombok - A lenyomott gombokat tartalmazo objektum.
   * @param {Object} jatekMeret - A jatekter mereteit (szelesseg, magassag) tartalmazo objektum.
   */
  frissites(gombok, jatekMeret) {
    if ((gombok["ArrowUp"] || gombok["w"]) && this.#y > 0) {
      this.#y -= this.#sebesseg;
    }
    if ((gombok["ArrowDown"] || gombok["s"]) && this.#y < jatekMeret.magassag - this.#magassag) {
      this.#y += this.#sebesseg;
    }
    if ((gombok["ArrowLeft"] || gombok["a"]) && this.#x > 0) {
      this.#x -= this.#sebesseg;
    }
    if ((gombok["ArrowRight"] || gombok["d"]) && this.#x < jatekMeret.szelesseg - this.#szelesseg) {
      this.#x += this.#sebesseg;
    }
  }

  /**
   * Frissiti a jatekos DOM elemeinek helyzetet a kepernyon.
   */
  kirajzolas() {
    this.#elem.style.left = `${this.#x}px`;
    this.#elem.style.top = `${this.#y}px`;
  }
}