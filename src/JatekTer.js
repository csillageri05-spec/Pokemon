import Jatekos from "./Jatekos.js";
import Gyumolcs from "./Gyumolcs.js";
import EsemenyKezelo from "./EsemenyKezelo.js";

const POKEMON_BOGYOK = [
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cheri-berry.png",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/chesto-berry.png",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pecha-berry.png",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oran-berry.png",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sitrus-berry.png",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lum-berry.png"
];

/**
 * @class JatekTer
 * @classdesc A játék logikáját, a játékhurkot, és az ütközéseket kezelő osztály.
 */
export default class JatekTer {
  /**
   * Létrehozza a játék motorját.
   * @param {HTMLElement} jatekterElem - A játékteret jelölő DOM elem.
   * @param {string} pokemonKepUrl - A Pokémon sprite URL-je.
   * @param {string} tema - A kiválasztott helyszín azonosítója.
   */
  constructor(jatekterElem, pokemonKepUrl, tema) {
    this.jatekterElem = jatekterElem;
    
    if (tema === "fufu") this.jatekterElem.style.backgroundColor = "#78C850";
    else if (tema === "barlang") this.jatekterElem.style.backgroundColor = "#705848";
    else if (tema === "vizpart") this.jatekterElem.style.backgroundColor = "#6890F0";

    this.jatekMeret = {
      szelesseg: jatekterElem.clientWidth,
      magassag: jatekterElem.clientHeight,
    };

    this.bemenet = new EsemenyKezelo();
    this.jatekos = new Jatekos(50, 50, 60, 60, 5, jatekterElem, pokemonKepUrl);

    this.gyumolcs = [];
    const induloBogyo = POKEMON_BOGYOK[Math.floor(Math.random() * POKEMON_BOGYOK.length)];
    this.gyumolcs.push(new Gyumolcs(40, 40, induloBogyo, jatekterElem));
    
    this.gyumolcs[0].ujrageneralas(
      this.jatekMeret.szelesseg,
      this.jatekMeret.magassag
    );

    this.mozog = false;
    this.pontszam = 0;
    this.pontKijelzoElem = document.getElementById("pontkijelzo");
    this.pontKijelzoElem.textContent = `Pont: ${this.pontszam}`;

    this.jatekCiklus = this.jatekCiklus.bind(this);
  }

  /** Elindítja a játékot. */
  inditas() {
    this.mozog = true;
    requestAnimationFrame(this.jatekCiklus);
  }

  /** Leállítja a játékhurkot. */
  leallitas() {
    this.mozog = false;
  }

  /**
   * A játékhurok.
   * @param {number} idobelyeg - Időbélyeg.
   */
  jatekCiklus(idobelyeg) {
    if (!this.mozog) return;
    this.frissites();
    this.kirajzolas();
    requestAnimationFrame(this.jatekCiklus);
  }

  frissites() {
    const gombok = this.bemenet.gombokLekerdezese();
    this.jatekos.frissites(gombok, this.jatekMeret);

    for (let i = 0; i < this.gyumolcs.length; i++) {
      if (this.utkozesVizsgalat(this.jatekos, this.gyumolcs[i])) {
        this.pontszam++;
        this.pontKijelzoElem.textContent = `Pont: ${this.pontszam}`;
        
        const ujBogyo = POKEMON_BOGYOK[Math.floor(Math.random() * POKEMON_BOGYOK.length)];
        this.gyumolcs[i].ujrageneralas(
          this.jatekMeret.szelesseg,
          this.jatekMeret.magassag,
          ujBogyo
        );
      }
    }
  }

  kirajzolas() {
    this.jatekos.kirajzolas();
    for (let i = 0; i < this.gyumolcs.length; i++) {
      this.gyumolcs[i].kirajzolas();
    }
  }

  utkozesVizsgalat(j, b) {
    if (
      j.x < b.x + b.szelesseg &&
      j.x + j.szelesseg > b.x &&
      j.y < b.y + b.magassag &&
      j.y + j.magassag > b.y
    ) {
      return true;
    }
    return false;
  }
}