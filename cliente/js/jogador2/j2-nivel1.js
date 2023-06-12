export default class j2n1 extends Phaser.Scene {
  constructor() {
    super("j2n1");
  }

  preload() {
    this.load.image("j2n1", "./assets/jogador2/j2-nivel1.png");

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
    this.load.audio("alarme", "./assets/alarme.mp3");
    this.load.audio("pop", "./assets/pop.mp3");
    this.load.audio("musica", "./assets/musica.mp3");

  }

  create() {

    this.musica = this.sound.add("musica");
    this.musica.play();
    
    this.j2n1 = this.add
      .image(225, 400, "j2n1")
      .setInteractive()
      .on("pointerdown", () => {
        this.j2n1.destroy();
        this.botao_desistencia.destroy();
        this.game.scene.start("j2n2");
      });
    
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
  
    this.timerText = this.add.text(360, 10, this.timer, {
      fill: "#FF0000",
    });
  }

  update() {
    this.timerText.setText(this.game.data_formatada);
  }
}
