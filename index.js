import Info from "./Info.js";
import Pokemon from "./Pokemon.js";
import Services from "./Services.js";

const taroloELEM = document.querySelector(".pokemon-tarolo");
const adatELEM = document.querySelector(".adatok");


const services = new Services();

for (let i = 1; i <= 1028; i++) {
    services.getAdat(`https://pokeapi.co/api/v2/pokemon/${i}`, kepMegjelenit);
}

function kepMegjelenit(data) {
 
    new Pokemon(data, taroloELEM);
}

window.addEventListener("kattintas", function(event) {
    new Info(event.detail, adatELEM);
});