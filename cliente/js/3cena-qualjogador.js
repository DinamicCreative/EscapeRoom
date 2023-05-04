export default class qualjogador extends Phaser.Scene {
  constructor() {
    super("fundoqualjogador");
  }

  preload() {
    this.load.image("fundoqualjogador", "./assets/fundoqualjogador.png");
  }

  create() {
    this.capa = this.add
      .image(225, 400, "fundoqualjogador")
      .setInteractive()
      .on("pointerdown", () => {
        this.capa.destroy();
        this.game.scene.start("carregamento");
      });
        
        //Add 2 spritesheets ---> "botaostand.png" e "botaoauditorio.png"
  }

  upload() {}
}
