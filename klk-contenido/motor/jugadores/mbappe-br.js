// Mbappé en estilo BR. Lo que lo hace reconocible:
// rizos cortos arriba con degradado bajo a los lados y línea de frente recta,
// cara alargada con quijada marcada y sin barba, ojos almendrados de párpado pesado,
// cejas gruesas y bajas, nariz ancha de punta redonda, labios gruesos y cuello largo.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};
  const PIEL = "#9a6644";
  const PELO = "#1a120d";

  const cara = (p) => {
    p.moveTo(0, -104);
    p.bezierCurveTo(46, -104, 64, -74, 64, -30);
    p.bezierCurveTo(64, 10, 60, 46, 48, 70);
    p.quadraticCurveTo(30, 96, 0, 100);
    p.quadraticCurveTo(-30, 96, -48, 70);
    p.bezierCurveTo(-60, 46, -64, 10, -64, -30);
    p.bezierCurveTo(-64, -74, -46, -104, 0, -104);
    p.closePath();
  };

  const pelo = (c) => {
    // Degradado a los lados: sombra corta que baja hasta la oreja.
    c.save();
    c.beginPath();
    cara(c);
    c.clip();
    c.fillStyle = "rgba(26,18,13,0.45)";
    c.beginPath();
    c.moveTo(-70, -70);
    c.lineTo(-56, -70);
    c.quadraticCurveTo(-60, -40, -64, -12);
    c.lineTo(-70, -12);
    c.closePath();
    c.moveTo(70, -70);
    c.lineTo(56, -70);
    c.quadraticCurveTo(60, -40, 64, -12);
    c.lineTo(70, -12);
    c.closePath();
    c.fill();
    c.restore();
    // Bloque de rizos con frente recta y esquinas marcadas.
    const bloque = (p) => {
      p.moveTo(-60, -60);
      p.lineTo(-50, -72);
      p.lineTo(50, -72);
      p.lineTo(60, -60);
      p.quadraticCurveTo(62, -94, 34, -102);
      p.quadraticCurveTo(0, -107, -34, -102);
      p.quadraticCurveTo(-62, -94, -60, -60);
      p.closePath();
    };
    K.formaBR(c, bloque, PELO, 4);
    // Los rizos se recortan al bloque para que ninguno se salga del pelo.
    c.save();
    c.beginPath();
    bloque(c);
    c.clip();
    const azar = K.azar(23);
    c.strokeStyle = "#3a2a20";
    c.lineWidth = 2.5;
    for (let i = 0; i < 40; i++) {
      const x = -48 + azar() * 96;
      const y = -100 + azar() * 24;
      c.beginPath();
      c.arc(x, y, 3 + azar() * 2, Math.PI * 1.1, Math.PI * 1.9);
      c.stroke();
    }
    c.restore();
  };

  const nariz = (c) => {
    const sombra = K.oscuro(PIEL, 0.62);
    K.forma(c, (p) => {
      p.moveTo(-5, -8);
      p.quadraticCurveTo(-8, 10, -6, 18);
    }, { borde: sombra, grosor: 3 });
    // Punta redonda y aletas anchas.
    K.forma(c, (p) => {
      p.moveTo(-20, 26);
      p.quadraticCurveTo(-24, 36, -12, 38);
      p.quadraticCurveTo(0, 44, 12, 38);
      p.quadraticCurveTo(24, 36, 20, 26);
    }, { borde: sombra, grosor: 4 });
    c.fillStyle = K.oscuro(PIEL, 0.55);
    [-9, 9].forEach((x) => { c.beginPath(); c.ellipse(x, 35, 4, 2.5, 0, 0, Math.PI * 2); c.fill(); });
  };

  // Labio de abajo grueso cuando la boca está cerrada, y pliegues bajo los ojos.
  const detalles = (c, pose) => {
    // Párpado pesado: tapa la parte de arriba del ojo y le da la mirada tranquila de Mbappé.
    if (pose.parpadeo <= 0.5) {
      [-1, 1].forEach((l) => {
        const x = l * 27;
        const y = -6;
        K.forma(c, (p) => {
          p.moveTo(x - 19, y + 2);
          p.quadraticCurveTo(x, y - 18, x + 19, y + 2);
          p.quadraticCurveTo(x, y - 7, x - 19, y + 2);
          p.closePath();
        }, { relleno: PIEL, borde: null });
        K.forma(c, (p) => {
          p.moveTo(x - 18, y + 1);
          p.quadraticCurveTo(x, y - 7, x + 18, y + 1);
        }, { borde: K.LINEA_BR, grosor: 5 });
        K.forma(c, (p) => {
          p.moveTo(x - 15, y - 9);
          p.quadraticCurveTo(x, y - 15, x + 15, y - 9);
        }, { borde: K.oscuro(PIEL, 0.65), grosor: 2.5 });
      });
    }
    if (pose.boca < 0.08) {
      K.forma(c, (p) => {
        p.moveTo(-18, 54);
        p.quadraticCurveTo(0, 68, 18, 54);
      }, { relleno: K.oscuro(PIEL, 0.82), borde: K.oscuro(PIEL, 0.6), grosor: 3 });
    }
    [-1, 1].forEach((l) => K.forma(c, (p) => {
      p.moveTo(l * 18, 2);
      p.quadraticCurveTo(l * 28, 7, l * 38, 2);
    }, { borde: K.oscuro(PIEL, 0.7), grosor: 2.5 }));
  };

  // Camisa de vacaciones con flores.
  const flores = (c) => {
    const azar = K.azar(5);
    for (let i = 0; i < 16; i++) {
      const x = -80 + azar() * 160;
      const y = -770 + azar() * 250;
      c.fillStyle = i % 2 ? "#f6d04d" : "#ffffff";
      for (let k = 0; k < 5; k++) {
        const a = (k / 5) * Math.PI * 2;
        c.beginPath();
        c.arc(x + Math.cos(a) * 9, y + Math.sin(a) * 9, 7, 0, Math.PI * 2);
        c.fill();
      }
      c.fillStyle = "#e0483e";
      c.beginPath();
      c.arc(x, y, 5, 0, Math.PI * 2);
      c.fill();
    }
  };

  const base = {
    nombre: "MBAPPÉ", piel: PIEL, colorCeja: PELO, media: "#ffffff", tenis: "#f4f4f4", suela: "#c9c9c9",
    rostro: { ojoX: 27, ojoY: -6, iris: "#24160e", orejaAncho: 17, orejaAlto: 27, cejaY: 8, cejaGrosor: 11 },
    cara, pelo, nariz, detalles, cuello: 32,
  };

  // De vacaciones: camisa de flores, short beige y chancletas.
  K.JUGADORES.mbappeVacaciones = {
    ...base, camisa: "#2f8fb0", manga: "#2f8fb0", short: "#d9c39a",
    media: PIEL, tenis: "#3a3a3a", suela: "#222222", estampado: (c) => { flores(c); },
  };

  // Uniforme blanco genérico con el 10, sin escudo ni patrocinador.
  K.JUGADORES.mbappeMadrid = {
    ...base, camisa: "#f7f7f4", manga: "#f7f7f4", short: "#f7f7f4", media: "#f7f7f4",
    tenis: "#d9b23a", suela: "#a8862a",
    estampado: (c) => {
      K.forma(c, (p) => { p.moveTo(-34, -800); p.quadraticCurveTo(0, -770, 34, -800); }, { borde: "#1f5a5a", grosor: 8 });
      K.texto(c, "10", 0, -640, { tam: 90, color: "#1f5a5a", borde: null, grosor: 0 });
    },
  };
})();
