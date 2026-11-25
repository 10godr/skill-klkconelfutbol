// Objetos del estilo BR: balón, piedra, perro, cerveza, paila y celular.
(() => {
  const K = window.KLK;

  K.balonBR = (c, x, y, r = 34, giro = 0) => {
    c.save();
    c.translate(x, y);
    c.rotate(giro);
    K.formaBR(c, (p) => p.arc(0, 0, r, 0, Math.PI * 2), "#ffffff", 4);
    const pent = (cx, cy, rr) => (p) => {
      for (let i = 0; i < 5; i++) {
        const a = -Math.PI / 2 + (i * Math.PI * 2) / 5;
        const px = cx + Math.cos(a) * rr;
        const py = cy + Math.sin(a) * rr;
        if (i) p.lineTo(px, py); else p.moveTo(px, py);
      }
      p.closePath();
    };
    K.forma(c, pent(0, 0, r * 0.36), { relleno: K.LINEA_BR, borde: null });
    c.save();
    c.beginPath();
    c.arc(0, 0, r, 0, Math.PI * 2);
    c.clip();
    [0, 1, 2, 3, 4].forEach((i) => {
      const a = -Math.PI / 2 + (i * Math.PI * 2) / 5;
      K.forma(c, pent(Math.cos(a) * r * 1.02, Math.sin(a) * r * 1.02, r * 0.3), { relleno: K.LINEA_BR, borde: null });
    });
    c.restore();
    K.formaBR(c, (p) => p.arc(0, 0, r, 0, Math.PI * 2), null, 4);
    c.restore();
  };

  K.piedraBR = (c, x, y, escala = 1) => {
    c.save();
    c.translate(x, y);
    c.scale(escala, escala);
    const forma = (p) => {
      p.moveTo(-60, 0);
      p.quadraticCurveTo(-66, -44, -20, -58);
      p.quadraticCurveTo(30, -66, 56, -30);
      p.quadraticCurveTo(70, -4, 60, 0);
      p.closePath();
    };
    K.formaBR(c, forma, "#9a948a");
    K.sombraBR(c, forma, (p) => p.rect(10, -70, 70, 80), "#7d776e");
    K.formaBR(c, forma, null);
    c.restore();
  };

  // Firulai: perro satero, color caramelo, con una oreja caída.
  K.perroBR = (c, x, y, { escala = 1, boca = 0, cola = 0 } = {}) => {
    const pelo = "#c8893f";
    c.save();
    c.translate(x, y);
    c.scale(escala, escala);
    c.lineCap = "round";
    c.strokeStyle = K.LINEA_BR; c.lineWidth = 22;
    c.beginPath(); c.moveTo(70, -90); c.quadraticCurveTo(120, -120, 112 + cola * 14, -160); c.stroke();
    c.strokeStyle = pelo; c.lineWidth = 12; c.stroke();
    [-50, -25, 35, 60].forEach((px) => K.formaBR(c, (p) => p.roundRect(px - 11, -60, 22, 60, 8), px > 0 ? pelo : K.oscuro(pelo, 0.85)));
    K.formaBR(c, (p) => p.ellipse(5, -80, 85, 40, 0, 0, Math.PI * 2), pelo);
    K.formaBR(c, (p) => p.ellipse(-80, -128, 40, 36, 0, 0, Math.PI * 2), pelo);
    K.formaBR(c, (p) => p.ellipse(-112, -112 + boca * 6, 24, 16, 0, 0, Math.PI * 2), "#e7c08a");
    if (boca > 0.1) K.formaBR(c, (p) => p.ellipse(-112, -92, 14, 10 * boca + 4, 0, 0, Math.PI * 2), "#5a1a1a", 4);
    K.formaBR(c, (p) => p.ellipse(-130, -120, 8, 6, 0, 0, Math.PI * 2), K.LINEA_BR, 2);
    K.formaBR(c, (p) => p.arc(-84, -140, 6, 0, Math.PI * 2), K.LINEA_BR, 2);
    K.formaBR(c, (p) => p.ellipse(-58, -148, 14, 30, 0.6, 0, Math.PI * 2), K.oscuro(pelo, 0.75));
    c.restore();
  };

  K.cervezaBR = (c, x, y, escala = 1) => {
    c.save();
    c.translate(x, y);
    c.scale(escala, escala);
    K.formaBR(c, (p) => { p.moveTo(-26, 0); p.lineTo(-26, -110); p.quadraticCurveTo(-26, -140, -10, -150); p.lineTo(-10, -190); p.lineTo(10, -190); p.lineTo(10, -150); p.quadraticCurveTo(26, -140, 26, -110); p.lineTo(26, 0); p.closePath(); }, "#5e3a14");
    K.formaBR(c, (p) => p.rect(-26, -95, 52, 50), "#e9e2cf", 4);
    K.formaBR(c, (p) => p.rect(-11, -200, 22, 12), "#d4b13a", 4);
    c.fillStyle = "rgba(255,255,255,0.4)";
    c.fillRect(-18, -140, 6, 120);
    c.restore();
  };

  K.pailaBR = (c, x, y, giro = 0) => {
    c.save();
    c.translate(x, y);
    c.rotate(giro);
    K.formaBR(c, (p) => { p.moveTo(-60, 0); p.quadraticCurveTo(0, 70, 60, 0); p.closePath(); }, "#8a8f96");
    K.formaBR(c, (p) => p.ellipse(0, 0, 60, 12, 0, 0, Math.PI * 2), "#5b6066");
    c.restore();
  };

  K.celularBR = (c, x, y, { escala = 1, giro = 0, pantalla = "#1c1c24", dibujo } = {}) => {
    c.save();
    c.translate(x, y);
    c.rotate(giro);
    c.scale(escala, escala);
    K.formaBR(c, (p) => p.roundRect(-110, -200, 220, 400, 30), "#202028", 6);
    K.formaBR(c, (p) => p.roundRect(-96, -180, 192, 360, 18), pantalla, 3);
    if (dibujo) dibujo(c);
    c.restore();
  };
})();
