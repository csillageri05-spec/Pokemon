/**
 * @file index.js
 * @description A fő belépési pont, amely felelős az osztályok összekötéséért, a főképernyő DOM kezeléséért és a játék életciklusának irányításáért.
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

/**
 * @type {JatekTer|null}
 * @description Referencia a jelenleg futó játék példányra, hogy leállítható legyen kilépéskor.
 */
let aktualisJatek = null; 

// Lekéri az első generációs Pokémonokat (Kanto régió - 151 db)
for (let i = 1; i <= 151; i++) {
    services.getAdat(`https://pokeapi.co/api/v2/pokemon/${i}`, kepMegjelenit);
}

/**
 * Példányosít egy új Pokemon objektumot a kapott adatokból és hozzáadja a listához.
 * * @param {Object} data - A fetch API által visszaadott Pokémon adat JSON formátumban.
 */
function kepMegjelenit(data) {
    new Pokemon(data, taroloELEM);
}

// Figyeli a Pokémon kiválasztásakor induló egyedi eseményt a részletek megjelenítéséhez
window.addEventListener("kattintas", function(event) {
    new Info(event.detail, adatELEM, adatELEM2);
});

// Figyeli a játék indítását kérő egyedi eseményt, elrejti a menüt és átvált a játéktér nézetre
window.addEventListener("jatekInditas", function(event) {
    foKepernyoELEM.style.display = "none";
    jatekterELEM.style.display = "block";
    
    const valasztottTema = temaSelect.value;
    
    aktualisJatek = new JatekTer(jatekterELEM, event.detail, valasztottTema);
    aktualisJatek.inditas();
});

// A kilépés gomb eseménykezelője, amely megállítja a hurkot, kitakarítja a pályát és visszadob a menübe
kilepesGomb.addEventListener("click", () => {
    if (aktualisJatek) {
        aktualisJatek.leallitas();
        
        // Letakarítjuk a játéktérről a dinamikusan generált elemeket
        const takaritandoElemek = jatekterELEM.querySelectorAll('img, div[style*="position: absolute"]:not(#jatek-ui)');
        takaritandoElemek.forEach(elem => elem.remove());
    }
    
    jatekterELEM.style.display = "none";
    foKepernyoELEM.style.display = "block";
});