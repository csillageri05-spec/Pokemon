/**
 * @class Info
 * @classdesc A kiválasztott Pokémon adatait megjelenítő és a játékot indító gombot kezelő osztály.
 */
export default class Info {
  /**
   * @private
   * @type {Object}
   * @description A kiválasztott Pokémon összes adata.
   */
  #obj = {};

  /**
   * Létrehozza az információs panelt és a játék indítása gombot.
   * * @param {Object} [obj={}] - A kiválasztott Pokémon adatai.
   * @param {HTMLElement} szuloElem - A DOM elem, ahová az adatok HTML kódja generálódik.
   */
  constructor(obj = {}, szuloElem) {
    this.#obj = obj;
    this.szuloElem = szuloElem;
    this.szuloElem.innerHTML = "";
    this.megjelenit();
    this.esemenykezelo();
  }

  /**
   * Összeállítja és beszúrja az adatokat, valamint az indító gombot a szülő elembe.
   */
  megjelenit() {
    let kod = `
        <div>
            <h1 class="adatok">Name: ${this.#obj.name}</h1>
            <h3>Type: <span class="adatok">${this.#obj.types[0].type.name} <br> </span></h3>
            <h3>Second type: <span class="adatok2">${this.#obj.types[1]?.type.name || "None"}</span></h3>
            
            <button id="jatek-start-gomb" style="margin-top: 15px; padding: 10px; cursor: pointer; font-family: inherit;">Játék Indítása</button>
        </div>
        `;
    this.szuloElem.insertAdjacentHTML("beforeend", kod);
  }

  /**
   * Beállítja a gomb kattintás eseményét, ami elindítja a 'jatekInditas' egyedi eseményt a kép URL-jével.
   */
  esemenykezelo() {
    const gomb = this.szuloElem.querySelector("#jatek-start-gomb");
    if (gomb) {
      gomb.addEventListener("click", () => {
        const e = new CustomEvent("jatekInditas", {
          detail: this.#obj.sprites.front_default,
        });
        window.dispatchEvent(e);
      });
    }
  }
}