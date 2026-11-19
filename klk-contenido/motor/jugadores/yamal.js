// Yamal: pómulos anchos, mentón marcado, cejas gruesas y bajas, nariz ancha,
// rizos cortos con flequillo sobre la frente y brackets.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};

  const PELO = "#17100b";
  const BRILLO = "#4a3524";
  const PUNTAS = "#8a6a3c";
  const REBAJADO = "#4f3826";
  const SOMBRA = "#8f5e3c";

  // Silueta rizada: bultos pequeños por arriba y flequillo ondulado por delante.
  function trazarPelo(p) {
    const N = 11;
    const punto = (a, r) => [r * 158 * Math.cos(a), -92 + r * 142 * Math.sin(a)];
    p.moveTo(...punto(Math.PI, 1));
    for (let i = 0; i < N; i++) {
      const a = Math.PI + (Math.PI * (i + 0.5)) / N;
      const b = Math.PI + (Math.PI * (i + 1)) / N;
      p.quadraticCurveTo(...punto(a, 1.14), ...punto(b, 1));
    }
    const flequillo = [[136, -112], [104, -116], [70, -120], [34, -122], [-2, -122], [-38, -122], [-72, -120], [-106, -116], [-136, -112], [-158, -92]];
    let x0 = 158;
    flequillo.forEach(([x, y]) => {
      p.quadraticCurveTo((x0 + x) / 2, y + 30, x, y);
      x0 = x;
    });
    p.closePath();
  }

  K.JUGADORES.yamal = {
    nombre: "YAMAL",
    numero: 10,
    piel: "#ab744c",
    camisa: "#a50044",
    rayas: "#004d98",
    manga: "#004d98",
    short: "#14213f",
    media: "#14213f",
    bota: "#f4f1e8",
    colorNumero: "#f2c230",
    colorCeja: PELO,
    rostro: {
      orejaX: 152, ojoX: 62, ojoY: -6, ojoAncho: 30, ojoAlto: 26, iris: "#2e1a0e", bocaAncho: 56,
      cejaExt: [106, -44], cejaMedio: [66, -58], cejaInt: [22, -46], cejaGrosor: 20,
    },
    // Frente angosta, pómulos anchos y mandíbula que cierra en un mentón marcado.
    contorno: (p) => {
      p.moveTo(0, -182);
      p.bezierCurveTo(86, -182, 138, -140, 148, -60);
      p.bezierCurveTo(156, -10, 160, 30, 146, 74);
      p.bezierCurveTo(130, 124, 84, 160, 40, 178);
      p.quadraticCurveTo(0, 190, -40, 178);
      p.bezierCurveTo(-84, 160, -130, 124, -146, 74);
      p.bezierCurveTo(-160, 30, -156, -10, -148, -60);
      p.bezierCurveTo(-138, -140, -86, -182, 0, -182);
      p.closePath();
    },
    // Bigotito y sombra de barba en el mentón.
    barba: (c) => {
      c.fillStyle = SOMBRA;
      c.beginPath();
      c.moveTo(-54, 66);
      c.quadraticCurveTo(0, 46, 54, 66);
      c.quadraticCurveTo(0, 58, -54, 66);
      c.closePath();
      c.fill();
      c.beginPath();
      c.ellipse(0, 168, 46, 18, 0, 0, Math.PI * 2);
      c.fill();
    },
    // Nariz ancha con las aletas marcadas.
    nariz: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-30, 30);
        p.quadraticCurveTo(-36, 50, -16, 50);
        p.quadraticCurveTo(0, 60, 16, 50);
        p.quadraticCurveTo(36, 50, 30, 30);
      }, { borde: "#7a4c2e", grosor: 8 });
    },
    pelo: (c) => {
      c.fillStyle = REBAJADO;
      [-1, 1].forEach((l) => {
        c.beginPath();
        c.moveTo(l * 156, -100);
        c.lineTo(l * 120, -100);
        c.quadraticCurveTo(l * 134, -62, l * 148, -28);
        c.quadraticCurveTo(l * 154, -62, l * 156, -100);
        c.closePath();
        c.fill();
      });
      K.forma(c, trazarPelo, { relleno: PELO });
      [[-112, -170], [-66, -196], [-16, -208], [36, -204], [86, -186], [-92, -136], [-44, -152], [6, -160], [56, -152], [104, -136]].forEach(([x, y]) => {
        K.forma(c, (p) => p.arc(x, y, 15, Math.PI * 1.05, Math.PI * 1.9), { borde: BRILLO, grosor: 7 });
      });
      [[-104, -116], [-54, -122], [0, -126], [54, -122], [104, -116]].forEach(([x, y]) => {
        K.forma(c, (p) => p.arc(x, y, 12, Math.PI * 1.1, Math.PI * 1.9), { borde: PUNTAS, grosor: 6 });
      });
    },
    // Brackets transparentes: apenas un alambre fino y cuadritos claros sobre los dientes.
    dientes: (c, arriba) => {
      c.fillStyle = "#ffffff";
      c.fillRect(-60, arriba, 120, 28);
      c.fillStyle = "#dfe4ea";
      c.fillRect(-60, arriba + 14, 120, 2);
      [-44, -29, -15, 0, 15, 29, 44].forEach((x) => {
        c.fillStyle = "#e6ebf0";
        c.fillRect(x - 5, arriba + 10, 10, 10);
      });
    },
  };
})();
