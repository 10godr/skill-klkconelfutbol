// Motor (motoconcho) visto de frente, carros, avión, humo, olas y palmeras en estilo BR.
(() => {
  const K = window.KLK;

  // Motor de frente. (x, y) es donde la rueda toca el suelo.
  // `jinetes(c)` dibuja a los que van montados, entre el asiento y la parte de alante.
  K.motorBR = (c, x, y, { escala = 1, giro = 0, vibra = 0, luz = true, jinetes } = {}) => {
    const L = K.LINEA_BR;
    c.save();
    c.translate(x, y);
    c.rotate(giro);
    c.scale(escala, escala);
    c.translate(0, vibra);
    // Asiento y tanque detrás de los jinetes.
    K.formaBR(c, (p) => p.roundRect(-120, -330, 240, 70, 30), "#2a2a30");
    K.formaBR(c, (p) => p.roundRect(-95, -400, 190, 90, 40), "#c0392b");
    K.sombraBR(c, (p) => p.roundRect(-95, -400, 190, 90, 40), (p) => p.rect(20, -410, 90, 110), "#962d22");
    K.formaBR(c, (p) => p.roundRect(-95, -400, 190, 90, 40), null);
    if (jinetes) {
      c.save();
      c.translate(0, -vibra);
      jinetes(c);
      c.restore();
    }
    // Rueda, guardafango y horquilla.
    K.formaBR(c, (p) => p.ellipse(0, -105, 42, 105, 0, 0, Math.PI * 2), "#1c1c22");
    K.formaBR(c, (p) => p.ellipse(0, -105, 18, 60, 0, 0, Math.PI * 2), "#8a8f96", 4);
    K.formaBR(c, (p) => { p.moveTo(-52, -190); p.quadraticCurveTo(0, -240, 52, -190); p.lineTo(46, -160); p.quadraticCurveTo(0, -200, -46, -160); p.closePath(); }, "#c0392b");
    [-1, 1].forEach((l) => K.formaBR(c, (p) => p.rect(l * 40 - 8, -330, 16, 150), "#b8bcc2", 4));
    // Faro y manubrio.
    K.formaBR(c, (p) => p.roundRect(-80, -380, 160, 70, 20), "#2a2a30");
    K.formaBR(c, (p) => p.arc(0, -345, 46, 0, Math.PI * 2), luz ? "#fff3b0" : "#c9c9c9", 6);
    if (luz) {
      c.fillStyle = "rgba(255,243,176,0.25)";
      c.beginPath();
      c.arc(0, -345, 90, 0, Math.PI * 2);
      c.fill();
    }
    c.lineCap = "round";
    c.strokeStyle = L; c.lineWidth = 22;
    c.beginPath(); c.moveTo(-235, -440); c.quadraticCurveTo(0, -400, 235, -440); c.stroke();
    c.strokeStyle = "#b8bcc2"; c.lineWidth = 12; c.stroke();
    [-1, 1].forEach((l) => {
      K.formaBR(c, (p) => p.roundRect(l * 235 - 26, -456, 52, 32, 12), "#1c1c22", 4);
      c.strokeStyle = L; c.lineWidth = 6;
      c.beginPath(); c.moveTo(l * 170, -430); c.lineTo(l * 200, -540); c.stroke();
      K.formaBR(c, (p) => p.ellipse(l * 205, -560, 26, 20, 0, 0, Math.PI * 2), "#9cc9e8", 4);
    });
    c.restore();
  };

  // Carro visto de frente, para el tapón.
  K.carroBR = (c, x, y, { escala = 1, color = "#3f8fd2" } = {}) => {
    c.save();
    c.translate(x, y);
    c.scale(escala, escala);
    K.formaBR(c, (p) => p.roundRect(-200, -260, 400, 200, 30), color);
    K.formaBR(c, (p) => { p.moveTo(-150, -260); p.lineTo(-110, -380); p.lineTo(110, -380); p.lineTo(150, -260); p.closePath(); }, K.oscuro(color, 0.85));
    K.formaBR(c, (p) => { p.moveTo(-125, -270); p.lineTo(-95, -360); p.lineTo(95, -360); p.lineTo(125, -270); p.closePath(); }, "#9cc9e8", 4);
    [-1, 1].forEach((l) => {
      K.formaBR(c, (p) => p.roundRect(l * 140 - 40, -200, 80, 40, 12), "#fff3b0", 4);
      K.formaBR(c, (p) => p.roundRect(l * 160 - 30, -70, 60, 70, 12), "#1c1c22", 4);
    });
    K.formaBR(c, (p) => p.roundRect(-70, -140, 140, 40, 8), "#f4f4f4", 4);
    c.restore();
  };

  K.avionBR = (c, x, y, { escala = 1, giro = 0 } = {}) => {
    c.save();
    c.translate(x, y);
    c.rotate(giro);
    c.scale(escala, escala);
    K.formaBR(c, (p) => { p.moveTo(-40, 0); p.lineTo(-180, 90); p.lineTo(-140, 100); p.lineTo(40, 20); p.closePath(); }, "#d9dde3");
    K.formaBR(c, (p) => p.roundRect(-260, -40, 520, 80, 40), "#f4f6f8");
    K.formaBR(c, (p) => { p.moveTo(-230, -30); p.lineTo(-280, -130); p.lineTo(-210, -130); p.lineTo(-160, -30); p.closePath(); }, "#c0392b");
    for (let i = 0; i < 8; i++) K.formaBR(c, (p) => p.arc(-120 + i * 40, -8, 10, 0, Math.PI * 2), "#5aa0d0", 3);
    K.formaBR(c, (p) => { p.moveTo(-20, 10); p.lineTo(-120, -110); p.lineTo(-80, -112); p.lineTo(60, 10); p.closePath(); }, "#d9dde3");
    c.restore();
  };

  // Bocanadas de humo que suben y se abren.
  K.humoBR = (c, t, x, y, { cantidad = 6, color = "#8a8a8a", semilla = 3 } = {}) => {
    const azar = K.azar(semilla);
    for (let i = 0; i < cantidad; i++) {
      const fase = (t * 0.8 + i / cantidad) % 1;
      const dx = (azar() - 0.5) * 120;
      c.fillStyle = color;
      c.globalAlpha = 0.85 * (1 - fase);
      c.beginPath();
      c.arc(x + dx * fase, y - fase * 260, 30 + fase * 60, 0, Math.PI * 2);
      c.fill();
    }
    c.globalAlpha = 1;
  };

  // Líneas de velocidad a los lados.
  K.vientoBR = (c, t, { cantidad = 14, semilla = 4 } = {}) => {
    const azar = K.azar(semilla);
    c.strokeStyle = "rgba(255,255,255,0.75)";
    c.lineCap = "round";
    for (let i = 0; i < cantidad; i++) {
      const lado = i % 2 ? 1 : -1;
      const y0 = 300 + azar() * 1400;
      const fase = (t * 2.5 + azar()) % 1;
      const x0 = 540 + lado * (380 + fase * 300);
      c.lineWidth = 6;
      c.beginPath();
      c.moveTo(x0, y0);
      c.lineTo(x0 + lado * (80 + fase * 160), y0 + (y0 - 960) * 0.08);
      c.stroke();
    }
  };

  K.palmeraBR = (c, x, y, escala = 1) => {
    c.save();
    c.translate(x, y);
    c.scale(escala, escala);
    K.formaBR(c, (p) => { p.moveTo(-14, 0); p.quadraticCurveTo(-30, -200, 10, -400); p.lineTo(30, -400); p.quadraticCurveTo(-6, -200, 14, 0); p.closePath(); }, "#9b6b3e");
    [[-1.2, 1], [-0.5, 1.1], [0.2, 1], [0.9, 0.95], [-2.2, 0.9]].forEach(([a, l]) => {
      c.save();
      c.translate(20, -400);
      c.rotate(a);
      K.formaBR(c, (p) => { p.moveTo(0, 0); p.quadraticCurveTo(80 * l, -40, 170 * l, 30); p.quadraticCurveTo(80 * l, -5, 0, 10); p.closePath(); }, "#3f9a4a");
      c.restore();
    });
    c.restore();
  };

  // Olas que se mueven de lado a lado en una franja.
  K.olasBR = (c, t, y, { color = "#2f7fc0", espuma = "#ffffff", fase = 0 } = {}) => {
    c.fillStyle = color;
    c.beginPath();
    c.moveTo(-400, K.H + 800);
    for (let x = -400; x <= K.W + 400; x += 20) c.lineTo(x, y + Math.sin(x / 70 + t * 4 + fase) * 16);
    c.lineTo(K.W + 400, K.H + 800);
    c.closePath();
    c.fill();
    c.strokeStyle = espuma;
    c.lineWidth = 6;
    c.beginPath();
    for (let x = -400; x <= K.W + 400; x += 20) {
      const yy = y + Math.sin(x / 70 + t * 4 + fase) * 16;
      if (x === -400) c.moveTo(x, yy); else c.lineTo(x, yy);
    }
    c.stroke();
  };
})();
