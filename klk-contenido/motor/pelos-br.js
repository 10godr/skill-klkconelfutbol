// Peinados, gorras y bigotes del estilo BR para personajes inventados.
// Coordenadas de la cabeza: centro en 0, frente en y -98 y mejillas en x ±68.
(() => {
  const K = window.KLK;

  const casco = (alto = 112, bajo = 30) => (p) => {
    p.moveTo(-68, -bajo);
    p.quadraticCurveTo(-74, -alto, 0, -alto - 4);
    p.quadraticCurveTo(74, -alto, 68, -bajo);
    p.quadraticCurveTo(52, -62, 0, -64);
    p.quadraticCurveTo(-52, -62, -68, -bajo);
    p.closePath();
  };

  K.PELO_BR = {
    // Pelo bajito, recortado.
    corto: (color) => (c) => K.formaBR(c, casco(106, 36), color),

    // Pelo con moño atrás: para la mai y las doñas.
    mono: (color) => ({
      atras: (c) => K.formaBR(c, (p) => p.arc(0, -112, 40, 0, Math.PI * 2), color),
      frente: (c) => {
        K.formaBR(c, casco(110, 20), color);
        K.forma(c, (p) => { p.moveTo(-30, -96); p.quadraticCurveTo(-10, -80, 6, -100); }, { borde: K.oscuro(color, 0.7), grosor: 4 });
      },
    }),

    // Calvo con dos lados de pelo y brillo.
    calvo: (color) => (c) => {
      [-1, 1].forEach((l) => K.formaBR(c, (p) => p.ellipse(l * 60, -30, 14, 30, l * 0.2, 0, Math.PI * 2), color));
      c.fillStyle = "rgba(255,255,255,0.35)";
      c.beginPath();
      c.ellipse(-20, -80, 18, 8, -0.4, 0, Math.PI * 2);
      c.fill();
    },

    // Gorra con visera de lado.
    gorra: (color, pelo = "#1d130d") => (c) => {
      K.formaBR(c, casco(96, 40), pelo);
      K.formaBR(c, (p) => {
        p.moveTo(-72, -52);
        p.quadraticCurveTo(-72, -128, 0, -128);
        p.quadraticCurveTo(72, -128, 72, -52);
        p.closePath();
      }, color);
      K.formaBR(c, (p) => p.ellipse(56, -56, 52, 14, -0.15, 0, Math.PI * 2), K.oscuro(color, 0.8));
    },

    // Sombrero de mariachi encima de cualquier peinado.
    mariachi: (color = "#2b2b2b", adorno = "#d9a640") => (c) => {
      K.formaBR(c, (p) => p.ellipse(0, -118, 150, 30, 0, 0, Math.PI * 2), color);
      K.formaBR(c, (p) => {
        p.moveTo(-58, -122);
        p.quadraticCurveTo(-50, -212, 0, -216);
        p.quadraticCurveTo(50, -212, 58, -122);
        p.closePath();
      }, color);
      K.forma(c, (p) => p.ellipse(0, -118, 130, 20, 0, 0, Math.PI * 2), { borde: adorno, grosor: 6 });
      K.forma(c, (p) => { p.moveTo(-56, -138); p.lineTo(56, -138); }, { borde: adorno, grosor: 8 });
    },
  };

  K.BIGOTE_BR = (color) => (c) => K.formaBR(c, (p) => {
    p.moveTo(-30, 42);
    p.quadraticCurveTo(-16, 28, 0, 36);
    p.quadraticCurveTo(16, 28, 30, 42);
    p.quadraticCurveTo(0, 46, -30, 42);
    p.closePath();
  }, color, 3);
})();
