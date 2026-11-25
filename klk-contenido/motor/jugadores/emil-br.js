// Emil en estilo BR: flaco, orejón, motas cortas y pelusa de bigote que no termina de salir.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};
  const PELO = "#1d130d";

  K.JUGADORES.emilBR = {
    nombre: "EMIL",
    piel: "#b57a4c",
    camisa: "#f2c230",
    manga: "#f2c230",
    short: "#3a5fa0",
    media: "#ffffff",
    tenis: "#f4f4f4",
    suela: "#c9c9c9",
    colorCeja: PELO,
    rostro: { orejaAncho: 22, orejaAlto: 31, iris: "#3b2312" },
    barba: (c) => {
      c.fillStyle = "rgba(29,19,13,0.55)";
      [-16, -9, -2, 5, 12, 18].forEach((x, i) => {
        c.beginPath();
        c.arc(x, 39 + (i % 2) * 2, 1.8, 0, Math.PI * 2);
        c.fill();
      });
    },
    // Motas: muchas bolitas que se leen como una sola masa con borde rizado.
    pelo: (c) => {
      const azar = K.azar(7);
      const bolas = [];
      for (let i = 0; i < 26; i++) {
        const a = Math.PI * (1.05 + 0.9 * (i / 25));
        const r = 74 + azar() * 10;
        bolas.push([Math.cos(a) * r * 0.95, -38 + Math.sin(a) * r * 0.85, 13 + azar() * 5]);
      }
      const casco = (p) => {
        p.moveTo(-66, -30);
        p.quadraticCurveTo(-70, -108, 0, -112);
        p.quadraticCurveTo(70, -108, 66, -30);
        p.quadraticCurveTo(50, -58, 0, -60);
        p.quadraticCurveTo(-50, -58, -66, -30);
        p.closePath();
      };
      c.fillStyle = K.LINEA_BR;
      bolas.forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r + 5, 0, Math.PI * 2); c.fill(); });
      K.formaBR(c, casco, PELO);
      c.fillStyle = PELO;
      bolas.forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); });
      K.forma(c, casco, { relleno: PELO, borde: null });
      c.strokeStyle = "#3a2a20";
      c.lineWidth = 3;
      bolas.forEach(([x, y, r], i) => {
        if (i % 2) return;
        c.beginPath();
        c.arc(x - 3, y - 2, r * 0.5, Math.PI * 1.1, Math.PI * 1.7);
        c.stroke();
      });
    },
  };
})();
