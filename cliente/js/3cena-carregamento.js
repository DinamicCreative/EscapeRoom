export default class cena_carregamento extends Phaser.Scene {
  constructor() {
    super("cena-carregamento");
  }

  preload() {
    this.load.spritesheet("faca", "./assets/faca.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
  }

  create() {
    this.faca = this.add
      .sprite(225, 400, "faca")
      .setInteractive()
      .on("pointerdown", () => {
        this.faca.destroy();
        this.game.scene.start("aviso-hora");
      });

    this.anims.create({
      key: "faca-pingando",
      frames: this.anims.generateFrameNumbers("faca", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    //
    this.faca.anims.play("faca-pingando", true);
  }

  upload() {}
}
