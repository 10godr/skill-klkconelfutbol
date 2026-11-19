// James Trafford: portero alto, piel clara, cara larga y pelo largo recogido en un moñito atrás.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};

  const PELO = "#5a3a20";
  const BRILLO = "#83593a";
  const LIGA = "#1c2b3a";

  K.JUGADORES.trafford = {
    nombre: "TRAFFORD",
    numero: 1,
    piel: "#f2c9a8",
    camisa: "#c6e33a",
    rayas: "#a9c727",
    manga: "#1c2b3a",
    short: "#1c2b3a",
    media: "#c6e33a",
    bota: "#f4f4f4",
    guante: "#ffffff",
    colorNumero: "#1c2b3a",
    colorCeja: PELO,
    rostro: {
      orejaX: 146, ojoX: 58, ojoY: -22, ojoAncho: 33, ojoAlto: 36, iris: "#4f6f8a", bocaAncho: 40,
      cejaExt: [102, -66], cejaMedio: [66, -84], cejaInt: [24, -72], cejaGrosor: 14,
    },
    // Cara larga con mandíbula marcada.
    contorno: (p) => {
      p.moveTo(0, -192);
      p.bezierCurveTo(92, -192, 146, -128, 146, -36);
      p.bezierCurveTo(146, 60, 124, 150, 58, 186);
      p.quadraticCurveTo(0, 204, -58, 186);
      p.bezierCurveTo(-124, 150, -146, 60, -146, -36);
      p.bezierCurveTo(-146, -128, -92, -192, 0, -192);
      p.closePath();
    },
    nariz: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-3, -10);
        p.quadraticCurveTo(0, 26, -15, 40);
        p.quadraticCurveTo(0, 52, 15, 40);
      }, { borde: "#cf9a78", grosor: 7 });
    },
    // Moñito asomando detrás de la cabeza y pelo largo peinado hacia atrás.
    pelo: (c) => {
      K.forma(c, (p) => p.ellipse(122, -236, 46, 40, -0.7, 0, Math.PI * 2), { relleno: PELO });
      K.forma(c, (p) => {
        p.moveTo(104, -254);
        p.quadraticCurveTo(130, -270, 148, -246);
      }, { borde: BRILLO, grosor: 8 });
      K.forma(c, (p) => {
        p.moveTo(82, -218);
        p.lineTo(110, -192);
      }, { borde: LIGA, grosor: 14 });
      K.forma(c, (p) => {
        p.moveTo(-150, -22);
        p.bezierCurveTo(-176, -130, -128, -226, -40, -232);
        p.quadraticCurveTo(0, -240, 40, -232);
        p.bezierCurveTo(128, -226, 176, -130, 150, -22);
        p.quadraticCurveTo(138, -92, 104, -122);
        p.quadraticCurveTo(52, -150, 8, -128);
        p.quadraticCurveTo(-44, -152, -104, -122);
        p.quadraticCurveTo(-138, -92, -150, -22);
        p.closePath();
      }, { relleno: PELO });
      [[-104, -146, -70, -196, -22, -220], [-40, -158, -24, -196, -6, -222], [40, -158, 24, -196, 6, -222], [104, -146, 70, -196, 22, -220]].forEach(([x1, y1, cx, cy, x2, y2]) => {
        K.forma(c, (p) => {
          p.moveTo(x1, y1);
          p.quadraticCurveTo(cx, cy, x2, y2);
        }, { borde: BRILLO, grosor: 9 });
      });
    },
  };
})();
