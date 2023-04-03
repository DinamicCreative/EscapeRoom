export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {
    this.load.spritesheet("faca", "./assets/faca.png", {
      frameWidth: 128,
      frameHeight: 128
    });
  }

  create() {
    this.faca = this.add
      .sprite(400, 225, "faca")
      .setInteractive()
      .on("pointerdown", () => {
        this.faca.destroy();
        this.game.scene.start("principal");
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
  