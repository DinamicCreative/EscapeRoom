export default class finalfeliz extends Phaser.Scene {
    constructor() {
      super("final-feliz");
    }
  
    preload() {
      this.load.spritesheet("faca", "./assets/faca.png");
    }
  
    create() {
      this.imagem = this.add
        .sprite(400, 225, "faca")
        .setTint(0xffff00)
        .setInteractive()
        .on("pointerdown", () => {
          this.imagem.destroy();
          this.texto.destroy();
          this.game.scene.start("abertura");
        });
  
      this.texto = this.add.text(490, 50, "Final feliz!", {
        fill: "#000000",
      });
    }
  
    upload() {}
  }