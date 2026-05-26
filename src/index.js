import Info from "./Info.js";
import Pokemon from "./Pokemon.js";
import Services from "./Services.js";
import JatekTer from "./JatekTer.js";

const taroloELEM = document.querySelector(".pokemon-tarolo");
const adatELEM = document.querySelector(".adatok");
const jatekterELEM = document.querySelector(".jatekter");

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

window.addEventListener("jatekInditas", function(event) {
    document.querySelector(".pokemon-tarolo").style.display = "none";
    document.querySelector(".adatok").style.display = "none";
    document.querySelector(".gombok").style.display = "none";
    
    jatekterELEM.style.display = "block";
    
    const jatek = new JatekTer(jatekterELEM, event.detail);
    jatek.inditas();
});