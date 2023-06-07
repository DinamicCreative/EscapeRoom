export default class qualjogador extends Phaser.Scene {
  constructor() {
    super("fundoqualjogador");
  }

  preload() {
    this.load.image(
      "fundoqualjogador",
      "./assets/cenaqualjogador/fundoqualjogador.png"
    );
    this.load.image(
      "botaoauditorio",
      "./assets/cenaqualjogador/botaoauditorio.png"
    );
    this.load.image("botaostand", "./assets/cenaqualjogador/botaostand.png");
    //this.load.audio("pop", "./assets/pop.mp3");
  }

  create() {
    this.fundo = this.add.image(225, 400, "fundoqualjogador");

    this.botaostand = this.add
      .image(125, 400, "botaostand")
      .setInteractive()
      .on("pointerdown", () => {
        this.botaostand.destroy();
        //this.pop.play();
        this.botaoauditorio.destroy();
        this.fundo.destroy();
        this.game.sala = 0;
        this.game.socket.emit("entrar-na-sala", this.game.sala);
        this.game.scene.start("carregamento1");
      });

    this.botaoauditorio = this.add
      .image(325, 400, "botaoauditorio")
      .setInteractive()
      .on("pointerdown", () => {
        this.botaoauditorio.destroy();
        this.botaostand.destroy();
        this.fundo.destroy();
        this.game.sala = 0;
        this.game.socket.emit("entrar-na-sala", this.game.sala);
        this.game.scene.start("carregamento2");
      });

    this.game.socket.on("jogadores", (jogadores) => {
      console.log(jogadores);
      this.game.jogadores = jogadores;

      if (this.game.jogadores.primeiro === this.game.socket.id) {
        /* Captura de áudio */
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((stream) => {
            this.game.midias = stream;
          })
          .catch((error) => console.log(error));
      } else if (this.game.jogadores.segundo === this.game.socket.id) {
        /* Captura de áudio */
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((stream) => {
            /* Consulta ao(s) servidor(es) ICE */
            this.game.localConnection = new RTCPeerConnection(
              this.game.ice_servers
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

            /* Associação de mídia com conexão remota */
            stream
              .getTracks()
              .forEach((track) =>
                this.game.localConnection.addTrack(track, stream)
              );

            /* Oferta de mídia */
            this.game.localConnection
              .createOffer()
              .then((offer) =>
                this.game.localConnection.setLocalDescription(offer)
              )
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
      }
    });

    /* Recebimento de oferta de mídia */
    this.game.socket.on("offer", (description) => {
      this.game.remoteConnection = new RTCPeerConnection(this.game.ice_servers);

      /* Contraoferta de candidatos ICE */
      this.game.remoteConnection.onicecandidate = ({ candidate }) => {
        candidate &&
          this.game.socket.emit("candidate", this.game.sala, candidate);
      };

      /* Associação com o objeto HTML de áudio */
      this.game.remoteConnection.ontrack = ({ streams: [stream] }) => {
        this.game.audio.srcObject = stream;
      };

      /* Associação de mídia com conexão remota */
      this.game.midias
        .getTracks()
        .forEach((track) =>
          this.game.remoteConnection.addTrack(track, this.game.midias)
        );

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

  update() { }
}
