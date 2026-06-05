/**
 * @class Services
 * @classdesc Az API kéréseket (hálózati kommunikációt) bonyolító osztály.
 */
export default class Services {
    /**
     * Létrehozza a szolgáltatás példányát.
     */
    constructor() {}
    
    /**
     * Aszinkron módon lekéri az adatokat a megadott végpontról, majd meghívja a callback függvényt a kapott adattal.
     * * @param {string} vegpont - Az API elérési útja (URL).
     * @param {Function} callback - A függvény, amely megkapja a feldolgozott JSON adatot.
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