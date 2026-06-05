import Jatekos from "./Jatekos.js";
import Gyumolcs from "./Gyumolcs.js";
import EsemenyKezelo from "./EsemenyKezelo.js";

/**
 * @class JatekTer
 * @classdesc A játék logikáját, a folyamatos renderelési ciklust (játékhurok), a pontszámítást és az ütközéseket kezelő fő osztály.
 */
export default class JatekTer {
  /**
   * Létrehozza a játék motorját, beállítja a témát és példányosítja a szereplőket.
   * * @param {HTMLElement} jatekterElem - A játékteret jelölő fő DOM elem.
   * @param {string} pokemonKepUrl - A kiválasztott Pokémon sprite URL-je.
   * @param {string} tema - A kiválasztott helyszín azonosítója (pl. 'fufu', 'barlang', 'vizpart').
   */
  constructor(jatekterElem, pokemonKepUrl, tema) {
    /** * @type {HTMLElement} 
     * @description A játéktér DOM eleme.
     */
    this.jatekterElem = jatekterElem;
    
    // Téma (háttérszín) beállítása
    if (tema === "fufu") this.jatekterElem.style.backgroundColor = "#78C850";
    else if (tema === "barlang") this.jatekterElem.style.backgroundColor = "#705848";
    else if (tema === "vizpart") this.jatekterElem.style.backgroundColor = "#6890F0";

    /** * @type {Object} 
     * @description A játéktér dinamikusan kinyert méretei.
     */
    this.jatekMeret = {
      szelesseg: jatekterElem.clientWidth,
      magassag: jatekterElem.clientHeight,
    };

    /** * @type {EsemenyKezelo} 
     * @description A billentyűzet bemeneteit figyelő példány.
     */
    this.bemenet = new EsemenyKezelo();
    
    /** * @type {Jatekos} 
     * @description A felhasználó által irányított játékos példánya.
     */
    this.jatekos = new Jatekos(50, 50, 60, 60, 5, jatekterElem, pokemonKepUrl);

    /** * @type {Array<Gyumolcs>} 
     * @description A pályán lévő gyűjthető tárgyak tömbje.
     */
    this.gyumolcs = [];
    this.gyumolcs.push(new Gyumolcs(30, 30, "🍎", jatekterElem));
    this.gyumolcs[0].ujrageneralas(
      this.jatekMeret.szelesseg,
      this.jatekMeret.magassag
    );

    /** * @type {boolean} 
     * @description Tárolja, hogy a játékhurok éppen fut-e.
     */
    this.mozog = false;
    
    /** * @type {number} 
     * @description A játékos által összegyűjtött pontok száma.
     */
    this.pontszam = 0;
    
    /** * @type {HTMLElement} 
     * @description A pontszámot megjelenítő HTML elem.
     */
    this.pontKijelzoElem = document.getElementById("pontkijelzo");
    this.pontKijelzoElem.textContent = `Pont: ${this.pontszam}`;

    // A játékhurok this kontextusának rögzítése
    this.jatekCiklus = this.jatekCiklus.bind(this);
  }

  /**
   * Elindítja a játékot és a folyamatos képkocka-frissítést (requestAnimationFrame).
   */
  inditas() {
    this.mozog = true;
    requestAnimationFrame(this.jatekCiklus);
  }

  /**
   * Leállítja a játékhurkot. Hasznos a kilépés gomb megnyomásakor.
   */
  leallitas() {
    this.mozog = false;
  }

  /**
   * A játékhurok, amely minden egyes képkockán (frame-en) lefut.
   * * @param {number} idobelyeg - A böngésző által átadott időbélyeg.
   */
  jatekCiklus(idobelyeg) {
    if (!this.mozog) return;
    this.frissites();
    this.kirajzolas();
    requestAnimationFrame(this.jatekCiklus);
  }

  /**
   * Frissíti a játékos és az elemek logikai állapotát, valamint ellenőrzi az ütközéseket.
   */
  frissites() {
    const gombok = this.bemenet.gombokLekerdezese();
    this.jatekos.frissites(gombok, this.jatekMeret);

    for (let i = 0; i < this.gyumolcs.length; i++) {
      if (this.utkozesVizsgalat(this.jatekos, this.gyumolcs[i])) {
        this.pontszam++;
        this.pontKijelzoElem.textContent = `Pont: ${this.pontszam}`;
        this.gyumolcs[i].ujrageneralas(
          this.jatekMeret.szelesseg,
          this.jatekMeret.magassag
        );
      }
    }
  }

  /**
   * Meghívja a játékos és a gyümölcsök vizuális (DOM) frissítését.
   */
  kirajzolas() {
    this.jatekos.kirajzolas();
    for (let i = 0; i < this.gyumolcs.length; i++) {
      this.gyumolcs[i].kirajzolas();
    }
  }

  /**
   * AABB (Axis-Aligned Bounding Box) módszerrel vizsgálja két négyszögletes elem ütközését.
   * * @param {Jatekos} j - A játékos példánya.
   * @param {Gyumolcs} b - A gyümölcs példánya.
   * @returns {boolean} Igaz (true), ha a két elem doboza fedi egymást, egyébként hamis (false).
   */
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