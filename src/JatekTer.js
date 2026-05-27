import Jatekos from "./Jatekos.js";
import Gyumolcs from "./Gyumolcs.js";
import EsemenyKezelo from "./EsemenyKezelo.js";

/**
 * @class JatekTer
 * @classdesc A jatek logikajat, a jatek hurkot es az elemek utkozeset kezelo fo osztaly.
 */
export default class JatekTer {
  /**
   * Letrehozza a jatek motorjat es peldanyositja a szereploket.
   * @param {HTMLElement} jatekterElem - A jatekteret jelolo fo DOM elem.
   * @param {string} pokemonKepUrl - A kivalasztott Pokemon sprite URL-je.
   */
  constructor(jatekterElem, pokemonKepUrl) {
    /** * A jatekter kinyert meretei.
     * @type {Object} 
     */
    this.jatekMeret = {
      szelesseg: jatekterElem.clientWidth,
      magassag: jatekterElem.clientHeight,
    };

    /** * A billentyuzet bemeneteit figyelo peldany.
     * @type {EsemenyKezelo} 
     */
    this.bemenet = new EsemenyKezelo();
    
    /** * A jatekos peldanya.
     * @type {Jatekos} 
     */
    this.jatekos = new Jatekos(50, 50, 60, 60, 5, jatekterElem, pokemonKepUrl);

    /** * A palyan levo gyumolcsok tombje.
     * @type {Array<Gyumolcs>} 
     */
    this.gyumolcs = [];
    this.gyumolcs.push(new Gyumolcs(30, 30, "🍎", jatekterElem));
    this.gyumolcs[0].ujrageneralas(
      this.jatekMeret.szelesseg,
      this.jatekMeret.magassag
    );

    /** * Tarolja, hogy a jatek eppen fut-e.
     * @type {boolean} 
     */
    this.mozog = false;
    
    /** * A jatekos altal osszegyujtott pontok szama.
     * @type {number} 
     */
    this.pontszam = 0;

    this.jatekCiklus = this.jatekCiklus.bind(this);
  }
  /**
   * Elinditja a jatekot es a folyamatos kepkocka-frissitest.
   */
  inditas() {
    this.mozog = true;
    requestAnimationFrame(this.jatekCiklus);
  }

  /**
   * A jatekhurok, amely minden egyes kepkockan lefut.
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