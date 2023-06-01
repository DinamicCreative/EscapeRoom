import config from "./config.js";
import logoempresa from "./1cena-logoempresa.js";
import capa_do_jogo from "./2capa-do-jogo.js";
import qualjogador from "./3cena-qualjogador.js";

/* Jogador 1 */
import carregamento1 from "./jogador1/j1-nivel0-carregamento.js";
import aviso_hora1 from "./jogador1/j1-nivel0-hora.js";
import j1n1 from "./jogador1/j1-nivel1.js";
import j1n2 from "./jogador1/j1-nivel2.js";
import j1n3 from "./jogador1/j1-nivel3.js";
import j1n4 from "./jogador1/j1-nivel4.js";
import j1n5 from "./jogador1/j1-nivel5.js";

/* Jogador 2 */
import carregamento2 from "./jogador2/j2-nivel0-carregamento.js";
import aviso_hora2 from "./jogador2/j2-nivel0-hora.js";
import j2n1 from "./jogador2/j2-nivel1.js";
import j2n2 from "./jogador2/j2-nivel2.js";
import j2n3 from "./jogador2/j2-nivel3.js";
import j2n4 from "./jogador2/j2-nivel4.js";
import j2n5 from "./jogador2/j2-nivel5.js";

// Finais
import finalfeliz from "./finais/finalfeliz.js";
import finaldesistiu from "./finais/finaldesistiu.js";
import finaltriste from "./finais/finaltriste.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.socket = io();
    //this.socket = io.connect({path: "/adcipt20231/socket.io"});

    this.socket.on("connect", () => {
      console.log("Conectado ao servidor para troca de mensagens.");
    });

    this.cliente_mqtt = mqtt.connect("wss://ifsc.digital/ws/");

    /* 02:50 UTC = 23:50 BRT */
    this.data = new Date("2023-12-31T23:50:00.000");
    this.data_formatada = "";
    setInterval(() => {
      this.data = new Date(this.data.getTime() + 1000); // Incrementa em 1 segundo o relógio
      this.data_formatada =
        this.data.getHours() +
        ":" +
        (this.data.getMinutes() < 10 ? "0" : "") + // Adiciona 0 quando necessário
        this.data.getMinutes() +
        ":" +
        (this.data.getSeconds() < 10 ? "0" : "") + // Adiciona 0 quando necessário
        this.data.getSeconds();
    }, 1000);

    /* Lista de servidor(es) ICE */
    this.ice_servers = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
    /* Associação de objeto HTML de áudio e objeto JS */
    this.audio = document.querySelector("audio");

    /* Cenas comuns */
    this.scene.add("cena-logoempresa", logoempresa);
    this.scene.add("capa-do-jogo", capa_do_jogo);
    this.scene.add("fundoqualjogador", qualjogador);

    /* Jogador 1 */
    this.scene.add("carregamento1", carregamento1);
    this.scene.add("aviso-hora1", aviso_hora1);
    this.scene.add("j1n1", j1n1);
    this.scene.add("j1n2", j1n2);
    this.scene.add("j1n3", j1n3);
    this.scene.add("j1n4", j1n4);
    this.scene.add("j1n5", j1n5);
    this.scene.add("finalfeliz", finalfeliz);

    /* Jogador 2 */
    this.scene.add("carregamento2", carregamento2);
    this.scene.add("aviso-hora2", aviso_hora2);
    this.scene.add("j2n1", j2n1);
    this.scene.add("j2n2", j2n2);
    this.scene.add("j2n3", j2n3);
    this.scene.add("j2n4", j2n4);
    this.scene.add("j2n5", j2n5);

    /* Finais */
    this.scene.add("finaldesistiu", finaldesistiu);
    this.scene.add("finaltriste", finaltriste);

    this.scene.start("cena-logoempresa");
  }
}

window.onload = () => {
  window.game = new Game();
};
