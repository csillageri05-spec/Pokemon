/**
 * @file index.js
 * @description A fő belépési pont.
 */

import Info from "./Info.js";
import Pokemon from "./Pokemon.js";
import Services from "./Services.js";
import JatekTer from "./JatekTer.js";

const taroloELEM = document.querySelector(".pokemon-tarolo");
const adatELEM = document.querySelector(".adatok");
const adatELEM2 = document.querySelector(".adatok2");
const jatekterELEM = document.querySelector(".jatekter");

const foKepernyoELEM = document.getElementById("fo-kepernyo");
const temaSelect = document.getElementById("tema-select");
const kilepesGomb = document.getElementById("kilepes-gomb");

const services = new Services();
let aktualisJatek = null; 

// Első generációs Pokémonok lekérése (1-151)
for (let i = 1; i <= 151; i++) {
    services.getAdat(`https://pokeapi.co/api/v2/pokemon/${i}`, kepMegjelenit);
}

/**
 * @param {Object} data 
 */
function kepMegjelenit(data) {
    new Pokemon(data, taroloELEM);
}

window.addEventListener("kattintas", function(event) {
    new Info(event.detail, adatELEM, adatELEM2);
});

window.addEventListener("jatekInditas", function(event) {
    foKepernyoELEM.style.display = "none";
    jatekterELEM.style.display = "block";
    
    const valasztottTema = temaSelect.value;
    aktualisJatek = new JatekTer(jatekterELEM, event.detail, valasztottTema);
    aktualisJatek.inditas();
});

kilepesGomb.addEventListener("click", () => {
    if (aktualisJatek) {
        aktualisJatek.leallitas();
        
        const takaritandoElemek = jatekterELEM.querySelectorAll('img, div[style*="position: absolute"]:not(#jatek-ui)');
        takaritandoElemek.forEach(elem => elem.remove());
    }
    
    jatekterELEM.style.display = "none";
    foKepernyoELEM.style.display = "block";
});