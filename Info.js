export default class Info {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <h2>${this.data.name}</h2>
      <p><strong>Order:</strong> ${this.data.order}</p>
      <p><strong>Types:</strong> ${this.data.types.join(", ")}</p>
    `;
  }
}
