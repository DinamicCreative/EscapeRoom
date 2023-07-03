export default class finalfeliz extends Phaser.Scene {
  constructor () {
    super("finalfeliz");
  }

  preload () {
    this.load.image("finalfeliz", "./assets/finais/ganhou.png");
    this.load.audio("fim", "./assets/fim.mp3");
  }

  create () {
    this.sound.add("fim").play()

    this.finalfeliz = this.add.image(225, 400, "finalfeliz");
    let conn = this.game.localConnection || this.game.remoteConnection;
    if (conn) conn.close();
    this.game.socket.disconnect();
  }
}
