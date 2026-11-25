// Fondos del estilo BR: interiores con detalle, colores planos y contorno fino.
(() => {
  const K = window.KLK;

  // Cuarto del barrio: pared, ventana, afiche, piso de madera y cama a la izquierda.
  K.cuartoBR = (c, t, { pared = "#e8d9bd", piso = "#a8703f", cama = true } = {}) => {
    const suelo = 1380;
    c.fillStyle = pared;
    c.fillRect(-400, -800, K.W + 800, suelo + 800);
    c.fillStyle = K.oscuro(pared, 0.93);
    c.fillRect(0, 0, K.W, 120);
    // Ventana con cielo de tarde.
    K.formaBR(c, (p) => p.rect(640, 330, 300, 360), "#8fc3e8", 8);
    c.fillStyle = "#f6e3b5";
    c.beginPath();
    c.arc(860, 420, 34, 0, Math.PI * 2);
    c.fill();
    K.formaBR(c, (p) => { p.moveTo(790, 330); p.lineTo(790, 690); p.moveTo(640, 510); p.lineTo(940, 510); }, null, 8);
    K.formaBR(c, (p) => p.rect(620, 690, 340, 22), "#d9c6a2", 5);
    // Afiche de un balón: sin escudos ni marcas.
    K.formaBR(c, (p) => p.rect(170, 300, 260, 340), "#2f7a4a", 6);
    K.formaBR(c, (p) => p.arc(300, 440, 70, 0, Math.PI * 2), "#ffffff", 5);
    K.formaBR(c, (p) => {
      for (let i = 0; i < 5; i++) {
        const a = -Math.PI / 2 + i * (Math.PI * 2) / 5;
        const x = 300 + Math.cos(a) * 24;
        const y = 440 + Math.sin(a) * 24;
        if (i) p.lineTo(x, y); else p.moveTo(x, y);
      }
      p.closePath();
    }, K.LINEA_BR, 4);
    K.texto(c, "10", 300, 590, { tam: 56, color: "#ffffff", borde: K.LINEA_BR, grosor: 6 });
    // Zócalo y piso.
    c.fillStyle = piso;
    c.fillRect(-400, suelo, K.W + 800, K.H - suelo + 900);
    c.strokeStyle = K.oscuro(piso, 0.78);
    c.lineWidth = 4;
    for (let y = suelo + 70, i = 0; y < K.H; y += 90, i++) {
      c.beginPath();
      c.moveTo(0, y);
      c.lineTo(K.W, y);
      for (let x = (i % 2) * 170 + 90; x < K.W; x += 340) {
        c.moveTo(x, y);
        c.lineTo(x, y + 90);
      }
      c.stroke();
    }
    K.formaBR(c, (p) => p.rect(-10, suelo - 30, K.W + 20, 30), "#f2ece0", 5);
    if (cama) camaBR(c, suelo);
  };

  function camaBR(c, suelo) {
    K.formaBR(c, (p) => p.roundRect(-60, suelo - 470, 120, 520, 16), "#7a3e2a", 6);
    K.formaBR(c, (p) => p.rect(-40, suelo - 210, 330, 250), "#6a3424", 6);
    K.formaBR(c, (p) => p.roundRect(-40, suelo - 260, 340, 110, 20), "#f7f7f2", 6);
    K.formaBR(c, (p) => p.roundRect(10, suelo - 310, 150, 70, 30), "#ffffff", 6);
    K.forma(c, (p) => {
      p.moveTo(120, suelo - 220);
      p.quadraticCurveTo(160, suelo - 200, 200, suelo - 215);
      p.moveTo(230, suelo - 240);
      p.quadraticCurveTo(250, suelo - 200, 280, suelo - 190);
    }, { borde: "#c9c9c0", grosor: 4 });
  }
})();
