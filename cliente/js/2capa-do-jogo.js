export default class capa_do_jogo extends Phaser.Scene {
  constructor () {
    super("capa-do-jogo");
  }

  preload () {
    this.load.image("capa", "./assets/capa.png");

    this.load.image(
      "fundoqualjogador",
      "./assets/cenaqualjogador/fundoqualjogador.png"
    );
    this.load.image(
      "botaoauditorio",
      "./assets/cenaqualjogador/botaoauditorio.png"
    );
    this.load.image("botaostand", "./assets/cenaqualjogador/botaostand.png");

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

    this.load.spritesheet("vela2", "./assets/vela.png", {
      frameWidth: 450,
      frameHeight: 800,
    });
    this.load.audio("spitir", "./assets/spirit.mp3");
    this.load.audio("alarme", "./assets/alarme.mp3");
    this.load.audio("musica", "./assets/musica.mp3");

    this.load.image("aviso-hora2", "./assets/cenaavisohora.png");
  }

  create () {
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
        this.scale.startFullscreen();
        this.game.scene.stop("capa-do-jogo")
        this.game.scene.start("fundoqualjogador");
      });
  }

  update () { }
}
