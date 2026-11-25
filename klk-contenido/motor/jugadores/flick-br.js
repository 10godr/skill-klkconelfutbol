// Hansi Flick en estilo BR: calvo arriba, lados grises bien cortos, cara alargada,
// barba gris de dos días y ropa de entreno negra, sin escudos.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};
  const GRIS = "#b9b9b4";
  const PIEL = "#e6bf9e";

  // Lados grises que abrazan la cabeza por detrás y dejan la coronilla limpia.
  const pelo = (c) => {
    [-1, 1].forEach((l) => K.formaBR(c, (p) => {
      p.moveTo(l * 52, -78);
      p.quadraticCurveTo(l * 76, -60, l * 72, -4);
      p.lineTo(l * 62, 8);
      p.quadraticCurveTo(l * 60, -40, l * 46, -70);
      p.closePath();
    }, GRIS, 4));
    c.fillStyle = "rgba(255,255,255,0.4)";
    c.beginPath();
    c.ellipse(-22, -84, 22, 9, -0.35, 0, Math.PI * 2);
    c.fill();
  };

  // Barba de dos días en puntitos grises y dos arrugas en la frente.
  const barba = (c) => {
    const azar = K.azar(21);
    c.fillStyle = "rgba(140,140,135,0.55)";
    for (let i = 0; i < 46; i++) {
      const a = Math.PI * (0.1 + 0.8 * azar());
      const r = 40 + azar() * 22;
      c.beginPath();
      c.arc(Math.cos(a) * r * 1.05, 6 + Math.sin(a) * r * 0.8, 1.7, 0, Math.PI * 2);
      c.fill();
    }
    K.forma(c, (p) => { p.moveTo(-30, -74); p.quadraticCurveTo(0, -80, 30, -74); }, { borde: K.oscuro(PIEL, 0.72), grosor: 3 });
    K.forma(c, (p) => { p.moveTo(-22, -62); p.quadraticCurveTo(0, -67, 22, -62); }, { borde: K.oscuro(PIEL, 0.72), grosor: 3 });
  };

  K.JUGADORES.flickBR = {
    nombre: "FLICK",
    piel: PIEL,
    camisa: "#1c1c22",
    manga: "#1c1c22",
    short: "#1c1c22",
    media: "#1c1c22",
    tenis: "#f4f4f4",
    suela: "#c9c9c9",
    colorCeja: "#8d8d88",
    rostro: { iris: "#4f7391", orejaAncho: 18, orejaAlto: 30 },
    cuello: 22,
    pelo,
    barba,
    // Cremallera y ribete gris de chaqueta de entreno.
    estampado: (c) => {
      K.forma(c, (p) => { p.moveTo(0, -800); p.lineTo(0, -560); }, { borde: "#55555e", grosor: 6 });
      K.forma(c, (p) => { p.moveTo(-40, -800); p.quadraticCurveTo(0, -770, 40, -800); }, { borde: GRIS, grosor: 8 });
    },
  };
})();
