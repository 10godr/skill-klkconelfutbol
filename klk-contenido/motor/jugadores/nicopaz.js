// Nico Paz: joven, cara larga y sin barba, pelo rubio ondulado con volumen arriba y costados rebajados.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};

  const PELO = "#e0b84f";
  const BRILLO = "#f6dc8c";
  const CEJA = "#a9822f";
  const AZUL = "#1f5fbf";

  K.JUGADORES.nicopaz = {
    nombre: "NICO PAZ",
    numero: 10,
    piel: "#f0c09a",
    camisa: AZUL,
    rayas: "#1a52a6",
    manga: AZUL,
    short: "#ffffff",
    media: AZUL,
    bota: "#f4f4f4",
    colorNumero: "#ffffff",
    colorCeja: CEJA,
    rostro: {
      orejaX: 142, ojoX: 56, ojoY: -22, ojoAncho: 34, ojoAlto: 38, iris: "#4a2c16", bocaAncho: 36,
      cejaExt: [98, -68], cejaMedio: [62, -86], cejaInt: [24, -76], cejaGrosor: 13,
    },
    // Cara larga y juvenil, con barbilla angosta.
    contorno: (p) => {
      p.moveTo(0, -192);
      p.bezierCurveTo(90, -192, 144, -128, 144, -36);
      p.bezierCurveTo(144, 58, 104, 158, 38, 188);
      p.quadraticCurveTo(0, 202, -38, 188);
      p.bezierCurveTo(-104, 158, -144, 58, -144, -36);
      p.bezierCurveTo(-144, -128, -90, -192, 0, -192);
      p.closePath();
    },
    nariz: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-3, -10);
        p.quadraticCurveTo(-1, 24, -14, 38);
        p.quadraticCurveTo(0, 50, 14, 38);
      }, { borde: "#c98f68", grosor: 7 });
    },
    // Ondas altas formadas por bucles que sobresalen de la cabeza.
    pelo: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-146, -50);
        p.bezierCurveTo(-158, -120, -150, -170, -120, -196);
        p.quadraticCurveTo(-136, -250, -76, -254);
        p.quadraticCurveTo(-56, -302, 0, -276);
        p.quadraticCurveTo(50, -310, 84, -260);
        p.quadraticCurveTo(146, -256, 126, -196);
        p.quadraticCurveTo(156, -166, 146, -50);
        p.quadraticCurveTo(138, -106, 110, -136);
        p.quadraticCurveTo(76, -116, 44, -146);
        p.quadraticCurveTo(10, -118, -28, -146);
        p.quadraticCurveTo(-70, -116, -106, -138);
        p.quadraticCurveTo(-136, -104, -146, -50);
        p.closePath();
      }, { relleno: PELO });
      [[-100, -180, -84, -226, -44, -214], [-40, -186, -14, -250, 26, -220], [30, -180, 62, -238, 96, -204]].forEach(([x1, y1, cx, cy, x2, y2]) => {
        K.forma(c, (p) => {
          p.moveTo(x1, y1);
          p.quadraticCurveTo(cx, cy, x2, y2);
        }, { borde: BRILLO, grosor: 9 });
      });
    },
  };
})();
