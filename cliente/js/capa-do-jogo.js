export default class cena1 extends Phaser.Scene {
  constructor() {
    super("cena1");
  }

  preload() {
    this.load.image("capa", "./assets/capa.jpg");
  }

  create() {
    this.capa = this.add
      .image(225, 400, "capa")
      .setInteractive()
      .on("pointerdown", () => {
        this.capa.destroy();
        this.game.scene.start("logo");
      });
  }

  upload() {}
}
