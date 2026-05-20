export default class Pokemon {
  #obj = {};
  #index = 0;

  constructor(obj = {}, szuloElem) {
    this.#obj = obj;
    this.szuloElem = szuloElem;
    this.megjelenit();
    this.esemenykezelo();
  }

  megjelenit() {
    let kod = `
        <div class="kep">
            <img src="${this.#obj.sprites.front_default}" alt="${this.#obj.name}">
        </div>
        `;
    this.szuloElem.insertAdjacentHTML("beforeend", kod);
  }

  esemenykezelo() {
    const kepElem = this.szuloElem.querySelector(".kep:last-child img");
    kepElem.addEventListener("click", () => {
      this.sajatesemeny();
    });
  }

  sajatesemeny() {
    const e = new CustomEvent("kattintas", { detail: this.#obj });
    window.dispatchEvent(e);
  }
}
