/**
 * @class Info
 * @classdesc A kiválasztott Pokemon adatait megjelenítő és a játékot indító gombot kezelő osztály.
 */
export default class Info {
  /**
   * A kiválasztott Pokemon összes adata.
   * @private
   * @type {Object}
   */
  #obj = {};

  /**
   * Létrehozza az információs panelt.
   * @param {Object} obj - A Pokemon adatai.
   * @param {HTMLElement} szuloElem - A DOM elem, ahová a html generálódik.
   */
  constructor(obj = {}, szuloElem) {
    this.#obj = obj;
    this.szuloElem = szuloElem;
    this.szuloElem.innerHTML = "";
    this.megjelenit();
    this.esemenykezelo();
  }

  /**
   * Összeállítja és beszúrja a HTML kódot a szülő elembe.
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
   * Beállítja a gomb kattintás eseményét, ami elindítja a 'jatekInditas' egyedi eseményt.
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