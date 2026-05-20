export default class Service {
  static getPokemon(id, callback) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokemon nem található");
        }
        return response.json();
      })
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
