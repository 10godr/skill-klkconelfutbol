// Cole Palmer: piel clara, pelo cobrizo corto hacia arriba, cara angosta y ojos claros.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};

  const PELO = "#b8743a";
  const BRILLO = "#dc9f61";

  K.JUGADORES.palmer = {
    nombre: "PALMER",
    numero: 10,
    piel: "#f3cdb0",
    escudo: { fondo: "#ffffff", banda: "#e0b83f" },
    camisa: "#1f4fb3",
    manga: "#1f4fb3",
    short: "#1f4fb3",
    media: "#ffffff",
    bota: "#f4f4f4",
    colorNumero: "#1f4fb3",
    colorCeja: "#9a5f2e",
    rostro: {
      orejaX: 150, ojoX: 58, ojoY: -16, ojoAncho: 32, ojoAlto: 32, iris: "#4a7ea8", bocaAncho: 36,
      cejaExt: [102, -58], cejaMedio: [66, -72], cejaInt: [24, -64], cejaGrosor: 13,
    },
    contorno: (p) => {
      p.moveTo(0, -188);
      p.bezierCurveTo(94, -188, 148, -122, 148, -30);
      p.bezierCurveTo(148, 66, 104, 152, 38, 178);
      p.quadraticCurveTo(0, 190, -38, 178);
      p.bezierCurveTo(-104, 152, -148, 66, -148, -30);
      p.bezierCurveTo(-148, -122, -94, -188, 0, -188);
      p.closePath();
    },
    // Bigote claro y finito.
    barba: (c) => {
      c.fillStyle = "#c98c52";
      c.beginPath();
      c.moveTo(-44, 70);
      c.quadraticCurveTo(0, 50, 44, 70);
      c.quadraticCurveTo(0, 62, -44, 70);
      c.closePath();
      c.fill();
    },
    nariz: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-4, -4);
        p.quadraticCurveTo(-2, 24, -14, 36);
        p.quadraticCurveTo(0, 46, 14, 36);
      }, { borde: "#cf9672", grosor: 7 });
    },
    // Costados bajos y copete corto parado.
    pelo: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-150, -44);
        p.bezierCurveTo(-170, -130, -140, -206, -84, -232);
        p.lineTo(-58, -256);
        p.lineTo(-26, -238);
        p.lineTo(6, -268);
        p.lineTo(34, -240);
        p.lineTo(72, -258);
        p.lineTo(92, -226);
        p.bezierCurveTo(146, -202, 170, -130, 150, -44);
        p.lineTo(126, -106);
        p.quadraticCurveTo(70, -128, 22, -116);
        p.quadraticCurveTo(-46, -136, -126, -106);
        p.closePath();
      }, { relleno: PELO });
      [[-74, -150, -46, -212], [-16, -148, 2, -226], [46, -148, 62, -214]].forEach(([x1, y1, x2, y2]) => {
        K.forma(c, (p) => {
          p.moveTo(x1, y1);
          p.lineTo(x2, y2);
        }, { borde: BRILLO, grosor: 9 });
      });
    },
  };
})();
