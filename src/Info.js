/**
 * @class Info
 * @classdesc A kivalasztott Pokemon adatait megjelenito es a jatekot indito gombot kezelo osztaly.
 */
export default class Info {
  /**
   * A kivalasztott Pokemon osszes adata.
   * @private
   * @type {Object}
   */
  #obj = {};

  /**
   * Letrehozza az informacios panelt.
   * @param {Object} obj - A Pokemon adatai.
   * @param {HTMLElement} szuloElem - A DOM elem, ahova a html generalodik.
   */
  constructor(obj = {}, szuloElem) {
    this.#obj = obj;
    this.szuloElem = szuloElem;
    this.szuloElem.innerHTML = "";
    this.megjelenit();
    this.esemenykezelo();
  }

  /**
   * Osszeallitja es beszurja a HTML kodot a szulo elembe.
   */
  megjelenit() {
    let kod = `
        <div>
            <h1 class="adatok">Name: ${this.#obj.name}</h1>
            <h3>Type: <span class="adatok">${this.#obj.types[0].type.name}</span></h3>
            <button id="jatek-start-gomb" style="margin-top: 15px; padding: 10px; cursor: pointer;">Játék Indítása</button>
        </div>
        `;

    this.szuloElem.insertAdjacentHTML("beforeend", kod);
  }

  /**
   * Beallitja a gomb kattintas esemenyet, ami elsuti a 'jatekInditas' egyedi esemenyt.
   */
  esemenykezelo() {
    const gomb = this.szuloElem.querySelector("#jatek-start-gomb");
    if (gomb) {
      gomb.addEventListener("click", () => {
        const e = new CustomEvent("jatekInditas", { detail: this.#obj.sprites.front_default });
        window.dispatchEvent(e);
      });
    }
  }
}