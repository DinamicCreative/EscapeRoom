export default class j1n1 extends Phaser.Scene {
  constructor() {
    super("j1n1");
  }

  preload() {
    this.load.image("j1n1", "./assets/jogador1/j1-nivel1.png");
  }

  create() {
    this.capa = this.add
      .image(225, 400, "j1n1")
      .setInteractive()
      .on("pointerdown", () => {
        this.capa.destroy();
        this.game.scene.start("j1n2");
      });
  }

  upload() {}
}
