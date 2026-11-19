// Cesc Fàbregas de entrenador: saco oscuro, tupé peinado de lado, barba cerrada y cejas gruesas.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};

  const PELO = "#2e1c10";
  const BRILLO = "#5a3a22";
  const BARBA = "#3a2415";
  const SACO = "#1f2937";

  K.JUGADORES.fabregas = {
    nombre: "FÀBREGAS",
    numero: "",
    piel: "#e8b48a",
    camisa: SACO,
    rayas: SACO,
    manga: SACO,
    short: "#161d29",
    media: "#161d29",
    bota: "#0f0f12",
    colorNumero: SACO,
    colorCeja: PELO,
    rostro: {
      orejaX: 150, ojoX: 60, ojoY: -20, ojoAncho: 31, ojoAlto: 33, iris: "#4a2c16", bocaAncho: 40,
      cejaExt: [108, -62], cejaMedio: [68, -80], cejaInt: [22, -70], cejaGrosor: 21,
    },
    // Cara ovalada con mandíbula firme.
    contorno: (p) => {
      p.moveTo(0, -190);
      p.bezierCurveTo(98, -190, 152, -124, 152, -30);
      p.bezierCurveTo(152, 66, 122, 150, 56, 180);
      p.quadraticCurveTo(0, 198, -56, 180);
      p.bezierCurveTo(-122, 150, -152, 66, -152, -30);
      p.bezierCurveTo(-152, -124, -98, -190, 0, -190);
      p.closePath();
    },
    // Saco con solapas, camisa blanca y corbata.
    pecho: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-62, -424);
        p.lineTo(62, -424);
        p.lineTo(0, -262);
        p.closePath();
      }, { relleno: "#ffffff" });
      K.forma(c, (p) => {
        p.moveTo(-17, -412);
        p.lineTo(17, -412);
        p.lineTo(11, -322);
        p.lineTo(0, -292);
        p.lineTo(-11, -322);
        p.closePath();
      }, { relleno: "#2f6fd0" });
      [-1, 1].forEach((l) => K.forma(c, (p) => {
        p.moveTo(l * 62, -424);
        p.lineTo(l * 108, -370);
        p.lineTo(l * 66, -338);
        p.lineTo(l * 84, -318);
        p.lineTo(0, -250);
        p.closePath();
      }, { relleno: "#2c3a4f" }));
    },
    antebrazo: SACO,
    // Barba corta y recortada: patillas finas, línea de la mandíbula y bigote.
    barba: (c) => {
      c.fillStyle = BARBA;
      c.beginPath();
      c.moveTo(-175, -60);
      c.lineTo(-138, -60);
      c.quadraticCurveTo(-132, 50, -96, 84);
      c.quadraticCurveTo(-56, 58, -30, 56);
      c.quadraticCurveTo(0, 48, 30, 56);
      c.quadraticCurveTo(56, 58, 96, 84);
      c.quadraticCurveTo(132, 50, 138, -60);
      c.lineTo(175, -60);
      c.lineTo(175, 215);
      c.lineTo(-175, 215);
      c.closePath();
      c.fill();
    },
    nariz: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-4, -12);
        p.quadraticCurveTo(-2, 16, -16, 28);
        p.quadraticCurveTo(0, 40, 16, 28);
      }, { borde: "#b87a52", grosor: 8 });
    },
    // Tupé alto peinado hacia un lado, con los costados cortos.
    pelo: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-154, -40);
        p.bezierCurveTo(-170, -130, -146, -200, -84, -228);
        p.quadraticCurveTo(-20, -280, 70, -262);
        p.quadraticCurveTo(150, -244, 166, -160);
        p.quadraticCurveTo(170, -90, 154, -40);
        p.quadraticCurveTo(146, -100, 118, -134);
        p.quadraticCurveTo(40, -112, -30, -146);
        p.quadraticCurveTo(-96, -130, -126, -104);
        p.quadraticCurveTo(-146, -76, -154, -40);
        p.closePath();
      }, { relleno: PELO });
      [[-92, -170, -30, -236, 66, -232], [-40, -160, 30, -212, 116, -204], [30, -146, 90, -176, 142, -158]].forEach(([x1, y1, cx, cy, x2, y2]) => {
        K.forma(c, (p) => {
          p.moveTo(x1, y1);
          p.quadraticCurveTo(cx, cy, x2, y2);
        }, { borde: BRILLO, grosor: 9 });
      });
    },
  };
})();
