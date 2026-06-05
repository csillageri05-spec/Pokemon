/**
 * @class Pokemon
 * @classdesc Egyetlen Pokémon kisképet és a hozzá tartozó kiválasztási eseményt kezelő osztály a választó menüben.
 */
export default class Pokemon {
  /**
   * @private
   * @type {Object}
   * @description A Pokémon összes adatát tartalmazó objektum, amit az API visszaadott.
   */
  #obj = {};

  /**
   * Létrehozza a Pokémon kártyát a felületen és beállítja az eseményfigyelőt.
   * * @param {Object} [obj={}] - A Pokémon adatait tartalmazó objektum.
   * @param {HTMLElement} szuloElem - A DOM elem, ahová a Pokémon kisképe generálódik.
   */
  constructor(obj = {}, szuloElem) {
    this.#obj = obj;
    this.szuloElem = szuloElem;
    this.megjelenit();
    this.esemenykezelo();
  }

  /**
   * Legenerálja a képet tartalmazó HTML struktúrát és hozzáfűzi a szülő elemhez.
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
   * Beállítja a kattintás eseményfigyelőt az éppen létrehozott képre.
   */
  esemenykezelo() {
    const kepElem = this.szuloElem.querySelector(".kep:last-child img");
    kepElem.addEventListener("click", () => {
      this.sajatesemeny();
    });
  }

  /**
   * Elsüt egy 'kattintas' nevű egyedi eseményt a globális `window` objektumon, 
   * átadva a kiválasztott Pokémon adatait.
   */
  sajatesemeny() {
    const e = new CustomEvent("kattintas", { detail: this.#obj });
    window.dispatchEvent(e);
  }
}