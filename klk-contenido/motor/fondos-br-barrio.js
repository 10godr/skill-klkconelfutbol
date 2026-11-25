// Fondos del barrio en estilo BR: cancha de tierra, colmado, calle y noticiero.
(() => {
  const K = window.KLK;
  const L = () => K.LINEA_BR;

  function cielo(c, alto, arriba = "#7fc0ea", abajo = "#cfe8f5") {
    const g = c.createLinearGradient(0, 0, 0, alto);
    g.addColorStop(0, arriba);
    g.addColorStop(1, abajo);
    c.fillStyle = g;
    c.fillRect(-400, -800, K.W + 800, alto + 800);
  }

  const CASAS = ["#f08a9b", "#7fd1c2", "#f4d35e", "#8fb3f0", "#f6a05a", "#b99be0"];

  function casa(c, x, base, ancho, alto, color, ventanas = true) {
    K.formaBR(c, (p) => p.rect(x, base - alto, ancho, alto), color, 6);
    K.formaBR(c, (p) => p.rect(x - 10, base - alto - 24, ancho + 20, 24), K.oscuro(color, 0.75), 6);
    if (!ventanas) return;
    K.formaBR(c, (p) => p.rect(x + ancho * 0.2, base - alto * 0.72, ancho * 0.24, alto * 0.24), "#2e3a4a", 5);
    K.formaBR(c, (p) => p.rect(x + ancho * 0.58, base - alto * 0.5, ancho * 0.26, alto * 0.5), "#7a4a2a", 5);
  }

  // Cancha de tierra con casas de colores y verja de zinc al fondo.
  K.canchaTierraBR = (c) => {
    const horizonte = 860;
    cielo(c, horizonte);
    CASAS.forEach((color, i) => casa(c, -40 + i * 200, horizonte - 120, 190, 260 + (i % 3) * 50, color));
    c.fillStyle = "#9aa3a8";
    c.fillRect(0, horizonte - 140, K.W, 140);
    c.strokeStyle = "#7a8288";
    c.lineWidth = 4;
    for (let x = 0; x < K.W; x += 36) { c.beginPath(); c.moveTo(x, horizonte - 140); c.lineTo(x, horizonte); c.stroke(); }
    K.formaBR(c, (p) => p.rect(-10, horizonte - 140, K.W + 20, 140), null, 6);
    c.fillStyle = "#c79a64";
    c.fillRect(-400, horizonte, K.W + 800, K.H - horizonte + 900);
    const azar = K.azar(11);
    c.fillStyle = "#b3884f";
    for (let i = 0; i < 60; i++) {
      c.beginPath();
      c.ellipse(azar() * K.W, horizonte + 40 + azar() * (K.H - horizonte), 8 + azar() * 26, 4 + azar() * 8, 0, 0, Math.PI * 2);
      c.fill();
    }
  };

  // Colmado: estantes llenos, letrero y mostrador abajo.
  K.colmadoBR = (c) => {
    c.fillStyle = "#f2d27a";
    c.fillRect(-400, -800, K.W + 800, K.H + 1600);
    K.formaBR(c, (p) => p.rect(80, 180, 920, 120), "#c83a32", 8);
    K.texto(c, "COLMADO EL PANA", 540, 262, { tam: 72, color: "#ffffff", borde: L(), grosor: 8 });
    const colores = ["#e0483e", "#3f8fd2", "#f2c230", "#4fb08a", "#ffffff", "#e98bb0"];
    [420, 620, 820].forEach((y, fila) => {
      K.formaBR(c, (p) => p.rect(60, y, 960, 18), "#8a5a36", 5);
      for (let i = 0; i < 12; i++) {
        const col = colores[(i + fila * 2) % colores.length];
        K.formaBR(c, (p) => p.roundRect(80 + i * 78, y - 120 + (i % 2) * 20, 60, 120 - (i % 2) * 20, 6), col, 4);
      }
    });
    K.formaBR(c, (p) => p.rect(-400, 1300, K.W + 800, 1500), "#7a4a2a", 8);
    K.formaBR(c, (p) => p.rect(-10, 1260, K.W + 20, 60), "#a8703f", 8);
  };

  // Calle con fachadas grandes y ventanas donde se asoman los vecinos.
  K.calleBR = (c) => {
    cielo(c, 600);
    [[-20, "#f08a9b"], [360, "#7fd1c2"], [720, "#f4d35e"]].forEach(([x, color]) => {
      K.formaBR(c, (p) => p.rect(x, 300, 380, 1400), color, 8);
      if (x < 0) K.formaBR(c, (p) => p.rect(x - 400, 300, 400, 1400), K.oscuro(color, 0.9), 8);
      if (x > 600) K.formaBR(c, (p) => p.rect(x + 380, 300, 400, 1400), K.oscuro(color, 0.9), 8);
      K.formaBR(c, (p) => p.rect(x - 10, 270, 400, 40), K.oscuro(color, 0.75), 8);
    });
    c.fillStyle = "#8d8d8d";
    c.fillRect(-400, 1700, K.W + 800, 1100);
    K.formaBR(c, (p) => p.rect(-10, 1690, K.W + 20, 30), "#b9b9b9", 6);
  };

  // Marco de ventana; `adentro` dibuja lo que se asoma, recortado al hueco.
  K.ventanaBR = (c, x, y, ancho, alto, adentro) => {
    K.formaBR(c, (p) => p.rect(x, y, ancho, alto), "#2e3a4a", 8);
    c.save();
    c.beginPath();
    c.rect(x, y, ancho, alto);
    c.clip();
    if (adentro) adentro();
    c.restore();
    K.formaBR(c, (p) => p.rect(x, y, ancho, alto), null, 10);
    K.formaBR(c, (p) => p.rect(x - 16, y + alto, ancho + 32, 22), "#f2ece0", 6);
  };

  // Estudio de noticias: fondo azul con líneas y mesa al frente.
  K.noticieroBR = (c, t) => {
    const g = c.createLinearGradient(0, 0, 0, K.H);
    g.addColorStop(0, "#0e2a5a");
    g.addColorStop(1, "#06142e");
    c.fillStyle = g;
    c.fillRect(0, 0, K.W, K.H);
    c.strokeStyle = "rgba(120,170,255,0.25)";
    c.lineWidth = 3;
    for (let i = 0; i < 9; i++) {
      c.beginPath();
      c.arc(540, 700, 120 + i * 70 + ((t * 40) % 70), 0, Math.PI * 2);
      c.stroke();
    }
  };

  K.mesaNoticieroBR = (c) => {
    K.formaBR(c, (p) => { p.moveTo(40, 1200); p.lineTo(1040, 1200); p.lineTo(1000, 2100); p.lineTo(80, 2100); p.closePath(); }, "#d8dde6", 8);
    K.formaBR(c, (p) => p.rect(40, 1180, 1000, 40), "#ffffff", 8);
  };

  // Banda roja de última hora.
  K.bandaUltimaHora = (c, texto, p = 1) => {
    c.save();
    c.translate(K.lerp(-K.W, 0, K.curva.salida(p)), 0);
    K.formaBR(c, (q) => q.rect(0, 1580, K.W, 110), "#c8102e", 0);
    K.formaBR(c, (q) => q.rect(0, 1580, 330, 110), "#ffffff", 0);
    K.texto(c, "ÚLTIMA HORA", 165, 1636, { tam: 44, color: "#c8102e", borde: null, grosor: 0 });
    K.texto(c, texto, 700, 1636, { tam: 50, color: "#ffffff", borde: null, grosor: 0 });
    c.restore();
  };
})();
