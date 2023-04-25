import config from "./config.js";

import logo_empresa from "./1cena-logoempresa.js";
import capa_do_jogo from "./2capa-do-jogo.js";
import cena_carregamento from "./3cena-carregamento.js";
import aviso_hora from "./4cena-aviso-hora.js";
import principal from "./5cena-nivel1.js";
//import fim_do_jogo from "./cena-finaltriste.js";
//import final_feliz from "./10cena-finalfeliz.js";
//import logoempresa from "./1cena-logoempresa.js";

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
