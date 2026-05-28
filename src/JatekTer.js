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
   * A játekhurok, amely minden egyes kepkockan lefut.
   * @param {number} idobelyeg - A bongeszo altal atadott idobelyeg.
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
   * Frissiti a jatekos es az elemek logikai allapotat, es ellenorzi az utkozeseket.
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
   * Meghivja a jatekos es a gyumolcsok DOM frissiteset (kirajzolasat).
   */
  kirajzolas() {
    this.jatekos.kirajzolas();
    
    for (let i = 0; i < this.gyumolcs.length; i++) {
      this.gyumolcs[i].kirajzolas();
    }
  }

  /**
   * AABB modszerrel vizsgalja ket elem (jatekos es gyumolcs) utkozeset.
   * @param {Jatekos} j - A jatekos peldanya.
   * @param {Gyumolcs} b - A gyumolcs peldanya.
   * @returns {boolean} Igaz, ha a ket elem doboza fedi egymast.
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