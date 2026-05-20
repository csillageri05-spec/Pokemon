import PokemonService from "./Services.js";
import Pokemon from "./Pokemon.js";
import Info from "./Info.js";

const article = document.querySelector("article");
const section = document.querySelector("section");

PokemonService.getPokemon(12, (pokemonData) => {
  new Pokemon(pokemonData, article);
});

document.addEventListener("pokemonSelected", (e) => {
  new Info(section, e.detail);
});
