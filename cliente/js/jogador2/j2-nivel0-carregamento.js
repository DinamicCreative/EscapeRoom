//Sai da cena quando o sensor do auditório sinalizar que o jogador 2 chegou

export default class carregamento2 extends Phaser.Scene {
  constructor() {
    super("carregamento2");
  }

  preload() {
    this.load.spritesheet("vela2", "./assets/vela.png", {
      frameWidth: 450,
      frameHeight: 800,
    });
  }

  create() {
    this.faca = this.add
      .sprite(225, 350, "vela2")
      .setInteractive()
      .on("pointerdown", () => {
        this.faca.destroy();
        this.game.scene.start("aviso-hora2");
      });

    this.anims.create({
      key: "vela2-mexendo",
      frames: this.anims.generateFrameNumbers("vela2", {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });
    //
    this.faca.anims.play("vela2-mexendo", true);
  }

  upload() {}
}
