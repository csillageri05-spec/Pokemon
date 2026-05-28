/**
 * @class Pokemon
 * @classdesc Egyetlen Pokemon kisképet és a hozzá tartozó kiválasztási eseményt kezelő osztály.
 */
export default class Pokemon {
  /**
   * A Pokemon adatai.
   * @private
   * @type {Object}
   */
  #obj = {};

  /**
   * A sorszám vagy index tárolása.
   * @private
   * @type {number}
   */
  #index = 0;

  /**
   * Létrehozza a Pokemon kártyát a felületen.
   * @param {Object} obj - A Pokemon összes adatat tartalmazó objektum.
   * @param {HTMLElement} szuloElem - A tároló DOM elem.
   */
  constructor(obj = {}, szuloElem) {
    this.#obj = obj;
    this.szuloElem = szuloElem;
    this.megjelenit();
    this.esemenykezelo();
  }

  /**
   * Legenerálja a képet tartalmazo HTML struktúrát.
   */
  megjelenit() {
    let kod = `
        <div class="kep">
            <img src="${this.#obj.sprites.front_default}" alt="${this.#obj.name}">
        </div>
        `;
    this.szuloElem.insertAdjacentHTML("beforeend", kod);
  }

  /**
   * Beállítja a kattintas esemenyfigyelot az eppen letrehozott kepre.
   */
  esemenykezelo() {
    const kepElem = this.szuloElem.querySelector(".kep:last-child img");
    kepElem.addEventListener("click", () => {
      this.sajatesemeny();
    });
  }

  /**
   * Elsut egy 'kattintas' nevu egyedi esemenyt az ablakon (window) a Pokemon adataival.
   */
  sajatesemeny() {
    const e = new CustomEvent("kattintas", { detail: this.#obj });
    window.dispatchEvent(e);
  }
}
