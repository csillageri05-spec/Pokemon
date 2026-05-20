export default class Info {
  #obj = {};

  constructor(obj = {}, szuloElem) {
    this.#obj = obj;
    this.szuloElem = szuloElem;
    this.szuloElem.innerHTML = "";
    this.megjelenit();
  }

  megjelenit() {
    let kod = `
        <div>
            <h1 class="adatok">Name: ${this.#obj.name}</h1>
            <h3>Type: <span class="adatok">${this.#obj.types[0].type.name}</span></h3>
        </div>
        `;

    this.szuloElem.insertAdjacentHTML("beforeend", kod);
  }
}
