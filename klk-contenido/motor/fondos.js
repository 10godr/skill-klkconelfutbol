// Fondos 2D planos. Se dibujan más anchos que el lienzo para que la cámara se mueva.
(() => {
  const K = window.KLK;
  const IZQ = -500;
  const ANCHO = K.W + 1000;

  function nube(c, x, y, e) {
    K.forma(c, (p) => {
      p.arc(x - 70 * e, y, 44 * e, Math.PI * 0.5, Math.PI * 1.5);
      p.arc(x - 18 * e, y - 34 * e, 58 * e, Math.PI, Math.PI * 1.9);
      p.arc(x + 62 * e, y - 6 * e, 42 * e, Math.PI * 1.3, Math.PI * 0.5);
      p.closePath();
    }, { relleno: "#ffffff", grosor: 7 });
  }

  function torreLuz(c, x, y) {
    c.fillStyle = "#3a3f4d";
    c.fillRect(x - 8, y, 16, 330);
    K.forma(c, (p) => p.roundRect(x - 62, y - 42, 124, 52, 10), { relleno: "#3a3f4d", grosor: 7 });
    c.fillStyle = "#fff4b8";
    for (let i = 0; i < 3; i++) {
      c.beginPath();
      c.arc(x - 36 + i * 36, y - 16, 12, 0, Math.PI * 2);
      c.fill();
    }
  }

  function grama(c, yInicio) {
    let y = yInicio;
    let alto = 62;
    let i = 0;
    while (y < K.H + 500) {
      c.fillStyle = i % 2 ? "#3fae49" : "#4cbf52";
      c.fillRect(IZQ, y, ANCHO, alto + 1);
      y += alto;
      alto *= 1.22;
      i++;
    }
  }

  K.cancha = (c, t) => {
    const cielo = c.createLinearGradient(0, 0, 0, 1060);
    cielo.addColorStop(0, "#4fb2ea");
    cielo.addColorStop(1, "#bfe9f7");
    c.fillStyle = cielo;
    c.fillRect(IZQ, -500, ANCHO, 1600);

    nube(c, ((t * 16 + 180) % 1500) - 200, 300, 1.25);
    nube(c, ((t * 10 + 980) % 1500) - 200, 520, 0.85);

    K.forma(c, (p) => {
      p.moveTo(IZQ, 960);
      for (let x = IZQ; x <= IZQ + ANCHO; x += 180) {
        p.quadraticCurveTo(x + 90, 870 + (x % 360 === 0 ? 0 : 36), x + 180, 960);
      }
      p.lineTo(IZQ + ANCHO, 1100);
      p.lineTo(IZQ, 1100);
      p.closePath();
    }, { relleno: "#2c7d44", grosor: 0, borde: null });

    K.forma(c, (p) => p.rect(40, 850, 330, 190), { relleno: "#8a93a3", grosor: 7 });
    c.fillStyle = "#6c7585";
    for (let i = 0; i < 5; i++) c.fillRect(40, 880 + i * 32, 330, 12);
    torreLuz(c, 840, 690);
    torreLuz(c, -120, 690);

    grama(c, 1040);
    c.fillStyle = "#ffffff";
    c.fillRect(IZQ, 1300, ANCHO, 12);
  };

  K.estadio = (c, t) => {
    const bandas = ["#3f2a78", "#70307f", "#b53d78", "#ec6a52", "#f9a64a"];
    bandas.forEach((color, i) => {
      c.fillStyle = color;
      c.fillRect(IZQ, -500 + i * 250, ANCHO, 260);
    });

    c.fillStyle = "#231a3d";
    c.fillRect(IZQ, 700, ANCHO, 820);

    const azar = K.azar(77);
    const colores = ["#f15b5b", "#ffd23f", "#6ec6ff", "#ffffff", "#7ddc6b", "#ff9f43", "#c98bff"];
    for (let fila = 0; fila < 11; fila++) {
      const y = 760 + fila * 66;
      const r = 25 + fila * 1.5;
      for (let x = IZQ + (fila % 2) * 28; x < IZQ + ANCHO; x += r * 2.15) {
        const fase = azar() * 6.28;
        const color = colores[Math.floor(azar() * colores.length)];
        const piel = azar() > 0.5 ? "#e9b48c" : "#8d5a3c";
        const salto = Math.max(0, Math.sin(t * 7 + fase)) * 14;
        K.forma(c, (p) => p.roundRect(x - r, y + r * 0.7 - salto, r * 2, r * 1.5, 12), { relleno: color, grosor: 5 });
        K.forma(c, (p) => p.arc(x, y - salto, r * 0.78, 0, Math.PI * 2), { relleno: piel, grosor: 5 });
      }
    }

    K.forma(c, (p) => p.rect(IZQ, 1440, ANCHO, 90), { relleno: "#14141c", grosor: 0, borde: null });
    c.fillStyle = "#ffd23f";
    c.font = `58px ${K.FUENTE}`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    for (let x = -300; x < 1500; x += 620) c.fillText("KLK CON EL FÚTBOL", x, 1488);
    grama(c, 1530);
  };
})();
