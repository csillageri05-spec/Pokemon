import Jatekos from "./Jatekos.js";
import Gyumolcs from "./Gyumolcs.js";
import EsemenyKezelo from "./EsemenyKezelo.js";

/**
 * @class JatekTer
 * @classdesc A játék logikáját, a játék hurkot és az elemek ütközését kezelő fő osztály.
 */
export default class JatekTer {
  /**
   * Létrehozza a játék motorját és példányosítja a szereplőket.
   * @param {HTMLElement} jatekterElem - A játékteret jelölő fő DOM elem.
   * @param {string} pokemonKepUrl - A kiválasztott Pokemon sprite URL-je.
   */
  constructor(jatekterElem, pokemonKepUrl) {
    /** * A játéktér kinyert méretei.
     * @type {Object} 
     */
    this.jatekMeret = {
      szelesseg: jatekterElem.clientWidth,
      magassag: jatekterElem.clientHeight,
    };

    /** * A billentyűzet bemeneteit figyelő példány.
     * @type {EsemenyKezelo} 
     */
    this.bemenet = new EsemenyKezelo();
    
    /** * A játékos példánya.
     * @type {Jatekos} 
     */
    this.jatekos = new Jatekos(50, 50, 60, 60, 5, jatekterElem, pokemonKepUrl);

    /** * A pályán lévő gyümölcsök tömbje.
     * @type {Array<Gyumolcs>} 
     */
    this.gyumolcs = [];
    this.gyumolcs.push(new Gyumolcs(30, 30, "🍎", jatekterElem));
    this.gyumolcs[0].ujrageneralas(
      this.jatekMeret.szelesseg,
      this.jatekMeret.magassag
    );

    /** * Tárolja, hogy a játék éppen fut-e.
     * @type {boolean} 
     */
    this.mozog = false;
    
    /** * A játékos által összegyüjtött pontok száma.
     * @type {number} 
     */
    this.pontszam = 0;

    this.jatekCiklus = this.jatekCiklus.bind(this);
  }
  /**
   * Elindítja a játékot és a folyamatos képkocka-frissítést.
   */
  inditas() {
    this.mozog = true;
    requestAnimationFrame(this.jatekCiklus);
  }

  /**
   * A játekhurok, amely minden egyes képkockán lefut.
   * @param {number} idobelyeg - A böngesző által átadott időbélyeg.
   */
  jatekCiklus(idobelyeg) {
    if (!this.mozog) {
      return;
    }

    this.frissites();
    this.kirajzolas();

    requestAnimationFrame(this.jatekCiklus);
  }

  /**
   * Frissíti a játékos és az elemek logikai állapotát, és ellenőrzi az ütközéseket.
   */
  frissites() {
    const gombok = this.bemenet.gombokLekerdezese();
    this.jatekos.frissites(gombok, this.jatekMeret);

    for (let i = 0; i < this.gyumolcs.length; i++) {
      if (this.utkozesVizsgalat(this.jatekos, this.gyumolcs[i])) {
        this.pontszam++;
        this.gyumolcs[i].ujrageneralas(
          this.jatekMeret.szelesseg,
          this.jatekMeret.magassag
        );
      }
    }
  }

  /**
   * Meghívja a játékos és a gyümölcsök DOM frissítését.
   */
  kirajzolas() {
    this.jatekos.kirajzolas();
    
    for (let i = 0; i < this.gyumolcs.length; i++) {
      this.gyumolcs[i].kirajzolas();
    }
  }

  /**
   * AABB módszerrel vizsgálja két elem ütközését.
   * @param {Jatekos} j - A játékos példánya.
   * @param {Gyumolcs} b - A gyümölcs példánya.
   * @returns {boolean} Igaz, ha a két elem doboza fedi egymást.
   */
  utkozesVizsgalat(j, b) {
    if (
      j.x < b.x + b.szelesseg &&
      j.x + j.szelesseg > b.x &&
      j.y < b.y + b.magassag &&
      j.y + j.magassag > b.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}