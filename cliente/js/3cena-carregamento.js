export default class cena_carregamento extends Phaser.Scene {
  constructor() {
    super("cena-carregamento");
  }

  preload() {
    this.load.spritesheet("vela", "./assets/vela.png", {
      frameWidth: 450,
      frameHeight: 800,
    });
  }

  create() {
    this.faca = this.add
      .sprite(225, 350, "vela")
      .setInteractive()
      .on("pointerdown", () => {
        this.faca.destroy();
        this.game.scene.start("aviso-hora");
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
    this.faca.anims.play("vela-mexendo", true);
  }

  upload() {}
}
