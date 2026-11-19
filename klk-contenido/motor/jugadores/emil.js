// Emil: personaje inventado. Flaco de cara, orejón, ojos grandes y motas despeinadas.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};

  const PELO = "#1d130d";

  const EMIL = {
    nombre: "EMIL",
    numero: "",
    piel: "#c08552",
    camisa: "#f2c230",
    manga: "#f2c230",
    short: "#3a5fa0",
    media: "#ffffff",
    bota: "#7a4a25",
    colorNumero: "#1d2340",
    colorCeja: PELO,
    rostro: {
      orejaX: 178, ojoX: 68, ojoY: -14, ojoAncho: 47, ojoAlto: 54, iris: "#3b2312", bocaAncho: 42,
      cejaExt: [118, -84], cejaMedio: [74, -112], cejaInt: [28, -104], cejaGrosor: 13,
    },
    // Pelusa de bigote: quiere barba y no le sale.
    barba: (c) => {
      c.fillStyle = PELO;
      [-40, -26, -12, 12, 26, 40].forEach((x) => {
        c.beginPath();
        c.arc(x, 68 - Math.abs(x) * -0.1, 3.5, 0, Math.PI * 2);
        c.fill();
      });
    },
    nariz: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-8, 26);
        p.quadraticCurveTo(20, 42, -6, 56);
      }, { borde: "#8f5a33", grosor: 8 });
    },
    // Motas redondas y disparejas.
    pelo: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-168, -50);
        p.arc(-142, -112, 54, Math.PI * 0.8, Math.PI * 1.6);
        p.arc(-78, -180, 62, Math.PI * 1.05, Math.PI * 1.8);
        p.arc(4, -208, 66, Math.PI * 1.15, Math.PI * 1.85);
        p.arc(84, -176, 60, Math.PI * 1.25, Math.PI * 1.95);
        p.arc(144, -108, 52, Math.PI * 1.4, Math.PI * 0.2);
        p.quadraticCurveTo(128, -124, 76, -136);
        p.quadraticCurveTo(0, -158, -76, -136);
        p.quadraticCurveTo(-128, -124, -168, -50);
        p.closePath();
      }, { relleno: PELO });
    },
  };

  K.JUGADORES.emil = EMIL;
  // El mismo Emil con el traje de paca: las mangas y el saco le quedan grandes.
  K.JUGADORES.emilTraje = { ...EMIL, camisa: "#7d6a4f", manga: "#7d6a4f", short: "#6a5943", bota: "#3a2a1c" };
})();
