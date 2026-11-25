// Cuerpo estilo BR: proporciones reales, contorno fino y una sombra plana.
// Origen entre los pies. Mide unos 1040 px de alto a escala 1.
(() => {
  const K = window.KLK;
  const LINEA = "#1b1512";
  const B = 5;

  K.LINEA_BR = LINEA;

  // Oscurece un color #rrggbb para la sombra plana.
  K.oscuro = (hex, f = 0.8) => {
    const n = parseInt(hex.slice(1), 16);
    const canal = (v) => Math.round(v * f);
    return `rgb(${canal(n >> 16)},${canal((n >> 8) & 255)},${canal(n & 255)})`;
  };

  // Forma con contorno fino del estilo BR.
  K.formaBR = (c, trazar, relleno, grosor = B) => K.forma(c, trazar, { relleno, borde: LINEA, grosor });

  // Sombra plana dentro de una forma: rellena `sombra` recortado por `trazar`.
  K.sombraBR = (c, trazar, sombra, color) => {
    c.save();
    c.beginPath();
    trazar(c);
    c.clip();
    c.fillStyle = color;
    c.beginPath();
    sombra(c);
    c.fill();
    c.restore();
  };

  function linea(c, pts, ancho, color) {
    c.strokeStyle = color;
    c.lineWidth = ancho;
    c.beginPath();
    c.moveTo(pts[0][0], pts[0][1]);
    pts.slice(1).forEach(([x, y]) => c.lineTo(x, y));
    c.stroke();
  }

  // Varias piezas como una sola silueta: primero todos los contornos y después los rellenos.
  function silueta(c, piezas, color, conSombra = true) {
    c.lineCap = "round";
    c.lineJoin = "round";
    piezas.forEach(([pts, w]) => linea(c, pts, w + B * 2, LINEA));
    piezas.forEach(([pts, w]) => linea(c, pts, w, color));
    if (conSombra) {
      const tono = K.oscuro(color);
      piezas.forEach(([pts, w]) => linea(c, pts.map(([x, y]) => [x + w * 0.24, y]), w * 0.4, tono));
    }
  }

  const punto = (x, y, ang, largo) => [x - Math.sin(ang) * largo, y + Math.cos(ang) * largo];

  function piernas(c, d, pose) {
    const datos = [-1, 1].map((lado) => {
      const a1 = lado < 0 ? pose.piernaI : pose.piernaD;
      const a2 = a1 + (lado < 0 ? pose.rodillaI : pose.rodillaD);
      const cadera = [lado * 40, -480];
      const rodilla = punto(...cadera, a1, 235);
      const tobillo = punto(...rodilla, a2, 225);
      return { lado, a2, cadera, rodilla, tobillo };
    });
    datos.forEach(({ cadera, rodilla, tobillo }) => {
      silueta(c, [[[cadera, rodilla], 66], [[rodilla, tobillo], 50]], d.piel);
      const media = punto(...tobillo, 0, -46);
      silueta(c, [[[media, tobillo], 44]], d.media, false);
    });
    datos.forEach(({ lado, a2, tobillo }) => {
      c.save();
      c.translate(tobillo[0], tobillo[1]);
      c.rotate(a2 * 0.5);
      K.formaBR(c, (p) => p.roundRect(lado > 0 ? -30 : -76, -10, 106, 46, [22, 22, 8, 8]), d.tenis);
      K.formaBR(c, (p) => p.roundRect(lado > 0 ? -32 : -78, 30, 110, 16, 6), d.suela);
      c.restore();
    });
    // El short sigue los muslos para que no se despegue al moverse.
    const muslo = ({ cadera, rodilla }) => [cadera, [K.lerp(cadera[0], rodilla[0], 0.5), K.lerp(cadera[1], rodilla[1], 0.5)]];
    if (d.falda) {
      const falda = (p) => {
        p.moveTo(-82, -530);
        p.lineTo(82, -530);
        p.lineTo(124, -250);
        p.quadraticCurveTo(0, -232, -124, -250);
        p.closePath();
      };
      K.formaBR(c, falda, d.falda);
      K.sombraBR(c, falda, (p) => p.rect(40, -540, 100, 300), K.oscuro(d.falda));
      K.formaBR(c, falda, null);
      return;
    }
    silueta(c, [[muslo(datos[0]), 84], [muslo(datos[1]), 84], [[[-44, -500], [44, -500]], 70]], d.short);
  }

  function brazo(c, d, lado, a1, codo) {
    const hombro = [lado * 88, -770];
    const ang1 = -lado * a1;
    const ang2 = -lado * (a1 + codo);
    const medio = punto(...hombro, ang1, 185);
    const mano = punto(...medio, ang2, 165);
    return { lado, hombro, ang1, ang2, medio, mano };
  }

  // desdeManga: el brazo arranca donde termina la manga, para dibujarlo encima del torso
  // sin que se vea el hombro despegado.
  function brazoPiel(c, d, b, desdeManga = false) {
    const inicio = desdeManga ? punto(...b.hombro, b.ang1, 80) : b.hombro;
    silueta(c, [[[inicio, b.medio], 42], [[b.medio, b.mano], 36]], d.piel);
    const centro = punto(...b.mano, b.ang2, 20);
    c.save();
    c.translate(centro[0], centro[1]);
    c.rotate(b.ang2);
    K.formaBR(c, (p) => p.ellipse(-b.lado * 14, -6, 9, 16, b.lado * 0.5, 0, Math.PI * 2), d.piel);
    K.formaBR(c, (p) => p.roundRect(-20, -18, 40, 46, 16), d.piel);
    K.forma(c, (p) => { p.moveTo(-8, 18); p.lineTo(-8, 27); p.moveTo(4, 18); p.lineTo(4, 27); }, { borde: K.oscuro(d.piel, 0.6), grosor: 3 });
    c.restore();
  }

  // Manga corta y ancha: sale del hombro y se esconde debajo del torso.
  function manga(c, d, b) {
    const fin = punto(...b.hombro, b.ang1, 88);
    const ancho = 78;
    const dx = Math.cos(b.ang1) * ancho / 2;
    const dy = Math.sin(b.ang1) * ancho / 2;
    const trazo = (p) => {
      p.moveTo(b.hombro[0] - dx * 0.8, b.hombro[1] - dy * 0.8 - 10);
      p.lineTo(b.hombro[0] + dx * 0.8, b.hombro[1] + dy * 0.8 - 10);
      p.lineTo(fin[0] + dx, fin[1] + dy);
      p.lineTo(fin[0] - dx, fin[1] - dy);
      p.closePath();
    };
    // Tapa del hombro: cubre la punta redonda del brazo para que, con el brazo
    // arriba, no se vea piel (axila) entre la manga y la camisa.
    // Solo hace falta con el brazo levantado; encima de la camisa va sin contorno.
    const arriba = -b.ang1 * b.lado > 1.2;
    const tapa = (p) => p.arc(b.hombro[0], b.hombro[1] - 4, 44, 0, Math.PI * 2);
    if (arriba && !b.encima) K.formaBR(c, tapa, d.manga);
    K.formaBR(c, trazo, d.manga);
    if (arriba) K.formaBR(c, tapa, d.manga, 0);
  }

  const torso = (p) => {
    p.moveTo(-96, -792);
    p.quadraticCurveTo(0, -812, 96, -792);
    p.quadraticCurveTo(118, -770, 104, -700);
    p.lineTo(86, -500);
    p.quadraticCurveTo(0, -488, -86, -500);
    p.lineTo(-104, -700);
    p.quadraticCurveTo(-118, -770, -96, -792);
    p.closePath();
  };

  K.torsoBR = (p) => torso(p);

  function camisa(c, d) {
    K.formaBR(c, torso, d.camisa);
    K.sombraBR(c, torso, (p) => p.rect(40, -820, 100, 340), K.oscuro(d.camisa));
    K.formaBR(c, torso, null);
    K.forma(c, (p) => {
      p.moveTo(-34, -800);
      p.quadraticCurveTo(0, -770, 34, -800);
    }, { borde: LINEA, grosor: B });
    // Arrugas: dos trazos cortos dan tela sin ensuciar.
    K.forma(c, (p) => {
      p.moveTo(-60, -560);
      p.quadraticCurveTo(-40, -575, -20, -568);
      p.moveTo(30, -640);
      p.quadraticCurveTo(48, -650, 62, -632);
    }, { borde: K.oscuro(d.camisa, 0.6), grosor: 4 });
    if (d.estampado) d.estampado(c);
  }

  const CARA = (p) => {
    p.moveTo(0, -98);
    p.bezierCurveTo(50, -98, 70, -58, 68, -8);
    p.bezierCurveTo(66, 42, 42, 84, 0, 94);
    p.bezierCurveTo(-42, 84, -66, 42, -68, -8);
    p.bezierCurveTo(-70, -58, -50, -98, 0, -98);
    p.closePath();
  };

  function ojo(c, x, R, pose) {
    const y = R.ojoY;
    if (pose.parpadeo > 0.5) {
      K.forma(c, (p) => {
        p.moveTo(x - 15, y);
        p.quadraticCurveTo(x, y + 6, x + 15, y);
      }, { borde: LINEA, grosor: 4 });
      return;
    }
    const almendra = (p) => {
      p.moveTo(x - 16, y + 1);
      p.quadraticCurveTo(x, y - 13, x + 16, y + 1);
      p.quadraticCurveTo(x, y + 10, x - 16, y + 1);
      p.closePath();
    };
    K.forma(c, almendra, { relleno: "#ffffff", borde: null });
    c.save();
    c.beginPath();
    almendra(c);
    c.clip();
    const ix = x + pose.mira.x * 6;
    const iy = y - 1 + pose.mira.y * 3;
    c.fillStyle = R.iris;
    c.beginPath();
    c.arc(ix, iy, 8, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = LINEA;
    c.beginPath();
    c.arc(ix, iy, 4, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#ffffff";
    c.beginPath();
    c.arc(ix + 3, iy - 3, 2, 0, Math.PI * 2);
    c.fill();
    c.restore();
    // Párpado de arriba más grueso: da la mirada caricaturesca.
    K.forma(c, (p) => {
      p.moveTo(x - 18, y + 2);
      p.quadraticCurveTo(x, y - 14, x + 17, y);
    }, { borde: LINEA, grosor: 5 });
  }

  function boca(c, abierta, piel) {
    if (abierta < 0.08) {
      K.forma(c, (p) => {
        p.moveTo(-22, 50);
        p.quadraticCurveTo(0, 57, 22, 49);
      }, { borde: LINEA, grosor: 4 });
      return;
    }
    const alto = 5 + abierta * 16;
    const forma = (p) => {
      p.moveTo(-22, 48);
      p.quadraticCurveTo(0, 44, 22, 48);
      p.quadraticCurveTo(0, 50 + alto * 2, -22, 48);
      p.closePath();
    };
    K.forma(c, forma, { relleno: "#4a1418", borde: null });
    c.save();
    c.beginPath();
    forma(c);
    c.clip();
    c.fillStyle = "#ffffff";
    c.fillRect(-20, 44, 40, 7);
    c.fillStyle = "#c7505d";
    c.beginPath();
    c.ellipse(0, 50 + alto * 1.6, 13, alto * 0.6, 0, 0, Math.PI * 2);
    c.fill();
    c.restore();
    K.forma(c, forma, { borde: LINEA, grosor: 4 });
    K.forma(c, (p) => {
      p.moveTo(-12, 54 + alto * 2.1);
      p.quadraticCurveTo(0, 58 + alto * 2.1, 12, 54 + alto * 2.1);
    }, { borde: K.oscuro(piel, 0.7), grosor: 3 });
  }

  function cabeza(c, d, pose) {
    const R = { ojoX: 28, ojoY: -10, iris: "#3b2312", orejaAncho: 18, orejaAlto: 28, cejaY: 0, cejaGrosor: 8, ...d.rostro };
    // Cada jugador puede traer su propia forma de cara.
    const cara = d.cara || CARA;
    const piel = d.piel;
    if (d.peloAtras) d.peloAtras(c);
    [-1, 1].forEach((l) => {
      K.formaBR(c, (p) => p.ellipse(l * 68, 0, R.orejaAncho, R.orejaAlto, l * 0.25, 0, Math.PI * 2), piel);
      K.forma(c, (p) => {
        p.moveTo(l * 72, -14);
        p.quadraticCurveTo(l * 80, 2, l * 70, 16);
      }, { borde: K.oscuro(piel, 0.65), grosor: 4 });
    });
    K.formaBR(c, cara, piel);
    K.sombraBR(c, cara, (p) => {
      p.moveTo(44, -100);
      p.quadraticCurveTo(58, 10, 10, 100);
      p.lineTo(90, 100);
      p.lineTo(90, -100);
      p.closePath();
    }, K.oscuro(piel, 0.86));
    K.formaBR(c, cara, null);
    if (d.barba) d.barba(c);
    if (d.pelo) d.pelo(c);
    [-1, 1].forEach((l) => ojo(c, l * R.ojoX, R, pose));
    [-1, 1].forEach((l) => K.forma(c, (p) => {
      p.moveTo(l * 12, -30 + R.cejaY - pose.ceja * 5);
      p.quadraticCurveTo(l * 30, -42 + R.cejaY - pose.ceja * 9, l * 48, -34 + R.cejaY - pose.ceja * 6);
    }, { borde: d.colorCeja, grosor: R.cejaGrosor }));
    if (d.nariz) d.nariz(c);
    else K.forma(c, (p) => {
      p.moveTo(-2, -6);
      p.quadraticCurveTo(-6, 18, -12, 26);
      p.quadraticCurveTo(-2, 34, 10, 28);
    }, { borde: K.oscuro(piel, 0.6), grosor: 4 });
    boca(c, pose.boca, piel);
    if (d.detalles) d.detalles(c, pose);
  }

  const POSE = {
    x: 540, y: 1700, escala: 1, inclina: 0, cabeza: 0, boca: 0, parpadeo: 0, ceja: 0,
    mira: { x: 0, y: 0 }, brazoI: 0.12, codoI: 0.1, brazoD: 0.12, codoD: 0.1,
    piernaI: 0.04, piernaD: -0.04, rodillaI: 0, rodillaD: 0, brazosDelante: false, sombra: true,
  };

  // Mismo uso que K.jugador: K.personaBR(c, K.JUGADORES.emilBR, { x, y, boca, ... }).
  K.personaBR = (c, d, ajustes = {}) => {
    const pose = { ...POSE, ...ajustes };
    c.save();
    c.translate(pose.x, pose.y);
    c.scale(pose.escala, pose.escala);
    // Sombra en el piso, salvo que el personaje esté montado o acostado.
    if (pose.sombra) K.sombraPisoBR(c, 0, 4, 130);
    c.rotate(pose.inclina);
    piernas(c, d, pose);
    // Cuello antes que la camisa: el cuello de la camisa lo tapa abajo y la quijada arriba.
    const cw = d.cuello || 24;
    K.formaBR(c, (p) => p.rect(-cw, -900, cw * 2, 110), d.piel);
    K.formaBR(c, (p) => p.rect(-cw, -868, cw * 2, 34), K.oscuro(d.piel, 0.75), 0);
    const brazos = [brazo(c, d, -1, pose.brazoI, pose.codoI), brazo(c, d, 1, pose.brazoD, pose.codoD)];
    brazos.forEach((b) => { b.encima = pose.brazosDelante === "cara"; });
    const dibujaBrazos = () => {
      brazos.forEach((b) => brazoPiel(c, d, b));
      brazos.forEach((b) => manga(c, d, b));
    };
    // brazosDelante: para taparse la cara o cruzar los brazos sobre el pecho.
    // brazosDelante "cara": los brazos van encima de la cabeza para taparse la cara.
    if (pose.brazosDelante === "cara") {
      camisa(c, d);
    } else if (pose.brazosDelante) {
      // Brazos cruzados: mangas detrás para que el hombro siga pegado a la camisa,
      // y el resto del brazo por encima del pecho.
      brazos.forEach((b) => manga(c, d, b));
      camisa(c, d);
      brazos.forEach((b) => brazoPiel(c, d, b, true));
    } else {
      dibujaBrazos();
      camisa(c, d);
    }
    c.save();
    c.translate(0, -935);
    c.rotate(pose.cabeza);
    cabeza(c, d, pose);
    c.restore();
    if (pose.brazosDelante === "cara") dibujaBrazos();
    c.restore();
  };
})();
