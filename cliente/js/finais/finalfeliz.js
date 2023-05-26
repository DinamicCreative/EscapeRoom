export default class finalfeliz extends Phaser.Scene {
  constructor() {
    super("finalfeliz");
  }

  preload() {
    this.load.image("finalfeliz", "./assets/finais/ganhou.png");
  }

  create() {
    this.finalfeliz = this.add.image(225, 400, "finalfeliz");
  }

  update() {}
}
