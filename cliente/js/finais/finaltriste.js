export default class finaltriste extends Phaser.Scene {
  constructor() {
    super("finaltriste");
  }

  preload() {
    this.load.spritesheet("faca", "./assets/faca.png");
  }

  create() {
    this.imagem = this.add
      .sprite(400, 225, "faca")
      .setTint(0xff0000)
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.texto.destroy();
        this.game.scene.start("principal");
      });

    this.texto = this.add.text(490, 50, "Fim do jogo.", {
      fill: "#000000",
    });
  }

  upload() {}
}
