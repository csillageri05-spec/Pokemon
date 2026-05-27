/**
 * @class Gyumolcs
 * @classdesc A jatekteren megjeleno gyujtheto targyakat kezelo osztaly.
 */
export default class Gyumolcs {
    /**
     * Az X koordinata.
     * @private
     * @type {number}
     */
    #x = 0;

    /**
     * Az Y koordinata.
     * @private
     * @type {number}
     */
    #y = 0;

    /**
     * A gyumolcs szelessege pixelben.
     * @private
     * @type {number}
     */
    #szelesseg = 0;

    /**
     * A gyumolcs magassaga pixelben.
     * @private
     * @type {number}
     */
    #magassag = 0;

    /**
     * A gyumolcs tipusa (pl. szoveges ikon).
     * @private
     * @type {string}
     */
    #tipus = "";

    /**
     * A gyumolcsot megjelento DOM elem.
     * @private
     * @type {HTMLElement}
     */
    #elem;

    /**
     * Letrehoz egy uj gyumolcsot a megadott meretekkel es hozzaadja a szulo elemhez.
     * @param {number} szelesseg - A gyumolcs szelessege.
     * @param {number} magassag - A gyumolcs magassaga.
     * @param {string} tipus - A megjelenitendo karakter vagy ikon.
     * @param {HTMLElement} szuloElem - A DOM elem, amibe a gyumolcs bekerul.
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

    /** @returns {number} A gyumolcs aktualis X koordinataja. */
    get x() { return this.#x; }
    /** @returns {number} A gyumolcs aktualis Y koordinataja. */
    get y() { return this.#y; }
    /** @returns {number} A gyumolcs szelessege. */
    get szelesseg() { return this.#szelesseg; }
    /** @returns {number} A gyumolcs magassaga. */
    get magassag() { return this.#magassag; }

    /**
     * Frissiti a gyumolcs DOM elemenez poziciojat az aktualis koordinatak alapjan.
     */
    kirajzolas() {
        this.#elem.style.left = `${this.#x}px`;
        this.#elem.style.top = `${this.#y}px`;
    }

    /**
     * Veletlenszeru uj koordinatakat general a gyumolcsnek a jatekter hatarain belul.
     * @param {number} maxSzelesseg - A jatekter maximalis szelessege.
     * @param {number} maxMagassag - A jatekter maximalis magassaga.
     */
    ujrageneralas(maxSzelesseg, maxMagassag) {
        this.#x = Math.floor(Math.random() * (maxSzelesseg - this.#szelesseg));
        this.#y = Math.floor(Math.random() * (maxMagassag - this.#magassag));
    }
}