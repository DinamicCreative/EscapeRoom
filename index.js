
// Configuração do jogo
import config from "./config.js";

// Cena de abertura
import CenaDeAbertura from ".cena.js";

// Cena principal
import principal from "./principal.js";

// Cena de encerramento
import encerramento from "./encerramento.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    //
    // Carregar as cenas
    this.scene.add ("abertura", abertura);
    this.scene.add("principal", principal);
    this.scene.add("encerramento", encerramento);
    //
    // Iniciar pela cena de abertura
  }
}

window.onload = () => {
  window.game = new Game();
};