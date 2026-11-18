// Rasgos de cada jugador: caricaturas sin escudos ni logos reales.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};

  const PELO_MESSI = "#4a2a14";
  const BRILLO_MESSI = "#7b4a26";
  const BARBA_MESSI = "#573419";

  K.JUGADORES.messi = {
    nombre: "MESSI",
    numero: 10,
    piel: "#efb68c",
    camisa: "#ffffff",
    rayas: "#7cc4ee",
    manga: "#7cc4ee",
    short: "#1d2340",
    media: "#ffffff",
    bota: "#f2c230",
    colorNumero: "#1d2340",
    colorCeja: PELO_MESSI,
    rostro: {
      orejaX: 150, ojoX: 60, ojoY: -18, ojoAncho: 33, ojoAlto: 35, iris: "#6b3f1d", bocaAncho: 38,
      cejaExt: [104, -60], cejaMedio: [68, -86], cejaInt: [24, -78], cejaGrosor: 15,
    },
    // Cara alargada y mandíbula angosta.
    contorno: (p) => {
      p.moveTo(0, -188);
      p.bezierCurveTo(96, -188, 152, -122, 152, -28);
      p.bezierCurveTo(152, 62, 108, 150, 42, 176);
      p.quadraticCurveTo(0, 190, -42, 176);
      p.bezierCurveTo(-108, 150, -152, 62, -152, -28);
      p.bezierCurveTo(-152, -122, -96, -188, 0, -188);
      p.closePath();
    },
    // Barba corta con patillas, bigote unido y mejillas despejadas.
    barba: (c) => {
      c.fillStyle = BARBA_MESSI;
      c.beginPath();
      c.moveTo(-175, -100);
      c.lineTo(-130, -100);
      c.quadraticCurveTo(-122, 44, -66, 66);
      c.quadraticCurveTo(-30, 44, 0, 54);
      c.quadraticCurveTo(30, 44, 66, 66);
      c.quadraticCurveTo(122, 44, 130, -100);
      c.lineTo(175, -100);
      c.lineTo(175, 215);
      c.lineTo(-175, 215);
      c.closePath();
      c.fill();
    },
    nariz: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-5, -8);
        p.quadraticCurveTo(-3, 22, -17, 36);
        p.quadraticCurveTo(0, 50, 17, 36);
      }, { borde: "#b9764f", grosor: 8 });
    },
    // Copete peinado hacia un lado, con volumen arriba.
    pelo: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-154, -24);
        p.bezierCurveTo(-182, -118, -160, -205, -82, -226);
        p.quadraticCurveTo(-46, -262, 8, -240);
        p.quadraticCurveTo(66, -272, 112, -226);
        p.quadraticCurveTo(178, -186, 154, -24);
        p.quadraticCurveTo(146, -92, 116, -126);
        p.quadraticCurveTo(70, -104, 34, -140);
        p.quadraticCurveTo(-12, -104, -62, -132);
        p.quadraticCurveTo(-104, -112, -124, -96);
        p.quadraticCurveTo(-146, -70, -154, -24);
        p.closePath();
      }, { relleno: PELO_MESSI });
      [[-96, -176, -40, -222, 24, -206], [-54, -158, 6, -198, 78, -186], [10, -158, 66, -176, 122, -158]].forEach(([x1, y1, cx, cy, x2, y2]) => {
        K.forma(c, (p) => {
          p.moveTo(x1, y1);
          p.quadraticCurveTo(cx, cy, x2, y2);
        }, { borde: BRILLO_MESSI, grosor: 9 });
      });
    },
  };
})();
