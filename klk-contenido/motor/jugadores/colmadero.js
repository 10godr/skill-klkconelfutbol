// El colmadero: personaje inventado. Señor con gorra roja y bigote grueso.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};

  const BIGOTE = "#2b2622";
  const GORRA = "#c8322b";
  const VISERA = "#9c241f";

  K.JUGADORES.colmadero = {
    nombre: "COLMADERO",
    numero: "",
    piel: "#94613d",
    camisa: "#f1ece0",
    manga: "#f1ece0",
    short: "#3d3f49",
    media: "#3d3f49",
    bota: "#2a2320",
    colorNumero: "#1d2340",
    colorCeja: BIGOTE,
    rostro: {
      orejaX: 174, ojoX: 66, ojoY: -22, ojoAncho: 30, ojoAlto: 28, iris: "#2a170c", bocaAncho: 40,
      cejaExt: [112, -60], cejaMedio: [70, -72], cejaInt: [26, -54], cejaGrosor: 20,
    },
    // Bigote ancho que casi tapa la boca.
    barba: (c) => {
      c.fillStyle = BIGOTE;
      c.beginPath();
      c.moveTo(-92, 86);
      c.quadraticCurveTo(-58, 34, 0, 52);
      c.quadraticCurveTo(58, 34, 92, 86);
      c.quadraticCurveTo(46, 66, 0, 74);
      c.quadraticCurveTo(-46, 66, -92, 86);
      c.closePath();
      c.fill();
    },
    nariz: (c) => {
      K.forma(c, (p) => p.ellipse(0, 28, 30, 24, 0, 0, Math.PI * 2), { relleno: "#a56f49", borde: "#6d4426", grosor: 7 });
    },
    // Gorra lisa, sin marca.
    pelo: (c) => {
      K.forma(c, (p) => {
        p.moveTo(-170, -82);
        p.bezierCurveTo(-170, -214, -86, -252, 0, -252);
        p.bezierCurveTo(86, -252, 170, -214, 170, -82);
        p.quadraticCurveTo(0, -128, -170, -82);
        p.closePath();
      }, { relleno: GORRA });
      K.forma(c, (p) => {
        p.moveTo(-178, -84);
        p.quadraticCurveTo(0, -136, 178, -84);
        p.quadraticCurveTo(204, -62, 176, -54);
        p.quadraticCurveTo(0, -98, -176, -54);
        p.quadraticCurveTo(-204, -62, -178, -84);
        p.closePath();
      }, { relleno: VISERA });
    },
  };
})();
