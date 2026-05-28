/**
 * @class Gyumolcs
 * @classdesc A játékteren megjelenő gyűjthető gyümölcsöket kezelő osztály.
 */
export default class Gyumolcs {
    /**
     * Az X koordináta.
     * @private
     * @type {number}
     */
    #x = 0;

    /**
     * Az Y koordináta.
     * @private
     * @type {number}
     */
    #y = 0;

    /**
     * A gyümölcs szélessége pixelben.
     * @private
     * @type {number}
     */
    #szelesseg = 0;

    /**
     * A gyümölcs magassága pixelben.
     * @private
     * @type {number}
     */
    #magassag = 0;

    /**
     * A gyümölcs típusa.
     * @private
     * @type {string}
     */
    #tipus = "";

    /**
     * A gyümölcsöt megjelenítő DOM elem.
     * @private
     * @type {HTMLElement}
     */
    #elem;

    /**
     * Létrehoz egy új gyümölcsöt a megadott méretekkel és hozzáadja a szülő elemhez.
     * @param {number} szelesseg - A gyümölcs szélessége.
     * @param {number} magassag - A gyümölcs magassága.
     * @param {string} tipus - A megjelenítendő ikon.
     * @param {HTMLElement} szuloElem - A DOM elem, amibe a gyümölcs bekerül.
     */
    constructor(szelesseg, magassag, tipus, szuloElem) {
        this.#szelesseg = szelesseg;
        this.#magassag = magassag;
        this.#tipus = tipus;
        
        this.#elem = document.createElement('div');
        this.#elem.style.position = 'absolute';
        this.#elem.style.width = `${this.#szelesseg}px`;
        this.#elem.style.height = `${this.#magassag}px`;
        this.#elem.style.display = 'flex';
        this.#elem.style.justifyContent = 'center';
        this.#elem.style.alignItems = 'center';
        this.#elem.style.fontSize = '24px';
        this.#elem.textContent = this.#tipus;
        szuloElem.appendChild(this.#elem);
    }

    /** @returns {number} A gyümölcs aktuális X koordinátája. */
    get x() { return this.#x; }
    /** @returns {number} A gyümölcs aktuális Y koordinátája. */
    get y() { return this.#y; }
    /** @returns {number} A gyümölcs szélessége. */
    get szelesseg() { return this.#szelesseg; }
    /** @returns {number} A gyümölcs magassága. */
    get magassag() { return this.#magassag; }

    /**
     * Frissíti a gyümölcs DOM elemenek pozícióját az aktuális koordináták alapján.
     */
    kirajzolas() {
        this.#elem.style.left = `${this.#x}px`;
        this.#elem.style.top = `${this.#y}px`;
    }

    /**
     * Véletlenszerű új koordinátákat generál a gyümölcsnek a játéktér határain belül.
     * @param {number} maxSzelesseg - A játéktér maximális szélessége.
     * @param {number} maxMagassag - A játéktér maximális magassága.
     */
    ujrageneralas(maxSzelesseg, maxMagassag) {
        this.#x = Math.floor(Math.random() * (maxSzelesseg - this.#szelesseg));
        this.#y = Math.floor(Math.random() * (maxMagassag - this.#magassag));
    }
}