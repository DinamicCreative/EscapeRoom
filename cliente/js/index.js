import config from "./config.js";

import logoempresa from "./1cena-logoempresa.js";
import capa_do_jogo from "./2capa-do-jogo.js";
import qualjogador from "./3cena-qualjogador.js";
import carregamento from "./j1-nivel0-carregamento.js";
import aviso_hora from "./j1-nivel0-hora.js";
import j1n1 from "./j1-nivel1.js";
import j1n2 from "./j1-nivel2.js";
import j1n3 from "./j1-nivel3.js";
import j1n4 from "./j1-nivel4.js";
import j1n5 from "./j1-nivel5.js";

//colocar finais e cenas do jogador 2

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("logo-empresa", logoempresa);
    this.scene.add("capa-do-jogo", capa_do_jogo);
    this.scene.add("qualjogador", qualjogador);
    this.scene.add("carregamento", carregamento);
    this.scene.add("aviso-hora", aviso_hora);
    this.scene.add("j1n1", j1n1);
    this.scene.add("j1n2", j1n2);
    this.scene.add("j1n3", j1n3);
    this.scene.add("j1n4", j1n4);
    this.scene.add("j1n5", j1n5);

  //colocar finais e cenas do jogador 2

    this.scene.start("logo-empresa");
  }
}

window.onload = () => {
  window.game = new Game();
};
