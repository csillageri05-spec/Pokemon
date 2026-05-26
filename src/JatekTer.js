import Jatekos from "./Jatekos.js";
import Gyumolcs from "./Gyumolcs.js";
import EsemenyKezelo from "./EsemenyKezelo.js";

export default class JatekTer {
  constructor(jatekterElem, pokemonKepUrl) {
    this.jatekMeret = {
      szelesseg: jatekterElem.clientWidth,
      magassag: jatekterElem.clientHeight,
    };

    this.bemenet = new EsemenyKezelo();
    this.jatekos = new Jatekos(50, 50, 60, 60, 5, jatekterElem, pokemonKepUrl);

    this.gyumolcs = [];
    this.gyumolcs.push(new Gyumolcs(30, 30, "🍎", jatekterElem));
    this.gyumolcs[0].ujrageneralas(
      this.jatekMeret.szelesseg,
      this.jatekMeret.magassag
    );

    this.mozog = false;
    this.pontszam = 0;

    this.jatekCiklus = this.jatekCiklus.bind(this);
  }

  inditas() {
    this.mozog = true;
    requestAnimationFrame(this.jatekCiklus);
  }

  jatekCiklus(idobelyeg) {
    if (!this.mozog) {
      return;
    }

    this.frissites();
    this.kirajzolas();

    requestAnimationFrame(this.jatekCiklus);
  }

  frissites() {
    const gombok = this.bemenet.gombokLekerdezese();
    this.jatekos.frissites(gombok, this.jatekMeret);

    for (let i = 0; i < this.gyumolcs.length; i++) {
      if (this.utkozesVizsgalat(this.jatekos, this.gyumolcs[i])) {
        this.pontszam++;
        this.gyumolcs[i].ujrageneralas(
          this.jatekMeret.szelesseg,
          this.jatekMeret.magassag
        );
      }
    }
  }

  kirajzolas() {
    this.jatekos.kirajzolas();
    
    for (let i = 0; i < this.gyumolcs.length; i++) {
      this.gyumolcs[i].kirajzolas();
    }
  }

  utkozesVizsgalat(j, b) {
    if (
      j.x < b.x + b.szelesseg &&
      j.x + j.szelesseg > b.x &&
      j.y < b.y + b.magassag &&
      j.y + j.magassag > b.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}