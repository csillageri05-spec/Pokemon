export default class Gyumolcs {
    #x = 0;
    #y = 0;
    #szelesseg = 0;
    #magassag = 0;
    #tipus = "";
    #elem;

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

    get x() { return this.#x; }
    get y() { return this.#y; }
    get szelesseg() { return this.#szelesseg; }
    get magassag() { return this.#magassag; }

    kirajzolas() {
        this.#elem.style.left = `${this.#x}px`;
        this.#elem.style.top = `${this.#y}px`;
    }

    ujrageneralas(maxSzelesseg, maxMagassag) {
        this.#x = Math.floor(Math.random() * (maxSzelesseg - this.#szelesseg));
        this.#y = Math.floor(Math.random() * (maxMagassag - this.#magassag));
    }
}