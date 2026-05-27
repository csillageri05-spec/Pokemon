/**
 * @file index.js
 * @description A fo belepesi pont, amely felelos a komponensek osszekoteseert es a jatek inditasaert.
 */

import Info from "./Info.js";
import Pokemon from "./Pokemon.js";
import Services from "./Services.js";
import JatekTer from "./JatekTer.js";

const taroloELEM = document.querySelector(".pokemon-tarolo");
const adatELEM = document.querySelector(".adatok");
const jatekterELEM = document.querySelector(".jatekter");

const services = new Services();

// Lekeri a Pokemonokat az API-rol
for (let i = 1; i <= 1028; i++) {
    services.getAdat(`https://pokeapi.co/api/v2/pokemon/${i}`, kepMegjelenit);
}

/**
 * Peldanyosit egy uj Pokemon objektumot a kapott adatokbol.
 * @param {Object} data - A fetch API altal visszaadott Pokemon adat.
 */
function kepMegjelenit(data) {
    new Pokemon(data, taroloELEM);
}

// Figyeli a Pokemon kivalasztasakor elsulo egyedi esemenyt
window.addEventListener("kattintas", function(event) {
    new Info(event.detail, adatELEM);
});

// Figyeli a jatek inditasat kero egyedi esemenyt, majd atvalt a jatekter nezere
window.addEventListener("jatekInditas", function(event) {
    document.querySelector(".pokemon-tarolo").style.display = "none";
    document.querySelector(".adatok").style.display = "none";
    document.querySelector(".gombok").style.display = "none";
    
    jatekterELEM.style.display = "block";
    
    const jatek = new JatekTer(jatekterELEM, event.detail);
    jatek.inditas();
});