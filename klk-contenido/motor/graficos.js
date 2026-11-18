// Gráficos sobre la escena: píldoras de datos, estallidos y confeti.
(() => {
  const K = window.KLK;

  K.texto = (c, txt, x, y, { tam = 80, color = "#fff", borde = K.TINTA, grosor = 14, alinear = "center" } = {}) => {
    c.font = `${tam}px ${K.FUENTE}`;
    c.textAlign = alinear;
    c.textBaseline = "middle";
    c.lineJoin = "round";
    if (borde && grosor) {
      c.strokeStyle = borde;
      c.lineWidth = grosor;
      c.strokeText(txt, x, y);
    }
    c.fillStyle = color;
    c.fillText(txt, x, y);
  };

  // Número grande y unidad pequeña dentro de una píldora oscura.
  K.pildora = (c, { x, y, numero, unidad = "", tam = 150, escala = 1, color = "#ffd23f" }) => {
    if (escala <= 0.01) return;
    c.save();
    c.translate(x, y);
    c.scale(escala, escala);
    c.font = `${tam}px ${K.FUENTE}`;
    const anchoNum = c.measureText(numero).width;
    const tamU = tam * 0.42;
    c.font = `${tamU}px ${K.FUENTE}`;
    const anchoU = unidad ? c.measureText(unidad).width + tam * 0.18 : 0;
    const ancho = anchoNum + anchoU + tam * 0.7;
    const alto = tam * 1.32;
    K.forma(c, (p) => p.roundRect(-ancho / 2, -alto / 2, ancho, alto, alto * 0.32), { relleno: K.TINTA, borde: "#ffffff", grosor: 8 });
    const xi = -(anchoNum + anchoU) / 2;
    K.texto(c, numero, xi, tam * 0.04, { tam, color, borde: null, alinear: "left" });
    if (unidad) K.texto(c, unidad, xi + anchoNum + tam * 0.18, tam * 0.14, { tam: tamU, color: "#ffffff", borde: null, alinear: "left" });
    c.restore();
  };

  // Etiqueta corta para nombres y fechas.
  K.etiqueta = (c, { x, y, texto, tam = 76, escala = 1, fondo = "#ffd23f", color = K.TINTA, giro = -0.03 }) => {
    if (escala <= 0.01) return;
    c.save();
    c.translate(x, y);
    c.rotate(giro);
    c.scale(escala, escala);
    c.font = `${tam}px ${K.FUENTE}`;
    const ancho = c.measureText(texto).width + tam * 0.9;
    const alto = tam * 1.45;
    K.forma(c, (p) => p.roundRect(-ancho / 2, -alto / 2, ancho, alto, 22), { relleno: fondo, grosor: 9 });
    K.texto(c, texto, 0, tam * 0.05, { tam, color, borde: null });
    c.restore();
  };

  K.estallido = (c, x, y, radio, puntas = 12, relleno = "#ffd23f") => {
    K.forma(c, (p) => {
      for (let i = 0; i < puntas * 2; i++) {
        const r = i % 2 ? radio * 0.68 : radio;
        const a = (i * Math.PI) / puntas;
        p.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
      }
      p.closePath();
    }, { relleno, grosor: 10 });
  };

  K.confeti = (c, t, inicio, { cantidad = 120, semilla = 9 } = {}) => {
    const azar = K.azar(semilla);
    const colores = ["#ffd23f", "#f15b5b", "#6ec6ff", "#ffffff", "#7ddc6b"];
    for (let i = 0; i < cantidad; i++) {
      const x0 = azar() * K.W;
      const retraso = azar() * 1.8;
      const vel = 520 + azar() * 420;
      const fase = azar() * 6.28;
      const color = colores[Math.floor(azar() * colores.length)];
      const edad = t - inicio - retraso;
      if (edad < 0) continue;
      c.save();
      c.translate(x0 + Math.sin(edad * 3 + fase) * 46, -40 + edad * vel);
      c.rotate(edad * 6 + fase);
      c.fillStyle = color;
      c.fillRect(-11, -6, 22, 12);
      c.restore();
    }
  };
})();
