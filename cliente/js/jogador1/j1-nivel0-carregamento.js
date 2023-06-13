//Sai da cena quando o sensor do auditório sinalizar que o jogador 2 chegou

export default class carregamento1 extends Phaser.Scene {
  constructor() {
    super("carregamento1");
  }

  preload() {
    this.load.spritesheet("vela1", "./assets/vela.png", {
      frameWidth: 450,
      frameHeight: 800,
    });
  }

  create() {
    this.vela1 = this.add.sprite(225, 350, "vela1");

    this.anims.create({
      key: "vela1-mexendo",
      frames: this.anims.generateFrameNumbers("vela1", {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.vela1.anims.play("vela1-mexendo", true);

    this.game.cliente_mqtt.on("message", (topic, payload) => {
      if (topic === this.game.mqtt_prefix + "nivel0") {
        this.vela1.destroy();
        this.game.scene.start("aviso-hora1");
      }
    });
  }
}
