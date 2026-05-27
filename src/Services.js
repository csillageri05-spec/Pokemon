/**
 * @class Services
 * @classdesc Az API kereseket (halozati kommunikaciot) bonyolito osztaly.
 */
export default class Services {
    /**
     * Ures konstruktor a szolgaltatas inicializalasara.
     */
    constructor() {

    }
    
    /**
     * Aszinkron modon lekeri az adatokat a megadott vegpontrol, majd meghivja a callback fuggvenyt.
     * @param {string} vegpont - Az API eleresi utja (URL).
     * @param {Function} callback - A fuggveny, amely megkapja a feldolgozott JSON adatot.
     */
    getAdat(vegpont, callback) {
        fetch(vegpont)
        .then((response) => response.json())
        .then((data) => {
                callback(data);
            })
        .catch(error => console.log(error));
    }
}