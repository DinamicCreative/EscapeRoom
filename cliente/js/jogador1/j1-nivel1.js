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

    /* 02:50 UTC = 23:50 BRT */
    this.date = new Date("2024-01-01T02:50:00.000Z");
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.counter,
      callbackScope: this,
      loop: true,
    });

    this.timerText = this.add.text(360, 10, this.timer, {
      //fontSize: "64px",
      fill: "#FF0000",
    });
  }

  upload() {}

  counter() {
    this.date = new Date(this.date.getTime() + 1000); // Incrementa em 1 segundo o relógio
    this.timerText.setText(
      this.date.getHours() +
        ":" +
        (this.date.getMinutes() < 10 ? "0" : "") + // Adiciona 0 quando necessário
        this.date.getMinutes() +
        ":" +
        (this.date.getSeconds() < 10 ? "0" : "") + // Adiciona 0 quando necessário
        this.date.getSeconds()
    );
  }
}
