/**
 * @class Jatekos
 * @classdesc A játékost (Pokemont) irányító, pozícióját és megjelenítését kezelő osztály.
 */
export default class Jatekos {
  /**
   * Aktuális X pozíció.
   * @private
   * @type {number}
   */
  #x = 0;

  /**
   * Aktuális Y pozíció.
   * @private
   * @type {number}
   */
  #y = 0;

  /**
   * A karakter szélessége.
   * @private
   * @type {number}
   */
  #szelesseg = 0;

  /**
   * A karakter magassága.
   * @private
   * @type {number}
   */
  #magassag = 0;

  /**
   * A mozgási sebesség.
   * @private
   * @type {number}
   */
  #sebesseg = 0;

  /**
   * A játekost képező kép elem.
   * @private
   * @type {HTMLImageElement}
   */
  #elem;

  /**
   * Inicializálja a játékost és létrehozza a hozzá tartozó képet a DOM-ban.
   * @param {number} x - Kezdő X pozíció.
   * @param {number} y - Kezdő Y pozíció.
   * @param {number} szelesseg - Karakter szélessége.
   * @param {number} magassag - Karakter magassága.
   * @param {number} sebesseg - Mozgási sebesség.
   * @param {HTMLElement} szuloElem - A DOM elem, ahová a játékos kerül.
   * @param {string} kepUrl - A megjelenítendő Pokemon képenek elérési útja.
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

  /** @returns {number} X pozíció. */
  get x() { return this.#x; }
  /** @returns {number} Y pozíció. */
  get y() { return this.#y; }
  /** @returns {number} Szélesség. */
  get szelesseg() { return this.#szelesseg; }
  /** @returns {number} Magasság. */
  get magassag() { return this.#magassag; }

  /**
   * Kiszámolja az új koordinátákat a lenyomott gombok és a pálya határai alapján.
   * @param {Object} gombok - A lenyomott gombokat tartalmazó objektum.
   * @param {Object} jatekMeret - A játéktér méreteit tartalmazó objektum.
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
   * Frissíti a játekos DOM elemeinek helyzetét a képernyőn.
   */
  kirajzolas() {
    this.#elem.style.left = `${this.#x}px`;
    this.#elem.style.top = `${this.#y}px`;
  }
}