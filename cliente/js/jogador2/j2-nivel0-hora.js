export default class aviso_hora2 extends Phaser.Scene {
  constructor() {
    super("aviso-hora2");
  }

  preload() {
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

    this.load.image("aviso-hora2", "./assets/cenaavisohora.png");
  }

  create() {
    /* Contagem regressiva */
    this.timer = 10;

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.countdown,
      callbackScope: this,
      loop: true,
    });

    this.timerText = this.add.text(225, 400, this.timer, {
      fontSize: "64px",
      fill: "#FFFFFF",
    });

    this.avisohora2 = this.add.image(225, 400, "aviso-hora2");

    this.botao_desistencia = this.add
      .image(400, 50, "botao-desistencia")
      .setInteractive()
      .on("pointerdown", () => {
        this.botao_desistencia.destroy();
        this.botao_desistencia = this.add.image(225, 400, "caixa-desistencia");
        this.botao_desistencia = this.add
          .image(150, 450, "botao-sim")
          .setInteractive()
          .on("pointerdown", () => {
            this.game.scene.start("finaldesistiu");
          });
        this.botao_desistencia = this.add
          .image(300, 450, "botao-nao")
          .setInteractive()
          .on("pointerdown", () => {
            this.botao_desistencia.destroy();
          });
      });
  }

  upload() {}

  countdown() {
    /* Reduz o contador em 1 segundo */
    this.timer -= 1;

    /* Quando chegar a zero, troca a cena */
    if (this.timer === 0) {
      this.timedEvent.destroy();
      this.timerText.destroy();
      this.aviso_hora2.destroy();
      this.botao_desistencia.destroy();
      this.game.scene.start("j2n1");
    } else {
      this.timerText.setText(this.timer);
    }
  }
}
