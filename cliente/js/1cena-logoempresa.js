export default class logo_empresa extends Phaser.Scene {
  constructor() {
    super("logo-empresa");
  }

  preload() {
    this.load.image("logoempresa", "./assets/logoempresa.png");
  }

  create() {
    this.faca = this.add
      .sprite(225, 400, "logoempresa")
      .setInteractive()
      .on("pointerdown", () => {
        this.faca.destroy();
        this.game.scene.start("capa-do-jogo");
      });
  }

  upload() {}
}
