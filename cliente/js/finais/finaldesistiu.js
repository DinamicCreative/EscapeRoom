export default class finaldesistiu extends Phaser.Scene {
  constructor() {
    super("finaldesistiu");
  }

  preload() {
    this.load.image("finaldesistiu", "./assets/finais/desistiu.png");
  }

  create() {
    this.finaldesistiu = this.add.image(225, 400, "finaldesistiu");
    let conn = this.game.localConnection || this.game.remoteConnection;
    conn.close();
    this.game.socket.disconnect();
  }

  update() {}
}
