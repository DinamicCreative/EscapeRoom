export default class j1n5 extends Phaser.Scene {
  constructor() {
    super("j1n5");
  }

  preload() {
    this.load.image("j1n5", "./assets/jogador1/j1-nivel5.png");

    this.load.image(
      "botao-desistencia",
      "./assets/desistir/botaodesistencia.png"
    );
    this.load.image(
      "caixa-desistencia",
      "./assets/desistir/caixadesistencia.png"
    );
    this.load.image("botao-nao", "./assets/desistir/botaonao.png");
    this.load.image("botao-sim", "./assets/desistir/botaosim.png");
  }

  create() {
    this.j1n5 = this.add
      .image(225, 400, "j1n5")
      .setInteractive()
      .on("pointerdown", () => {
        this.j1n4.destroy();
        this.botao_desistencia.destroy();
        this.game.scene.start("finalfeliz");
      });

    this.botao_desistencia = this.add
      .image(400, 50, "botao-desistencia")
      .setInteractive()
      .on("pointerdown", () => {
        this.botao_desistencia.destroy();
        this.botao_desistencia = this.add.image(225, 400, "caixa-desistencia");
        this.botao_desistencia = this.add.image(150, 450, "botao-sim");
        this.botao_desistencia = this.add.image(300, 450, "botao-nao");
      });
  }

  upload() {}
}
