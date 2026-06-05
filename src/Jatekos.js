/**
 * @class Jatekos
 * @classdesc A játékost (avatart) irányító, pozícióját számoló és megjelenítését kezelő osztály.
 */
export default class Jatekos {
  /**
   * @private
   * @type {number}
   * @description Aktuális X pozíció.
   */
  #x = 0;

  /**
   * @private
   * @type {number}
   * @description Aktuális Y pozíció.
   */
  #y = 0;

  /**
   * @private
   * @type {number}
   * @description A karakter szélessége.
   */
  #szelesseg = 0;

  /**
   * @private
   * @type {number}
   * @description A karakter magassága.
   */
  #magassag = 0;

  /**
   * @private
   * @type {number}
   * @description A mozgási sebesség (hány pixelt mozog képkockánként).
   */
  #sebesseg = 0;

  /**
   * @private
   * @type {HTMLImageElement}
   * @description A játékost reprezentáló kép (img) elem a DOM-ban.
   */
  #elem;

  /**
   * Inicializálja a játékost és létrehozza a hozzá tartozó képet a játéktéren.
   * * @param {number} x - Kezdő X pozíció.
   * @param {number} y - Kezdő Y pozíció.
   * @param {number} szelesseg - Karakter szélessége.
   * @param {number} magassag - Karakter magassága.
   * @param {number} sebesseg - Mozgási sebesség.
   * @param {HTMLElement} szuloElem - A DOM elem, ahová a játékos kerül.
   * @param {string} kepUrl - A megjelenítendő Pokémon képének API-ból kapott elérési útja.
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
   * Kiszámolja és frissíti az új koordinátákat a lenyomott gombok és a pálya határai alapján.
   * * @param {Object<string, boolean>} gombok - A lenyomott gombokat tartalmazó objektum.
   * @param {Object} jatekMeret - A játéktér dimenzióit tartalmazó objektum (szelesseg, magassag).
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
   * Frissíti a játékos DOM elemének helyzetét a képernyőn a kiszámolt koordináták alapján.
   */
  kirajzolas() {
    this.#elem.style.left = `${this.#x}px`;
    this.#elem.style.top = `${this.#y}px`;
  }
}