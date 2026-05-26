export default class EsemenyKezelo {
  #gombok;

  constructor() {
    this.#gombok = {};
    this.#esemenykezelok();
  }

  #esemenykezelok() {
    window.addEventListener("keydown", (e) => {
      this.#gombok[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.#gombok[e.key] = false;
    });
  }

  gombokLekerdezese() {
    return this.#gombok;
  }
}
