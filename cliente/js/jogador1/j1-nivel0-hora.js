export default class aviso_hora1 extends Phaser.Scene {
  constructor() {
    super("aviso-hora1");
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
    this.load.image("aviso-hora1", "./assets/cenaavisohora.png");
    this.load.audio("alarme", "./assets/alarme.mp3");
    this.load.audio("pop", "./assets/pop.mp3");
    this.load.audio("musica", "./assets/musica.mp3");
  }

  create() {
    this.musica = this.sound.add("musica");
    this.musica.play();

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

    this.avisohora1 = this.add.image(225, 400, "aviso-hora1");

    this.alarme = this.sound.add("alarme");
    this.pop = this.sound.add("pop");

    this.botao_desistencia = this.add
      .image(415, 770, "botao-desistencia")
      .setInteractive()
      .on("pointerdown", () => {
        this.pop.play();
        this.caixa_desistencia = this.add.image(225, 415, "caixa-desistencia");
        this.sim_desistencia = this.add
          .image(150, 450, "botao-sim")
          .setInteractive()
          .on("pointerdown", () => {
            this.alarme.play();
            this.botao_desistencia.destroy();
            this.game.scene.start("finaldesistiu");
          });
        this.nao_desistencia = this.add
          .image(300, 450, "botao-nao")
          .setInteractive()
          .on("pointerdown", () => {
            this.pop.play();
            this.nao_desistencia.destroy();
            this.sim_desistencia.destroy();
            this.caixa_desistencia.destroy();
          });
      });
  }

  update() { }

  countdown() {
    /* Reduz o contador em 1 segundo */
    this.timer -= 1;

    /* Quando chegar a zero, troca a cena */
    if (this.timer === 0) {
      this.timedEvent.destroy();
      this.timerText.destroy();
      this.avisohora1.destroy();
      this.botao_desistencia.destroy();
      this.game.scene.stop("aviso-hora1")
      this.game.scene.start("j1n1");
    } else {
      this.timerText.setText(this.timer);
    }
  }
}
