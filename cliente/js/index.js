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

      /* Verifica se já chegou a meia noite */
      //this.fimDoJogo = new Date("2024-01-01T00:00:00.000");
      this.fimDoJogo = new Date("2024-01-01T00:00:00.000");
      if (this.data.getTime() === this.fimDoJogo.getTime()) {
        this.scene.start("finaltriste");
      }
    }, 1000);

    let iceServers;
    if (window.location.host === "ifsc.digital") {
      this.socket = io.connect({ path: "/EscapeRoom/socket.io/" });

      iceServers = [
        {
          urls: "stun:ifsc.digital",
        },
        {
          urls: "turns:ifsc.digital",
          username: "adcipt",
          credential: "adcipt20231",
        },
      ];
    } else {
      this.socket = io();

      iceServers = [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ];
    }
    this.ice_servers = { iceServers };
    this.audio = document.querySelector("audio");

    this.cliente_mqtt = mqtt.connect("wss://ifsc.digital/ws/");
    this.mqtt_topic = "adcipt20231/escape-room";

    this.cliente_mqtt.on("connect", () => {
      console.log("Conectado ao servidor MQTT.");
      this.cliente_mqtt.subscribe(this.mqtt_topic);
    });

    this.cliente_mqtt.on("message", (topic, payload) => {
      payload = payload.toString();
      if (payload === "nivel0") {
        //Cena da vela para a cena da hora
        if (this.jogador === "stand") {
          this.scene.stop("carregamento1");
          this.scene.start("aviso-hora1");
        } else if (this.jogador === "auditorio") {
          this.scene.stop("carregamento2");
          this.scene.start("aviso-hora2");
        }

        //Cena da hora muda pro Nível 1 por timer
      } else if (payload === "nivel1") {
        if (this.jogador === "stand") {
          //Cena do nível 1 mudando para cena Nível 2
          this.scene.stop("j1n1");
          this.scene.start("j1n2");
        } else if (this.jogador === "auditorio") {
          this.scene.stop("j2n1");
          this.scene.start("j2n2");
        }
      } else if (payload === "nivel2") {
        if (this.jogador === "stand") {
          //Cena do nível 2 mudando para cena Nível 3
          this.scene.stop("j1n2");
          this.scene.start("j1n3");
        } else if (this.jogador === "auditorio") {
          this.scene.stop("j2n2");
          this.scene.start("j2n3");
        }

        //Muda do Nível 3 para o Nível 4 por timer
      } else if (payload === "nivel4") {
        if (this.jogador === "stand") {
          //Cena do nível 4 mudando para cena Nível 5
          this.scene.stop("j1n4");
          this.scene.start("j1n5");
        } else if (this.jogador === "auditorio") {
          this.scene.stop("j2n4");
          this.scene.start("j2n5");
        }
      } else if (payload === "nivel5") {
        if (this.jogador === "stand") {
          //Indo para final vitorioso depois do Nível 5
          this.scene.stop("j1n5");
          this.scene.start("finalfeliz");
        } else if (this.jogador === "auditorio") {
          this.scene.stop("j2n5");
          this.scene.start("finalfeliz");
        }
      }
    });

    this.socket.on("connect", () => {
      console.log("Conectado ao servidor do jogo para troca de mensagens.");
    });

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
