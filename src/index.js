/**
 * @file index.js
 * @description A fő belépesi pont, amely felelős a komponensek összekötéséért es a játék indításáért.
 */

import Info from "./Info.js";
import Pokemon from "./Pokemon.js";
import Services from "./Services.js";
import JatekTer from "./JatekTer.js";

const taroloELEM = document.querySelector(".pokemon-tarolo");
const adatELEM = document.querySelector(".adatok");
const jatekterELEM = document.querySelector(".jatekter");

const services = new Services();

// Lekéri a Pokemonokat az API-rol
for (let i = 1; i <= 1028; i++) {
    services.getAdat(`https://pokeapi.co/api/v2/pokemon/${i}`, kepMegjelenit);
}

/**
 * Példányosít egy új Pokemon objektumot a kapott adatokbol.
 * @param {Object} data - A fetch API által visszaadott Pokemon adat.
 */
function kepMegjelenit(data) {
    new Pokemon(data, taroloELEM);
}

// Figyeli a Pokemon kiválasztásakor induló egyedi eseményt
window.addEventListener("kattintas", function(event) {
    new Info(event.detail, adatELEM);
});

// Figyeli a játék indítását kérő egyedi eseményt, majd átvált a játéktér nézetre
window.addEventListener("jatekInditas", function(event) {
    document.querySelector(".pokemon-tarolo").style.display = "none";
    document.querySelector(".adatok").style.display = "none";
    document.querySelector(".gombok").style.display = "none";
    
    jatekterELEM.style.display = "block";
    
    const jatek = new JatekTer(jatekterELEM, event.detail);
    jatek.inditas();
});