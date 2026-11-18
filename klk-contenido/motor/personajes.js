// Cuerpo base de los jugadores. El origen está entre los pies.
(() => {
  const K = window.KLK;

  function miembro(c, x1, y1, x2, y2, ancho, color) {
    c.lineCap = "round";
    [[K.TINTA, ancho + K.BORDE * 2], [color, ancho]].forEach(([tono, grosor]) => {
      c.strokeStyle = tono;
      c.lineWidth = grosor;
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      c.stroke();
    });
  }

  function pierna(c, lado, d, angulo) {
    c.save();
    c.translate(lado * 54, -205);
    c.rotate(angulo);
    miembro(c, 0, 0, 0, 130, 54, d.piel);
    miembro(c, 0, 122, 0, 158, 56, d.media);
    K.forma(c, (p) => p.roundRect(lado > 0 ? -34 : -62, 158, 96, 46, 20), { relleno: d.bota });
    c.restore();
  }

  function brazo(c, lado, d, angulo, codo) {
    const sx = lado * 122;
    const sy = -372;
    const a1 = angulo;
    const a2 = angulo + codo;
    const ex = sx + lado * Math.sin(a1) * 92;
    const ey = sy + Math.cos(a1) * 92;
    const mx = ex + lado * Math.sin(a2) * 90;
    const my = ey + Math.cos(a2) * 90;
    c.lineJoin = "round";
    c.lineCap = "round";
    [[K.TINTA, 42 + K.BORDE * 2], [d.piel, 42]].forEach(([tono, grosor]) => {
      c.strokeStyle = tono;
      c.lineWidth = grosor;
      c.beginPath();
      c.moveTo(sx, sy);
      c.lineTo(ex, ey);
      c.lineTo(mx, my);
      c.stroke();
    });
    miembro(c, sx, sy, K.lerp(sx, ex, 0.62), K.lerp(sy, ey, 0.62), 62, d.manga);
    K.forma(c, (p) => p.arc(mx, my, 35, 0, Math.PI * 2), { relleno: d.piel });
  }

  function camiseta(c, d) {
    const trazo = (p) => {
      p.moveTo(-122, -408);
      p.quadraticCurveTo(0, -432, 122, -408);
      p.quadraticCurveTo(146, -300, 112, -192);
      p.lineTo(-112, -192);
      p.quadraticCurveTo(-146, -300, -122, -408);
      p.closePath();
    };
    c.save();
    c.beginPath();
    trazo(c);
    c.clip();
    c.fillStyle = d.camisa;
    c.fillRect(-160, -440, 320, 260);
    if (d.rayas) {
      c.fillStyle = d.rayas;
      for (let x = -130; x < 150; x += 104) c.fillRect(x, -440, 52, 260);
    }
    c.restore();
    K.forma(c, trazo, {});
    K.texto(c, String(d.numero), 0, -292, { tam: 104, color: d.colorNumero, borde: "#ffffff", grosor: 12 });
  }

  function ojo(c, x, mira, parpadeo, R) {
    if (parpadeo > 0.5) {
      K.forma(c, (p) => {
        p.moveTo(x - R.ojoAncho, R.ojoY - 2);
        p.quadraticCurveTo(x, R.ojoY + 16, x + R.ojoAncho, R.ojoY - 2);
      }, { grosor: 10 });
      return;
    }
    K.forma(c, (p) => p.ellipse(x, R.ojoY, R.ojoAncho, R.ojoAlto, 0, 0, Math.PI * 2), { relleno: "#ffffff" });
    const px = x + mira.x * R.ojoAncho * 0.34;
    const py = R.ojoY + 3 + mira.y * R.ojoAlto * 0.26;
    c.fillStyle = R.iris;
    c.beginPath();
    c.arc(px, py, R.ojoAncho * 0.56, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = K.TINTA;
    c.beginPath();
    c.arc(px, py, R.ojoAncho * 0.34, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#ffffff";
    c.beginPath();
    c.arc(px + R.ojoAncho * 0.18, py - R.ojoAncho * 0.2, R.ojoAncho * 0.17, 0, Math.PI * 2);
    c.fill();
  }

  function boca(c, abierta, ancho) {
    if (abierta < 0.08) {
      K.forma(c, (p) => {
        p.moveTo(-ancho * 0.9, 84);
        p.quadraticCurveTo(0, 116, ancho * 0.9, 84);
      }, { borde: "#ffffff", grosor: 12 });
      return;
    }
    const alto = 14 + abierta * 34;
    const forma = (p) => p.ellipse(0, 94, ancho, alto, 0, 0, Math.PI * 2);
    c.save();
    c.beginPath();
    forma(c);
    c.clip();
    c.fillStyle = "#5b1224";
    c.fillRect(-60, 40, 120, 110);
    c.fillStyle = "#ffffff";
    c.fillRect(-60, 92 - alto, 120, 15);
    c.fillStyle = "#e4566b";
    c.beginPath();
    c.ellipse(0, 92 + alto * 0.9, 34, alto * 0.62, 0, 0, Math.PI * 2);
    c.fill();
    c.restore();
    K.forma(c, forma, { grosor: 8 });
  }

  function cabeza(c, d, pose) {
    const R = { ...ROSTRO, ...d.rostro };
    const contorno = d.contorno || ((p) => p.ellipse(0, 0, 172, 180, 0, 0, Math.PI * 2));
    [-1, 1].forEach((l) => K.forma(c, (p) => p.arc(l * R.orejaX, 14, 32, 0, Math.PI * 2), { relleno: d.piel }));
    K.forma(c, contorno, { relleno: d.piel });
    if (d.barba) {
      c.save();
      c.beginPath();
      contorno(c);
      c.clip();
      d.barba(c);
      c.restore();
      K.forma(c, contorno, {});
    }
    if (d.pelo) d.pelo(c);
    ojo(c, -R.ojoX, pose.mira, pose.parpadeo, R);
    ojo(c, R.ojoX, pose.mira, pose.parpadeo, R);
    [-1, 1].forEach((l) => K.forma(c, (p) => {
      p.moveTo(l * R.cejaExt[0], R.cejaExt[1] - pose.ceja * 10);
      p.quadraticCurveTo(l * R.cejaMedio[0], R.cejaMedio[1] - pose.ceja * 14, l * R.cejaInt[0], R.cejaInt[1] - pose.ceja * 5);
    }, { borde: d.colorCeja, grosor: R.cejaGrosor }));
    if (d.nariz) d.nariz(c);
    else K.forma(c, (p) => {
      p.moveTo(-10, 28);
      p.quadraticCurveTo(14, 44, -6, 54);
    }, { borde: "#b9764f", grosor: 8 });
    boca(c, pose.boca, R.bocaAncho);
  }

  // Medidas de la cara. Cada jugador cambia solo las que lo hacen reconocible.
  const ROSTRO = {
    orejaX: 172, ojoX: 70, ojoY: -22, ojoAncho: 40, ojoAlto: 45, iris: K.TINTA, bocaAncho: 48,
    cejaExt: [112, -82], cejaMedio: [70, -100], cejaInt: [30, -80], cejaGrosor: 17,
  };

  const POSE = {
    x: 540, y: 1600, escala: 1, inclina: 0, cabeza: 0, boca: 0, parpadeo: 0, ceja: 0,
    mira: { x: 0, y: 0 }, brazoI: 0.5, codoI: 0.2, brazoD: 0.5, codoD: 0.2, piernaI: 0, piernaD: 0,
  };

  K.jugador = (c, d, ajustes = {}) => {
    const pose = { ...POSE, ...ajustes };
    c.save();
    c.translate(pose.x, pose.y);
    c.scale(pose.escala, pose.escala);
    c.rotate(pose.inclina);
    pierna(c, -1, d, pose.piernaI);
    pierna(c, 1, d, pose.piernaD);
    K.forma(c, (p) => p.roundRect(-122, -240, 244, 104, 16), { relleno: d.short });
    brazo(c, -1, d, pose.brazoI, pose.codoI);
    brazo(c, 1, d, pose.brazoD, pose.codoD);
    camiseta(c, d);
    c.translate(0, -580);
    c.rotate(pose.cabeza);
    cabeza(c, d, pose);
    c.restore();
  };

  // La boca se mueve solo mientras suena una frase.
  K.habla = (t, activa = K.hablando(t)) => {
    if (!activa) return 0;
    return K.clamp(0.42 + Math.sin(t * 19) * 0.32 + Math.sin(t * 31 + 1.3) * 0.26);
  };

  K.parpadea = (t, cada = 2.7) => ((t % cada) < 0.11 ? 1 : 0);
})();
