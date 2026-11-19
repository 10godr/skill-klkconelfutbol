// Bellingham: piel oscura, recorte bajo con línea marcada, bigote fino y mandíbula fuerte.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};

  const PELO = "#15100c";
  const BRILLO = "#33261c";

  K.JUGADORES.bellingham = {
    nombre: "BELLINGHAM",
    numero: 5,
    piel: "#a06c47",
    escudo: { fondo: "#e0b83f", banda: "#1d2340" },
    camisa: "#ffffff",
    manga: "#ffffff",
    short: "#ffffff",
    media: "#ffffff",
    bota: "#20242e",
    colorNumero: "#1d2340",
    colorCeja: PELO,
    rostro: {
      orejaX: 160, ojoX: 64, ojoY: -18, ojoAncho: 35, ojoAlto: 36, iris: "#2a170c", bocaAncho: 44,
      cejaExt: [112, -66], cejaMedio: [70, -88], cejaInt: [26, -74], cejaGrosor: 17,
    },
    contorno: (p) => {
      p.moveTo(0, -186);
      p.bezierCurveTo(100, -186, 160, -118, 160, -24);
      p.bezierCurveTo(160, 70, 124, 150, 56, 176);
      p.quadraticCurveTo(0, 192, -56, 176);
      p.bezierCurveTo(-124, 150, -160, 70, -160, -24);
      p.bezierCurveTo(-160, -118, -100, -186, 0, -186);
      p.closePath();
    },
    // Bigote fino y perilla corta.
    barba: (c) => {
      c.fillStyle = PELO;
      c.beginPath();
      c.moveTo(-54, 68);
      c.quadraticCurveTo(0, 42, 54, 68);
      c.quadraticCurveTo(0, 58, -54, 68);
      c.closePath();
      c.fill();
      c.beginPath();
      c.ellipse(0, 162, 36, 20, 0, 0, Math.PI * 2);
      c.fill();
    },
    nariz: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-6, -4);
        p.quadraticCurveTo(-4, 24, -22, 36);
        p.quadraticCurveTo(0, 52, 22, 36);
      }, { borde: "#70472c", grosor: 8 });
    },
    // Recorte bajo con la línea de la frente bien recta.
    pelo: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-158, -40);
        p.bezierCurveTo(-176, -142, -122, -226, 0, -230);
        p.bezierCurveTo(122, -226, 176, -142, 158, -40);
        p.lineTo(136, -94);
        p.quadraticCurveTo(122, -130, 94, -134);
        p.lineTo(-94, -134);
        p.quadraticCurveTo(-122, -130, -136, -94);
        p.closePath();
      }, { relleno: PELO });
      [[-84, -176], [-36, -196], [18, -198], [70, -180], [-58, -158], [0, -164], [52, -156]].forEach(([x, y]) => {
        K.forma(c, (p) => p.arc(x, y, 11, Math.PI, Math.PI * 2), { borde: BRILLO, grosor: 6 });
      });
    },
  };
})();
