/**
 * @class Pokemon
 * @classdesc Egyetlen Pokemon kiskepet es a hozza tartozo kivalasztasi esemenyt kezelo osztaly.
 */
export default class Pokemon {
  /**
   * A Pokemon adatai.
   * @private
   * @type {Object}
   */
  #obj = {};

  /**
   * A sorszam vagy index tarolasa.
   * @private
   * @type {number}
   */
  #index = 0;

  /**
   * Letrehozza a Pokemon kartyat a feluleten.
   * @param {Object} obj - A Pokemon osszes adatat tartalmazo objektum.
   * @param {HTMLElement} szuloElem - A tarolo DOM elem.
   */
  constructor(obj = {}, szuloElem) {
    this.#obj = obj;
    this.szuloElem = szuloElem;
    this.megjelenit();
    this.esemenykezelo();
  }

  /**
   * Legeneralja a kepet tartalmazo HTML strukturat.
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
   * Beallitja a kattintas esemenyfigyelot az eppen letrehozott kepre.
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
