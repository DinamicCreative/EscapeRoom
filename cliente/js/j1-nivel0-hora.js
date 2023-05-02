export default class aviso_hora extends Phaser.Scene {
  constructor() {
    super("aviso-hora");
  }

  preload() {
    this.load.image("botao-alerta", "./assets/botaoalerta.png");
    this.load.image("desistir", "./assets/desistir.png");
  }

  create() {
    this.botao_alerta = this.add
      .image(400, 50, "botao-alerta")
      .setInteractive()
      .on("pointerdown", () => {
        this.desistir = this.add
          .image(225, 400, "desistir")
          .setInteractive()
          .on("pointerdown", () => {
            this.timedEvent.destroy();
            this.timerText.destroy();
            this.botao_alerta.destroy();
            this.desistir.destroy();
            this.game.scene.start("cena-desistencia");
          });
          
        /* Aparece uma tela em cima (pop-up) pedindo confirmação */
      });

    /* Contagem regressiva */
    this.timer = 10;

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.countdown,
      callbackScope: this,
      loop: true,
    });

    /* Relógio em tela */
    this.timerText = this.add.text(225, 400, this.timer, {
      fontSize: "64px",
      fill: "#FFFFFF",
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
      this.botao_alerta.destroy();
      this.game.scene.start("proxima-cena");
    } else {
      this.timerText.setText(this.timer);
    }
  }
}
