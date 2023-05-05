//Sai da cena quando o sensor do auditório sinalizar que o jogador 2 chegou

export default class carregamento1 extends Phaser.Scene {
  constructor() {
    super("carregamento1");
  }

  preload() {
    this.load.spritesheet("vela", "./assets/vela.png", {
      frameWidth: 450,
      frameHeight: 800,
    });
  }

  create() {
    this.vela = this.add
      .sprite(225, 350, "vela")
      .setInteractive()
      .on("pointerdown", () => {
        this.vela.destroy(); 
        this.game.scene.start("aviso-hora1");
      });

    this.anims.create({
      key: "vela-mexendo",
      frames: this.anims.generateFrameNumbers("vela", {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });
    //
    this.vela.anims.play("vela-mexendo", true);
  }

  upload() {}
}
