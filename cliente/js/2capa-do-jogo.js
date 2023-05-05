export default class capa_do_jogo extends Phaser.Scene {
  constructor() {
    super("capa-do-jogo");
  }

  preload() {
    this.load.image("capa", "./assets/capa.png");
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
