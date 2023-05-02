import config from "./config.js";

import cena-logoempresa from "./1cena-logoempresa.js";
import capa_do_jogo from "./2capa-do-jogo.js";
import cena-qualjogador from "./3cena-qualjogador.js";
import carregamento from "./j1-nivel0-carregamento.js";
import aviso_hora from "./j1-nivel0-hora.js";
import aviso_hora from "./4cena-aviso-hora.js";
import j1n1 from "./j1-nivel1.js";
import j1n2 from "./j1-nivel2.js";
import j1n3 from "./j1-nivel3.js";
import j1n4 from "./j1-nivel4.js";
import j1n5 from "./j1-nivel5.js";

//botar finais

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("logo-empresa", logo_empresa);
    this.scene.add("capa-do-jogo", capa_do_jogo);
    this.scene.add("cena-carregamento", cena_carregamento);
    this.scene.add("aviso-hora", aviso_hora);
    this.scene.add("cenanivel1", cenanivel1);
    //this.scene.add("fim-do-jogo", fim_do_jogo);
    //this.scene.add("final-feliz", final_feliz);

    this.scene.start("logo-empresa");
  }
}

window.onload = () => {
  window.game = new Game();
};
