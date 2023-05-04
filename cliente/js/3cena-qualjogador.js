export default class qualjogador extends Phaser.Scene {
  constructor() {
    super("fundoqualjogador");
  }

  preload() {
    this.load.image(
      "fundoqualjogador",
      "./assets/cenaqualjogador/fundoqualjogador.png"
    );
    this.load.image(
      "botaoauditorio",
      "./assets/cenaqualjogador/botaoauditorio.png"
    );
        this.load.image(
      "botaostand",
      "./assets/cenaqualjogador/botaostand.png"
    );
  }

  create() {
    this.fundo = this.add
      .image(225, 400, "fundoqualjogador")
      .setInteractive()
      .on("pointerdown", () => {
        this.fundo.destroy();
        this.game.scene.start("carregamento");
      });
    
    this.botaostand = this.add
      .image(125, 400, "botaostand")
      .setInteractive()
      .on("pointerdown", () => {
        this.botaostand.destroy();
        this.game.scene.start("carregamento1");
      });
    
    this.botaoauditorio = this.add
      .image(325, 400, "botaoauditorio")
      .setInteractive()
      .on("pointerdown", () => {
        this.botaoauditorio.destroy();
        this.game.scene.start("carregamento2");
      });
    
  }

  upload() {}
}
