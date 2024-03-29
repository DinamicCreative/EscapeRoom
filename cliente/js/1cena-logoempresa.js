export default class logoempresa extends Phaser.Scene {
  constructor () {
    super("cena-logoempresa");
  }

  preload () {
    this.load.image("logoempresa", "./assets/logoempresa.png");
  }

  create () {
    this.logo = this.add.sprite(225, 400, "logoempresa");

    /* Contagem regressiva */
    this.timer = 2;

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.countdown,
      callbackScope: this,
      loop: true,
    });
  }

  countdown () {
    /* Reduz o contador em 1 segundo */
    this.timer -= 1;

    /* Quando chegar a zero, troca a cena */
    if (this.timer === 0) {
      this.timedEvent.destroy();
      //   this.timerText.destroy();
      this.logo.destroy();
      this.game.scene.stop("cena-logoempresa")
      this.game.scene.start("capa-do-jogo");
    }
    /*else {
      this.timerText.setText(this.timer);
    }*/
  }
}
