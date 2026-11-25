// Efectos de acabado del estilo BR: transición de látigo, viñeta con luz cálida,
// sombra en el piso y camisetas a rayas recortadas al torso.
(() => {
  const K = window.KLK;

  // Látigo: la escena A sale disparada a la izquierda y la B entra desde la derecha,
  // con rayas de velocidad. p va de 0 a 1 en unos 0.3 s.
  K.latigoBR = (c, p, dibujarA, dibujarB) => {
    const e = K.curva.suave(p);
    const parte = (x, dibujar) => {
      c.save();
      c.translate(x, 0);
      dibujar();
      c.restore();
    };
    if (e < 0.5) parte(-e * 2 * K.W * 0.6, dibujarA);
    else parte((1 - e) * 2 * K.W * 0.6, dibujarB);
    const fuerza = Math.sin(p * Math.PI);
    c.fillStyle = `rgba(255,255,255,${0.55 * fuerza})`;
    const azar = K.azar(17);
    for (let i = 0; i < 26; i++) {
      const y = azar() * K.H;
      const largo = 200 + azar() * 500;
      c.fillRect(azar() * K.W - largo / 2, y, largo * fuerza, 4 + azar() * 8);
    }
  };

  // Viñeta: bordes oscuros y, si se pide, un resplandor cálido detrás del sujeto.
  K.vinetaBR = (c, { fuerza = 0.38, calido = null } = {}) => {
    if (calido) {
      const g = c.createRadialGradient(calido.x, calido.y, 0, calido.x, calido.y, calido.r || 600);
      g.addColorStop(0, "rgba(255,190,110,0.28)");
      g.addColorStop(1, "rgba(255,190,110,0)");
      c.fillStyle = g;
      c.fillRect(0, 0, K.W, K.H);
    }
    const g = c.createRadialGradient(K.W / 2, K.H * 0.45, K.H * 0.35, K.W / 2, K.H * 0.45, K.H * 0.75);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, `rgba(10,10,25,${fuerza})`);
    c.fillStyle = g;
    c.fillRect(0, 0, K.W, K.H);
  };

  K.sombraPisoBR = (c, x, y, ancho = 110, alfa = 0.22) => {
    c.fillStyle = `rgba(0,0,0,${alfa})`;
    c.beginPath();
    c.ellipse(x, y, ancho, ancho * 0.2, 0, 0, Math.PI * 2);
    c.fill();
  };

  // Camiseta a rayas verticales recortadas a la forma del torso, con su sombra.
  K.rayasBR = (colores, ancho = 34) => (c) => {
    c.save();
    c.beginPath();
    K.torsoBR(c);
    c.clip();
    for (let x = -130, i = 0; x < 130; x += ancho, i++) {
      c.fillStyle = colores[i % colores.length];
      c.fillRect(x, -830, ancho, 360);
    }
    c.fillStyle = "rgba(0,0,0,0.2)";
    c.fillRect(40, -830, 100, 360);
    c.restore();
    K.formaBR(c, K.torsoBR, null);
    K.forma(c, (p) => { p.moveTo(-34, -800); p.quadraticCurveTo(0, -770, 34, -800); }, { borde: K.LINEA_BR, grosor: 5 });
  };
})();
