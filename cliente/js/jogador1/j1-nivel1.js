export default class j1n1 extends Phaser.Scene {
  constructor() {
    super("j1n1");
  }

  preload() {
    this.load.image("j1n1", "./assets/jogador1/j1-nivel1.png");

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
    this.j1n1 = this.add
      .image(225, 400, "j1n1")
      .setInteractive()
      .on("pointerdown", () => {
        this.j1n1.destroy();
        this.botao_desistencia.destroy();
        this.game.scene.start("j1n2");
      });

    this.botao_desistencia = this.add
      .image(415, 770, "botao-desistencia")
      .setInteractive()
      .on("pointerdown", () => {
        this.caixa_desistencia = this.add.image(225, 415, "caixa-desistencia");
        this.sim_desistencia = this.add
          .image(150, 450, "botao-sim")
          .setInteractive()
          .on("pointerdown", () => {
            this.botao_desistencia.destroy();
            this.game.scene.start("finaldesistiu");
          });
        this.nao_desistencia = this.add
          .image(300, 450, "botao-nao")
          .setInteractive()
          .on("pointerdown", () => {
            this.nao_desistencia.destroy();
            this.sim_desistencia.destroy();
            this.caixa_desistencia.destroy();
          });
      });

    this.timerText = this.add.text(360, 10, this.timer, {
      fill: "#FF0000",
    });

    /* "Zerando" o relógio (ver index.js) */
    this.game.data = new Date("2023-12-31T23:50:00.000");
  }

  update() {
    this.timerText.setText(this.game.data_formatada);
  }
}
