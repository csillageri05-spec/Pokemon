/**
 * @class Gyumolcs
 * @classdesc A játéktéren megjelenő, gyűjthető Pokémon bogyókat kezelő osztály.
 */
export default class Gyumolcs {
    #x = 0;
    #y = 0;
    #szelesseg = 0;
    #magassag = 0;
    #kepUrl = "";
    #elem;

    /**
     * Létrehoz egy új bogyót.
     * @param {number} szelesseg - Szélesség.
     * @param {number} magassag - Magasság.
     * @param {string} kepUrl - A bogyó képének URL-je.
     * @param {HTMLElement} szuloElem - A DOM elem, amibe a bogyó bekerül.
     */
    constructor(szelesseg, magassag, kepUrl, szuloElem) {
        this.#szelesseg = szelesseg;
        this.#magassag = magassag;
        this.#kepUrl = kepUrl;
        
        this.#elem = document.createElement('img');
        this.#elem.src = this.#kepUrl;
        this.#elem.style.position = 'absolute';
        this.#elem.style.width = `${this.#szelesseg}px`;
        this.#elem.style.height = `${this.#magassag}px`;
        this.#elem.style.filter = "drop-shadow(2px 2px 2px rgba(0,0,0,0.5))"; 
        
        szuloElem.appendChild(this.#elem);
    }

    get x() { return this.#x; }
    get y() { return this.#y; }
    get szelesseg() { return this.#szelesseg; }
    get magassag() { return this.#magassag; }

    kirajzolas() {
        this.#elem.style.left = `${this.#x}px`;
        this.#elem.style.top = `${this.#y}px`;
    }

    /**
     * Véletlenszerű új koordinátákat generál, és lecseréli a bogyó képét.
     * @param {number} maxSzelesseg - Max szélesség.
     * @param {number} maxMagassag - Max magasság.
     * @param {string} [ujKepUrl] - Opcionális új kép URL.
     */
    ujrageneralas(maxSzelesseg, maxMagassag, ujKepUrl) {
        this.#x = Math.floor(Math.random() * (maxSzelesseg - this.#szelesseg));
        this.#y = Math.floor(Math.random() * (maxMagassag - this.#magassag));
        
        if (ujKepUrl) {
            this.#kepUrl = ujKepUrl;
            this.#elem.src = this.#kepUrl;
        }
    }
}