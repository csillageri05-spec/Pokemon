/**
 * @class Gyumolcs
 * @classdesc A játéktéren megjelenő, gyűjthető elemeket (pl. gyümölcsök, tárgyak) kezelő osztály.
 */
export default class Gyumolcs {
    /**
     * @private
     * @type {number}
     * @description Az X koordináta.
     */
    #x = 0;

    /**
     * @private
     * @type {number}
     * @description Az Y koordináta.
     */
    #y = 0;

    /**
     * @private
     * @type {number}
     * @description A gyümölcs szélessége pixelben.
     */
    #szelesseg = 0;

    /**
     * @private
     * @type {number}
     * @description A gyümölcs magassága pixelben.
     */
    #magassag = 0;

    /**
     * @private
     * @type {string}
     * @description A gyümölcs típusa (pl. emoji karakter, amit megjelenít).
     */
    #tipus = "";

    /**
     * @private
     * @type {HTMLElement}
     * @description A gyümölcsöt megjelenítő DOM elem (div).
     */
    #elem;

    /**
     * Létrehoz egy új gyümölcsöt a megadott méretekkel és hozzáadja a játéktérhez.
     * * @param {number} szelesseg - A gyümölcs szélessége.
     * @param {number} magassag - A gyümölcs magassága.
     * @param {string} tipus - A megjelenítendő emoji ikon.
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
     * Frissíti a gyümölcs DOM elemének CSS pozícióját az aktuális X és Y koordináták alapján.
     */
    kirajzolas() {
        this.#elem.style.left = `${this.#x}px`;
        this.#elem.style.top = `${this.#y}px`;
    }

    /**
     * Véletlenszerű új koordinátákat generál a gyümölcsnek úgy, hogy az a játéktér határain belül maradjon.
     * * @param {number} maxSzelesseg - A játéktér maximális szélessége.
     * @param {number} maxMagassag - A játéktér maximális magassága.
     */
    ujrageneralas(maxSzelesseg, maxMagassag) {
        this.#x = Math.floor(Math.random() * (maxSzelesseg - this.#szelesseg));
        this.#y = Math.floor(Math.random() * (maxMagassag - this.#magassag));
    }
}