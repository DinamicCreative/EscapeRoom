export default class capa_do_jogo extends Phaser.Scene {
  constructor() {
    super("capa-do-jogo");
  }

  preload() {
    this.load.image("capa", "./assets/capa.png");

    this.load.image(
      "fundoqualjogador",
      "./assets/cenaqualjogador/fundoqualjogador.png"
    );
    this.load.image(
      "botaoauditorio",
      "./assets/cenaqualjogador/botaoauditorio.png"
    );
    this.load.image(
      "botaostand",
      "./assets/cenaqualjogador/botaostand.png"
    );

    this.load.spritesheet("vela1", "./assets/vela.png", {
      frameWidth: 450,
      frameHeight: 800,
    });

    this.load.image(
      "botao-desistencia",
      "./assets/desistir/botaodesistencia.png"
    );
    this.load.image(
      "caixa-desistencia",
      "./assets/desistir/caixadesistencia.png"
    );

    this.load.image(
      "botao-nao",
      "./assets/desistir/botaonao.png"
    );

    this.load.image(
      "botao-sim",
      "./assets/desistir/botaosim.png"
    );

    this.load.image(
      "aviso-hora1",
      "./assets/cenaavisohora.png"
    );

    this.load.image(
      "j1n1",
      "./assets/jogador1/j1-nivel1.png"
    );

    this.load.image(
      "j1n2",
      "./assets/jogador1/j1-nivel2.png"
    );

    this.load.image(
      "j1n3", 
      "./assets/jogador1/j1-nivel3.png"
    );

    this.load.image(
      "j1n4",
      "./assets/jogador1/j1-nivel4.png"
    );

    this.load.image(
      "j1n5",
      "./assets/jogador1/j1-nivel5.png"
    );

    this.load.image(
      "j2n1",
      "./assets/jogador2/j2-nivel1.png"
    );

    this.load.image(
      "j2n2",
      "./assets/jogador2/j2-nivel2.png"
    );

    this.load.image(
      "j2n3",
      "./assets/jogador2/j2-nivel3.png"
    );

    this.load.image(
      "j2n4",
      "./assets/jogador2/j2-nivel4.png"
    );

    this.load.image(
      "j2n5",
      "./assets/jogador2/j2-nivel5.png"
    );

    this.load.image(
      "finaldesistiu",
      "./assets/finais/desistiu.png"
    );

    this.load.image("finalfeliz",
      "./assets/finais/ganhou.png"
    );

    this.load.image(
      "finaltriste",
      "./assets/finais/perdeu.png"
    );

  }       

  create() {
    this.game.sala = 0;
    this.mensagem = this.add.text(100, 75, "", {
      fontFamily: "monospace",
      font: "32px Courier",
      fill: "#cccccc",
    });

    this.capa = this.add
      .image(225, 400, "capa")
      .setInteractive()
      .on("pointerdown", () => {
        this.capa.destroy();
        this.game.scene.start("fundoqualjogador");
      });

    this.game.socket.on("jogadores", (jogadores) => {
      if (jogadores.segundo) {
        this.mensagem.destroy();
        this.game.jogadores = jogadores;
        this.game.scene.start("principal");
      } else if (jogadores.primeiro) {
        this.grade.destroy();
        this.imagem.destroy();
        this.mensagem.setText("Aguardando segundo jogador...");
      }
    });
  }

  upload() {}
}
