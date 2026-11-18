// Utilidades base: tiempo, curvas, azar determinista, formas y cámara.
window.KLK = window.KLK || {};
(() => {
  const K = window.KLK;

  K.W = 1080;
  K.H = 1920;
  K.FPS = 30;
  K.TINTA = "#14141c";
  K.BORDE = 9;
  K.FUENTE = '"Lilita One", sans-serif';

  // Tiempos reales de la voz (tiempos.json). Sin audio, la boca se mueve siempre.
  K.tiempos = null;
  K.frase = (n) => K.tiempos.frases[n - 1];
  K.hablando = (t) => !K.tiempos || K.tiempos.frases.some((f) => t >= f.inicio && t <= f.fin);

  K.clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  K.lerp = (a, b, p) => a + (b - a) * p;
  K.prog = (t, a, b) => K.clamp((t - a) / (b - a));

  K.curva = {
    salida: (p) => 1 - (1 - p) ** 3,
    suave: (p) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2),
    rebote: (p) => {
      const c = 2.2;
      return 1 + (c + 1) * (p - 1) ** 3 + c * (p - 1) ** 2;
    },
    elastico: (p) => {
      if (p <= 0 || p >= 1) return K.clamp(p);
      return 2 ** (-10 * p) * Math.sin((p * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
    },
  };

  // Mismo resultado en cada fotograma: el render nunca parpadea.
  K.azar = (semilla) => {
    let s = semilla % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };

  K.forma = (c, trazar, { relleno, borde = K.TINTA, grosor = K.BORDE } = {}) => {
    c.beginPath();
    trazar(c);
    if (relleno) {
      c.fillStyle = relleno;
      c.fill();
    }
    if (borde && grosor) {
      c.strokeStyle = borde;
      c.lineWidth = grosor;
      c.lineJoin = "round";
      c.lineCap = "round";
      c.stroke();
    }
  };

  K.camara = (c, { x = K.W / 2, y = K.H / 2, zoom = 1, giro = 0 }, dibujar) => {
    c.save();
    c.translate(K.W / 2, K.H / 2);
    c.rotate(giro);
    c.scale(zoom, zoom);
    c.translate(-x, -y);
    dibujar();
    c.restore();
  };

  K.temblor = (t, inicio, duracion, fuerza) => {
    const p = K.prog(t, inicio, inicio + duracion);
    if (p <= 0 || p >= 1) return { x: 0, y: 0 };
    const f = fuerza * (1 - p);
    return { x: Math.sin(t * 95) * f, y: Math.cos(t * 120) * f };
  };

  // Pasa de una escena a otra con un barrido horizontal.
  K.barrido = (c, p, escenaA, escenaB) => {
    const d = K.curva.suave(p) * K.W;
    const parte = (x, dibujar) => {
      c.save();
      c.beginPath();
      c.rect(x, 0, K.W, K.H);
      c.clip();
      c.translate(x, 0);
      dibujar();
      c.restore();
    };
    parte(-d, escenaA);
    parte(K.W - d, escenaB);
  };
})();
