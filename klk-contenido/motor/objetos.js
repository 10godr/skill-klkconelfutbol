// Objetos del juego: balón y portería con red que se deforma.
(() => {
  const K = window.KLK;

  K.balon = (c, x, y, r, giro = 0) => {
    c.save();
    c.translate(x, y);
    c.rotate(giro);
    K.forma(c, (p) => p.arc(0, 0, r, 0, Math.PI * 2), { relleno: "#ffffff", grosor: Math.max(5, r * 0.14) });
    c.beginPath();
    c.arc(0, 0, r - Math.max(2, r * 0.07), 0, Math.PI * 2);
    c.clip();
    c.fillStyle = K.TINTA;
    const poligono = (cx, cy, radio) => {
      c.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = -Math.PI / 2 + (i * Math.PI * 2) / 5;
        c.lineTo(cx + Math.cos(a) * radio, cy + Math.sin(a) * radio);
      }
      c.closePath();
      c.fill();
    };
    poligono(0, 0, r * 0.36);
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i * Math.PI * 2) / 5;
      poligono(Math.cos(a) * r * 0.95, Math.sin(a) * r * 0.95, r * 0.34);
    }
    c.restore();
  };

  // golpe = { x, y, fuerza }: punto de la red que se hunde con el balón.
  K.porteria = (c, { x, y, ancho, alto, golpe }) => {
    const mover = (px, py) => {
      if (!golpe || !golpe.fuerza) return [px, py];
      const dx = px - golpe.x;
      const dy = py - golpe.y;
      const f = Math.exp(-(dx * dx + dy * dy) / 26000) * golpe.fuerza;
      return [px - dx * f * 0.28, py - dy * f * 0.28 - f * 10];
    };
    const linea = (x1, y1, x2, y2) => {
      c.beginPath();
      for (let i = 0; i <= 14; i++) {
        const p = i / 14;
        const [px, py] = mover(K.lerp(x1, x2, p), K.lerp(y1, y2, p));
        if (i === 0) c.moveTo(px, py);
        else c.lineTo(px, py);
      }
      c.stroke();
    };

    c.fillStyle = "rgba(20, 40, 45, 0.22)";
    c.fillRect(x, y, ancho, alto);
    c.strokeStyle = "rgba(255, 255, 255, 0.78)";
    c.lineWidth = 3.5;
    for (let i = 0; i <= 16; i++) linea(x + (ancho * i) / 16, y, x + (ancho * i) / 16, y + alto);
    for (let i = 0; i <= 11; i++) linea(x, y + (alto * i) / 11, x + ancho, y + (alto * i) / 11);

    const palo = (trazar) => {
      c.lineCap = "round";
      c.lineJoin = "round";
      c.strokeStyle = K.TINTA;
      c.lineWidth = 36;
      c.beginPath();
      trazar();
      c.stroke();
      c.strokeStyle = "#ffffff";
      c.lineWidth = 20;
      c.beginPath();
      trazar();
      c.stroke();
    };
    palo(() => {
      c.moveTo(x, y + alto);
      c.lineTo(x, y);
      c.lineTo(x + ancho, y);
      c.lineTo(x + ancho, y + alto);
    });
  };
})();
