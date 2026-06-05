# Böngésző Alapú Pokémon Játék Cizelláltan

Készítette: Csillag Gergő Zsolt

Egy objektumorientált, JavaScript alapú, böngészőben futó játék, amely a PokéAPI segítségével valós idejű adatokkal dolgozik. A projekt a moduláris felépítésre, az eseményvezérelt programozásra és a SOLID elveire fókuszál, mindezt egy klasszikus, legendás retro dizájnba csomagolva.

## Jellemzők

* **Retro Kanto Atmoszféra:** A GameBoy Advance korszakot idéző, stílusos pixel-art vizuális dizájn, testreszabható játéktérrel. A felhasználó különböző klasszikus helyszínek (Füves mező, Sötét barlang, Vízpart) közül választhatja ki az arénát.
* **Dinamikus Adatkezelés:** A rendszer a PokéAPI végpontjairól olvassa be az első generációs (Kanto régiós, 1-151) Pokémonok adatait, valamint a gyűjthető bogyók (items) textúráit a `fetch` API segítségével.
* **Komplex Játékmechanika:** Valós idejű pontszámlálás és egy robusztus "Menekülés" (kilépés) funkció, amely memóriaszivárgás nélkül állítja le a folyamatokat, és precízen takarítja le a dinamikusan generált DOM elemeket a játéktérről.
* **Folyékony Játékmenet:** A mozgás nem rácsalapú ugrálás, hanem folyamatos 60 FPS sebességű játékhurok (`requestAnimationFrame`) által hajtott pixelalapú elmozdulás.
* **AABB Ütközésvizsgálat:** A játéktéren megjelenő, dinamikusan sorsolt bogyók begyűjtését a motor egy precíz, tengelyekre illesztett határoló doboz logikával számolja ki.
* **Fejlesztői Dokumentáció:** A kód teljes egészében JSDoc szabvány szerint van felcímkézve, amelyből a `docdash` sablonnal és dedikált konfigurációs fájllal statikus HTML dokumentáció generálható.

## Alkalmazott Technológiák

* **HTML5 & CSS3:** CSS Grid és Flexbox elrendezések, reszponzív logikai játéktér, külső webfontok (Press Start 2P) integrálása a retro megjelenéshez.
* **Vanilla JavaScript (ES6+):** Osztályok, privát mezők, aszinkron hívások, egyedi események (`CustomEvent`), haladó DOM manipuláció.
* **Eszközök:** Node.js, NPM környezet és csomagkezelés.

## Architektúra és Specifikáció

A kód szigorúan szétválasztott, egyetlen felelősséggel rendelkező osztályokból áll, amelyek külön ES6 modulokban helyezkednek el.

### 1. API és Adatréteg
* **`Services.js`**: Felelős a hálózati kommunikációért. Aszinkron hívásokkal kéri le a Pokémonok JSON adatait a publikus API-ról.
* **`Pokemon.js`**: Egyetlen Pokémon vizuális kártyáját építi fel a DOM-ban, és kezeli a menüben történő kiválasztást (kattintás).
* **`Info.js`**: Megjeleníti a kiválasztott entitás tulajdonságait (név, típusok), és tartalmazza a játéktér inicializálását triggerelő gombot.

### 2. Játékmotor és Állapotkezelés
* **`JatekTer.js`**: A motor magja. Összefogja az elemeket, kezeli a tematikus háttereket, futtatja a végtelen játékhurkot, felügyeli a pontszámot, és minden képkockánál levezényli a frissítéseket, valamint az AABB ütközésvizsgálatot. Biztosítja a játék tiszta leállítását is.
* **`EsemenyKezelo.js`**: Tiszta bemenetkezelő. Csak a `keydown` és `keyup` eseményeket monitorozza, hogy a játékos irányítási szándékát aszinkron módon biztosítsa a mozgáskiszámításhoz.

### 3. Játékelemek 
* **`Jatekos.js`**: A játékos által irányított megnövelt textúrájú karakter. Nyilvántartja saját X/Y koordinátáit, szélességét, magasságát és sebességét. Felelős a saját DOM elemének újrapozicionálásáért az aktuális gombnyomások és a pálya határai alapján.
* **`Gyumolcs.js`**: A gyűjthető tárgyak logikája. Képes véletlenszerűen újragenerálni a saját pozícióját a játéktér méretein belül, és sikeres begyűjtés esetén dinamikusan cserélni a megjelenített API bogyó textúráját.