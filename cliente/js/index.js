import config from "./config.js";
import logoempresa from "./1cena-logoempresa.js";
import capa_do_jogo from "./2capa-do-jogo.js";
import qualjogador from "./3cena-qualjogador.js";

import carregamento1 from "./jogador1/j1-nivel0-carregamento.js";
import aviso_hora1 from "./jogador1/j1-nivel0-hora.js";
import j1n1 from "./jogador1/j1-nivel1.js";
import j1n2 from "./jogador1/j1-nivel2.js";
import j1n3 from "./jogador1/j1-nivel3.js";
import j1n4 from "./jogador1/j1-nivel4.js";
import j1n5 from "./jogador1/j1-nivel5.js";


import carregamento2 from "./jogador2/j2-nivel0-carregamento.js";

/*
cenas jogador 2
import aviso_hora2 from "./j2-nivel0-hora.js";
import j2n1 from "./j2-nivel1.js";
import j2n2 from "./j2-nivel2.js";
import j2n3 from "./j2-nivel3.js";
import j2n4 from "./j2-nivel4.js";
import j2n5 from "./j2-nivel5.js";

- finais
import finaldesistiu from "./finaldesistiu.js";
import finalfeliz from "./finalfeliz.js";
import finaltriste from "./finaltriste.js";

*/


class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("cena-logoempresa", logoempresa);
    this.scene.add("capa-do-jogo", capa_do_jogo);
    this.scene.add("fundoqualjogador", qualjogador);

    //Jogador 1

    this.scene.add("carregamento1", carregamento1);
    this.scene.add("aviso-hora1", aviso_hora1);
    this.scene.add("j1n1", j1n1);
    this.scene.add("j1n2", j1n2);
    this.scene.add("j1n3", j1n3);
    this.scene.add("j1n4", j1n4);
    this.scene.add("j1n5", j1n5);

    
    
    //- Jogador 2
    
    this.scene.add("carregamento", carregamento2);
    /*this.scene.add("aviso-hora", aviso_hora2);
    this.scene.add("j2n1", j2n1);
    this.scene.add("j2n2", j2n2);
    this.scene.add("j2n3", j2n3);
    this.scene.add("j2n4", j2n4);
    this.scene.add("j2n5", j2n5);
    
    */

    /*

    - Finais

    this.scene.add("finaldesistiu", finaldesistiu);
    this.scene.add("finalfeliz", finalfeliz);
    this.scene.add("finaltriste", finaltriste);
    
    */

    this.scene.start("cena-logoempresa");
  }
}

window.onload = () => {
  window.game = new Game();
};
