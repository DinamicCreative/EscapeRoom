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
    this.vela2 = this.add.sprite(225, 350, "vela2");

    this.anims.create({
      key: "vela2-mexendo",
      frames: this.anims.generateFrameNumbers("vela2", {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });
    
    this.vela2.anims.play("vela2-mexendo", true);

    this.game.cliente_mqtt.on("message", (topic, payload) => {
      if (topic === this.game.mqtt_prefix + "nivel0") {
        this.vela1.destroy();
        this.game.scene.start("aviso-hora2");
      }
    });
  }
}
