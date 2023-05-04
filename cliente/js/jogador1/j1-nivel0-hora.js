export default class aviso_hora extends Phaser.Scene {
  constructor() {
    super("aviso-hora");
  }

  preload() {
    this.load.spritesheet("botao-desistencia", "./assets/desistir/botaodesistencia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("caixa-desistencia", "./assets/desistir/caixadesistencia.png" {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("botao-nao", "./assets/desistir/botaonao.png" {
      frameWidth: 64,
      frameHeight: 64,
    });
    
    this.load.spritesheet("botao-sim", "./assets/desistir/botaosim.png" {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.image("aviso-hora", "./assets/cenaavisohora.png");

  }

  create() {
    this.botao-desistencia = this.add
      .image(400, 50, "botao-desistencia")
      .setInteractive()
      .on("pointerdown", () => {
        this.desistir = this.add
          .image(225, 400, "caixadesistencia")
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
