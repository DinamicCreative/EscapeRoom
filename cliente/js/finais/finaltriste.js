export default class finaltriste extends Phaser.Scene {
  constructor() {
    super("finaltriste");
  }

  preload() {
    this.load.image("finaltriste", "./assets/finais/perdeu.png");
  }

  create() {
    this.triste = this.add.image(225, 400, "finaltriste");
    let conn = this.game.localConnection || this.game.remoteConnection;
    conn.close();
    this.game.socket.disconnect();
  }

  update() {}
}
