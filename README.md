# Böngésző Alapú Pokémon Játék Cizelláltan

Egy objektumorientált, JavaScript alapú, böngészőben futó játék, amely a PokéAPI segítségével valós idejű adatokkal dolgozik. A projekt a moduláris felépítésre, az eseményvezérelt programozásra és a SOLID elveire fókuszál.

## Jellemzők

* **Dinamikus Adatkezelés:** A rendszer a PokéAPI végpontjairól olvassa be a több mint 1000 elérhető Pokémon adatait a `fetch` API segítségével.
* **Egyedi Kiválasztó Felület:** A játékos a listából kattintással választhatja ki a karakterét, melynek adatait egy információs panel részletezi.
* **Folyékony Játékmenet:** A mozgás nem rácsalapú ugrálás, hanem folyamatos 60 FPS sebességű játékhurok által hajtott pixelalapú elmozdulás.
* **AABB Ütközésvizsgálat:** A játéktéren megjelenő bogyók begyűjtését a motor egy precíz, tengelyekre illesztett határoló doboz logikával számolja ki.
* **Fejlesztői Dokumentáció:** A kód teljes egészében JSDoc szabvány szerint van felcímkézve, amelyből a docdash sablonnal statikus HTML dokumentáció generálható.

## Alkalmazott Technológiák

* **HTML5 & CSS3:** CSS Grid és Flexbox elrendezések, reszponzív logikai játéktér.
* **Vanilla JavaScript :** Osztályok, privát mezők , aszinkron hívások , egyedi események , DOM manipuláció.
* **Eszközök:** Node.js, NPM.

## Architektúra és Specifikáció

A kód szigorúan szétválasztott, egyetlen felelősséggel rendelkező osztályokból áll, amelyek külön ES6 modulokban helyezkednek el.

### 1. API és Adatréteg
* **`Services.js`**: Felelős a hálózati kommunikációért. Aszinkron hívásokkal kéri le a Pokémonok JSON adatait.
* **`Pokemon.js`**: Egyetlen Pokémon vizuális kártyáját építi fel a DOM-ban, és kezeli a kiválasztást (kattintás).
* **`Info.js`**: Megjeleníti a kiválasztott entitás tulajdonságait (név, típus), és tartalmazza a játék indítását triggerelő gombot.

### 2. Játékmotor
* **`JatekTer.js`**: A motor magja. Összefogja az elemeket, futtatja a végtelen játékhurkot , és minden képkockánál levezényli a frissítéseket, valamint az AABB ütközésvizsgálatot.
* **`EsemenyKezelo.js`**: Tiszta bemenetkezelő . Csak a `keydown` és `keyup` eseményeket monitorozza, hogy a játékos irányítási szándékát biztosítsa a mozgáskiszámításhoz.

### 3. Játékelemek 
* **`Jatekos.js`**: A játékos által irányított karakter. Nyilvántartja saját X/Y koordinátáit, szélességét, magasságát és sebességét. Felelős a saját DOM elemének újrapozicionálásáért az aktuális gombnyomások és a pálya határai alapján.
* **`Gyumolcs.js`**: A gyűjthető tárgyak logikája. Képes véletlenszerűen újragenerálni a saját pozícióját a játéktér méretein belül, ha ütközés történik.