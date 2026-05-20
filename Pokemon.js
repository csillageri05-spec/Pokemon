
export default class Pokemon {
  #data;
  #container;

  constructor(data, container) {
    this.#data = data;
    this.#container = container;
    this.render();
  }

  render() {
    const img = document.createElement("img");
    img.src = this.#data.sprites.front_default;
    img.alt = this.#data.name;
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      const event = new CustomEvent("pokemonSelected", {
        detail: {
          name: this.#data.name,
          order: this.#data.order,
          types: this.#data.types.map(t => t.type.name)
        }
      });

      document.dispatchEvent(event);
    });

    this.#container.appendChild(img);
  }
}