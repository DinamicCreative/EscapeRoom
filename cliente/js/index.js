import config from "./config.js";

import cena1 from "./capa-do-jogo.js";
import principal from "./cena-nivel1.js";
import fim_do_jogo from "./cena-finaltriste.js";
import final_feliz from "./cena-finalfeliz.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("cena1", cena1);
    this.scene.add("principal", principal);
    this.scene.add("fim-do-jogo", fim_do_jogo);
    this.scene.add("final-feliz", final_feliz);

    this.scene.start("cena1");
  }
}

window.onload = () => {
  window.game = new Game();
};