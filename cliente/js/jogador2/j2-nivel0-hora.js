export default class aviso_hora2 extends Phaser.Scene {
  constructor() {
    super("aviso-hora2");
  }

  preload() {
    this.load.image(
      "botao-desistencia",
      "./assets/desistir/botaodesistencia.png"
    );
    this.load.image(
      "caixa-desistencia",
      "./assets/desistir/caixadesistencia.png"
    );
    this.load.image("botao-nao", "./assets/desistir/botaonao.png");
    this.load.image("botao-sim", "./assets/desistir/botaosim.png");
    this.load.image("aviso-hora2", "./assets/cenaavisohora.png");
  }

  create() {
    /* Contagem regressiva */
    this.timer = 10;

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.countdown,
      callbackScope: this,
      loop: true,
    });

    this.timerText = this.add.text(225, 400, this.timer, {
      fontSize: "64px",
      fill: "#FFFFFF",
    });

    this.avisohora2 = this.add.image(225, 400, "aviso-hora2");

    this.botao_desistencia = this.add
      .image(415, 770, "botao-desistencia")
      .setInteractive()
      .on("pointerdown", () => {
        this.caixa_desistencia = this.add.image(225, 415, "caixa-desistencia");
        this.sim_desistencia = this.add
          .image(150, 450, "botao-sim")
          .setInteractive()
          .on("pointerdown", () => {
            this.botao_desistencia.destroy();
            this.game.scene.start("finaldesistiu");
          });
        this.nao_desistencia = this.add
          .image(300, 450, "botao-nao")
          .setInteractive()
          .on("pointerdown", () => {
            this.nao_desistencia.destroy();
            this.sim_desistencia.destroy();
            this.caixa_desistencia.destroy();
          });
      });

    /* Captura de áudio */
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        console.log(stream);

        /* Consulta ao(s) servidor(es) ICE */
        this.game.localConnection = new RTCPeerConnection(
          this.game.ice_servers
        );

        /* Associação de mídia com conexão remota */
        stream
          .getTracks()
          .forEach((track) =>
            this.game.localConnection.addTrack(track, stream)
          );

        /* Oferta de candidatos ICE */
        this.game.localConnection.onicecandidate = ({ candidate }) => {
          candidate &&
            this.game.socket.emit("candidate", this.game.sala, candidate);
        };

        /* Associação com o objeto HTML de áudio */
        this.game.localConnection.ontrack = ({ streams: [stream] }) => {
          this.game.audio.srcObject = stream;
        };

        /* Oferta de mídia */
        this.game.localConnection
          .createOffer()
          .then((offer) => this.game.localConnection.setLocalDescription(offer))
          .then(() => {
            this.game.socket.emit(
              "offer",
              this.game.sala,
              this.game.localConnection.localDescription
            );
          });

        this.game.midias = stream;
      })
      .catch((error) => console.log(error));

    /* Recebimento de oferta de mídia */
    this.game.socket.on("offer", (description) => {
      this.game.remoteConnection = new RTCPeerConnection(this.ice_servers);

      /* Associação de mídia com conexão remota */
      this.game.midias
        .getTracks()
        .forEach((track) =>
          this.game.remoteConnection.addTrack(track, this.game.midias)
        );

      /* Contraoferta de candidatos ICE */
      this.game.remoteConnection.onicecandidate = ({ candidate }) => {
        candidate &&
          this.game.socket.emit("candidate", this.game.sala, candidate);
      };

      /* Associação com o objeto HTML de áudio */
      let midias = this.game.midias;
      this.game.remoteConnection.ontrack = ({ streams: [midias] }) => {
        this.game.audio.srcObject = this.game.midias;
      };

      /* Contraoferta de mídia */
      this.game.remoteConnection
        .setRemoteDescription(description)
        .then(() => this.game.remoteConnection.createAnswer())
        .then((answer) =>
          this.game.remoteConnection.setLocalDescription(answer)
        )
        .then(() => {
          this.game.socket.emit(
            "answer",
            this.game.sala,
            this.game.remoteConnection.localDescription
          );
        });
    });

    /* Recebimento de contraoferta de mídia */
    this.game.socket.on("answer", (description) => {
      this.game.localConnection.setRemoteDescription(description);
    });

    /* Recebimento de candidato ICE */
    this.game.socket.on("candidate", (candidate) => {
      let conn = this.game.localConnection || this.game.remoteConnection;
      conn.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }

  update() {}

  countdown() {
    /* Reduz o contador em 1 segundo */
    this.timer -= 1;

    /* Quando chegar a zero, troca a cena */
    if (this.timer === 0) {
      this.timedEvent.destroy();
      this.timerText.destroy();
      this.avisohora2.destroy();
      this.botao_desistencia.destroy();
      this.game.scene.start("j2n1");
    } else {
      this.timerText.setText(this.timer);
    }
  }
}
