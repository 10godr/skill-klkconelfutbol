// Fondos del viaje en estilo BR: aeropuerto, playa, carretera, mar y Madrid de noche.
(() => {
  const K = window.KLK;

  function degradado(c, arriba, abajo, alto = K.H) {
    const g = c.createLinearGradient(0, 0, 0, alto);
    g.addColorStop(0, arriba);
    g.addColorStop(1, abajo);
    c.fillStyle = g;
    c.fillRect(-400, -800, K.W + 800, alto + 800);
  }

  function nube(c, x, y, e = 1) {
    c.fillStyle = "#ffffff";
    [[0, 0, 60], [60, 10, 45], [-60, 12, 42], [25, -30, 45]].forEach(([dx, dy, r]) => {
      c.beginPath();
      c.arc(x + dx * e, y + dy * e, r * e, 0, Math.PI * 2);
      c.fill();
    });
  }

  // Pista del aeropuerto con ventanal.
  K.aeropuertoBR = (c, t) => {
    degradado(c, "#7fc0ea", "#d8eef8", 1100);
    nube(c, 220, 300, 1.2);
    nube(c, 820, 420, 0.9);
    c.fillStyle = "#6f777d";
    c.fillRect(-400, 1100, K.W + 800, 1700);
    c.strokeStyle = "#f4f4f4";
    c.lineWidth = 14;
    for (let x = -200; x < K.W + 200; x += 220) { c.beginPath(); c.moveTo(x, 1250); c.lineTo(x + 120, 1250); c.stroke(); }
    // Marco del ventanal.
    K.formaBR(c, (p) => p.rect(-20, 120, K.W + 40, 1180), null, 18);
    [360, 720].forEach((x) => K.formaBR(c, (p) => p.rect(x - 8, 120, 16, 1180), "#3a3f46", 4));
    c.fillStyle = "#c9c2b5";
    c.fillRect(-400, 1300, K.W + 800, 1500);
    K.formaBR(c, (p) => p.rect(-20, 1300, K.W + 40, 20), "#8a8478", 5);
  };

  // Playa con villa, palmeras y hamaca entre dos palmas.
  K.playaBR = (c, t) => {
    degradado(c, "#5fb2e8", "#cfeaf7", 900);
    nube(c, 250, 260);
    c.fillStyle = "#f6e3b5";
    c.beginPath(); c.arc(860, 240, 70, 0, Math.PI * 2); c.fill();
    K.olasBR(c, t, 900, { color: "#2fa3c9" });
    c.fillStyle = "#f2d9a0";
    c.beginPath();
    c.moveTo(-400, 1120);
    c.quadraticCurveTo(540, 1040, K.W + 400, 1120);
    c.lineTo(K.W + 400, K.H + 800);
    c.lineTo(-400, K.H + 800);
    c.closePath();
    c.fill();
    // Villa al fondo.
    K.formaBR(c, (p) => p.rect(640, 640, 340, 280), "#f7f2e6", 6);
    K.formaBR(c, (p) => { p.moveTo(610, 650); p.lineTo(810, 520); p.lineTo(1010, 650); p.closePath(); }, "#c86b3c", 6);
    K.formaBR(c, (p) => p.rect(700, 720, 80, 80), "#7fc0ea", 5);
    K.formaBR(c, (p) => p.rect(840, 760, 80, 160), "#8a5a36", 5);
    K.palmeraBR(c, 130, 1500, 1.4);
    K.palmeraBR(c, 960, 1520, 1.3);
  };

  K.hamacaBR = (c, x1, y1, x2, y2, comba = 160) => {
    c.lineCap = "round";
    c.strokeStyle = K.LINEA_BR;
    c.lineWidth = 6;
    c.beginPath();
    c.moveTo(x1, y1);
    c.quadraticCurveTo((x1 + x2) / 2, Math.max(y1, y2) + comba, x2, y2);
    c.stroke();
    K.formaBR(c, (p) => {
      p.moveTo(x1 + 60, y1 + 40);
      p.quadraticCurveTo((x1 + x2) / 2, Math.max(y1, y2) + comba + 60, x2 - 60, y2 + 40);
      p.quadraticCurveTo((x1 + x2) / 2, Math.max(y1, y2) + comba - 10, x1 + 60, y1 + 40);
      p.closePath();
    }, "#e0483e");
  };

  // Carretera en perspectiva; `velocidad` mueve las rayas.
  K.carreteraBR = (c, t, { velocidad = 1.5, cielo = ["#7fc0ea", "#d8eef8"], horizonte = 820 } = {}) => {
    degradado(c, cielo[0], cielo[1], horizonte);
    c.fillStyle = "#8fbf6a";
    c.fillRect(-400, horizonte, K.W + 800, K.H + 800);
    c.fillStyle = "#5d6166";
    c.beginPath();
    c.moveTo(500, horizonte);
    c.lineTo(580, horizonte);
    c.lineTo(K.W + 400, K.H + 400);
    c.lineTo(-400, K.H + 400);
    c.closePath();
    c.fill();
    c.fillStyle = "#f4f4f4";
    for (let i = 0; i < 8; i++) {
      const f = ((i / 8) + t * velocidad * 0.25) % 1;
      const p = f * f;
      const y = horizonte + p * (K.H - horizonte + 200);
      const ancho = 4 + p * 26;
      const largo = 10 + p * 140;
      c.fillRect(540 - ancho / 2, y, ancho, largo);
    }
  };

  // Mar abierto con el horizonte alto.
  K.marBR = (c, t) => {
    degradado(c, "#5fb2e8", "#cfeaf7", 700);
    nube(c, 200, 280);
    nube(c, 820, 200, 0.8);
    K.olasBR(c, t, 700, { color: "#2a7fba" });
    K.olasBR(c, t, 1100, { color: "#2370a8", fase: 1.5 });
    K.olasBR(c, t, 1550, { color: "#1d6399", fase: 3 });
  };

  // Madrid de noche con un estadio iluminado genérico, sin marcas.
  K.estadioNocheBR = (c, t, { cerca = 0 } = {}) => {
    degradado(c, "#0b1430", "#2a2f5a", 1200);
    const azar = K.azar(9);
    c.fillStyle = "#ffffff";
    for (let i = 0; i < 50; i++) {
      c.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t * 2 + i));
      c.beginPath();
      c.arc(azar() * K.W, azar() * 700, 2 + azar() * 2, 0, Math.PI * 2);
      c.fill();
    }
    c.globalAlpha = 1;
    const e = 1 + cerca;
    c.save();
    c.translate(540, 1150);
    c.scale(e, e);
    c.fillStyle = "rgba(255,240,200,0.18)";
    c.beginPath(); c.ellipse(0, -260, 520, 220, 0, 0, Math.PI * 2); c.fill();
    K.formaBR(c, (p) => p.roundRect(-420, -360, 840, 360, 40), "#d6d9e0", 6);
    for (let i = 0; i < 10; i++) K.formaBR(c, (p) => p.rect(-400 + i * 84, -330, 50, 300), "#b8bcc6", 3);
    K.formaBR(c, (p) => p.roundRect(-440, -400, 880, 60, 20), "#eef0f4", 6);
    [-380, -130, 130, 380].forEach((x) => {
      K.formaBR(c, (p) => p.rect(x - 6, -560, 12, 170), "#8a8f96", 3);
      K.formaBR(c, (p) => p.roundRect(x - 40, -600, 80, 44, 8), "#fff3b0", 4);
    });
    c.restore();
    c.fillStyle = "#14182a";
    c.fillRect(-400, 1150, K.W + 800, 1700);
  };
})();
