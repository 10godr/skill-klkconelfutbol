// Gente del barrio en estilo BR: todos inventados.
(() => {
  const K = window.KLK;
  K.JUGADORES = K.JUGADORES || {};
  const P = K.PELO_BR;
  const NEGRO = "#1d130d";

  const base = {
    media: "#ffffff", tenis: "#f4f4f4", suela: "#c9c9c9", colorCeja: NEGRO,
    rostro: { iris: "#3b2312" },
  };
  const persona = (extra) => ({ ...base, manga: extra.camisa, ...extra });

  Object.assign(K.JUGADORES, {
    junior: persona({ nombre: "JUNIOR", piel: "#8a5a36", camisa: "#d8443a", short: "#2c2c34", pelo: P.corto(NEGRO) }),
    yeison: persona({ nombre: "YEISON", piel: "#c99468", camisa: "#3f8fd2", short: "#ffffff", pelo: P.gorra("#e0b020") }),
    kelvin: persona({ nombre: "KELVIN", piel: "#6e4428", camisa: "#ffffff", short: "#3a7a3a", pelo: P.corto(NEGRO) }),
    colmaderoBR: persona({
      nombre: "COLMADERO", piel: "#c08552", camisa: "#f4f1e6", short: "#4b5a7a",
      tenis: "#5a3b22", suela: "#3a2716", pelo: P.calvo(NEGRO), barba: K.BIGOTE_BR(NEGRO),
    }),
    mai: persona({
      nombre: "MAI", piel: "#a66d43", camisa: "#e98bb0", falda: "#7a4fa0",
      tenis: "#f0d9a8", suela: "#c9b48a", colorCeja: "#2a1a10",
      peloAtras: P.mono("#2a1a10").atras, pelo: P.mono("#2a1a10").frente,
    }),
    presentador: persona({
      nombre: "PRESENTADOR", piel: "#d2a47c", camisa: "#26324d", short: "#26324d",
      tenis: "#1a1a1a", suela: "#111111", pelo: P.corto("#3a2a1c"),
      estampado: (c) => {
        K.formaBR(c, (p) => { p.moveTo(-14, -790); p.lineTo(14, -790); p.lineTo(8, -640); p.lineTo(0, -620); p.lineTo(-8, -640); p.closePath(); }, "#c43a3a", 4);
      },
    }),
  });

  // Motoconchista: gorra roja de lado, bigote fino y chaleco naranja con su número.
  K.JUGADORES.motoconchista = persona({
    nombre: "MOTOCONCHISTA", piel: "#7a4b2c", camisa: "#f08a24", manga: "#3a3a3a", short: "#3b4a6b",
    tenis: "#2b2b2b", suela: "#151515", pelo: P.gorra("#c8322b"), barba: K.BIGOTE_BR(NEGRO),
    estampado: (c) => {
      K.formaBR(c, (p) => p.roundRect(-52, -720, 104, 70, 10), "#ffffff", 4);
      K.texto(c, "27", 0, -684, { tam: 52, color: K.LINEA_BR, borde: null, grosor: 0 });
      c.fillStyle = "#e9e9e9";
      c.fillRect(-90, -600, 180, 16);
    },
  });

  // Vecinos con sombrero de mariachi: el peinado de abajo más el sombrero encima.
  const conSombrero = (peinado) => (c) => { peinado(c); P.mariachi()(c); };
  K.JUGADORES.vecinoA = persona({ piel: "#8a5a36", camisa: "#f2c230", short: "#333333", pelo: conSombrero(P.corto(NEGRO)), barba: K.BIGOTE_BR(NEGRO) });
  K.JUGADORES.vecinaB = persona({ piel: "#c99468", camisa: "#4fb08a", falda: "#333333", pelo: conSombrero(P.mono("#3a2a1c").frente) });
  K.JUGADORES.vecinoC = persona({ piel: "#6e4428", camisa: "#e06a2c", short: "#333333", pelo: conSombrero(P.calvo(NEGRO)) });
})();
