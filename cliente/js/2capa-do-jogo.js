export default class capa_do_jogo extends Phaser.Scene {
  constructor() {
    super("capa-do-jogo");
  }

  preload() {
    this.load.image("capa", "./assets/capa.png");
  }

  create() {
    this.capa = this.add
      .image(225, 400, "capa")
      .setInteractive()
      .on("pointerdown", () => {
        this.capa.destroy();
        this.game.scene.start("cena-carregamento");
      });
  }

  upload() {}
}
