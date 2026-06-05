/**
 * @class Jatekos
 * @classdesc A játékost (avatart) irányító, pozícióját számoló és megjelenítését kezelő osztály.
 */
export default class Jatekos {
  #x = 0;
  #y = 0;
  #szelesseg = 0;
  #magassag = 0;
  #sebesseg = 0;
  #elem;

  /**
   * Inicializálja a játékost.
   * @param {number} x - Kezdő X pozíció.
   * @param {number} y - Kezdő Y pozíció.
   * @param {number} szelesseg - Karakter szélessége.
   * @param {number} magassag - Karakter magassága.
   * @param {number} sebesseg - Mozgási sebesség.
   * @param {HTMLElement} szuloElem - A DOM elem, ahová a játékos kerül.
   * @param {string} kepUrl - A megjelenítendő Pokémon kép.
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

  get x() { return this.#x; }
  get y() { return this.#y; }
  get szelesseg() { return this.#szelesseg; }
  get magassag() { return this.#magassag; }

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

  kirajzolas() {
    this.#elem.style.left = `${this.#x}px`;
    this.#elem.style.top = `${this.#y}px`;
  }
}