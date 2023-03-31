import config from "./config.js";

import abertura from "./cena-abertura.js";
import principal from "./cena-principal.js";
import finaltriste from "./cena-finaltriste.js";
import finalfeliz from "./cena-finalfeliz.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("abertura", abertura);
    this.scene.add("principal", principal);
    this.scene.add("finaltriste", finaltriste);
    this.scene.add("finalfeliz", finalfeliz);

    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};