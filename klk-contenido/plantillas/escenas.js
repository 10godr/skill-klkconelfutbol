// Plantilla de una pieza. Se copia a contenido/_taller/<pieza>/escenas.js.
// El motor no se copia: cada video solo escribe sus escenas.
(() => {
  const K = window.KLK;
  const JUGADOR = K.JUGADORES.messi;

  function escena01(c, t) {
    K.camara(c, { zoom: K.lerp(1, 1.08, K.prog(t, 0, 3)) }, () => {
      K.cancha(c, t);
      K.jugador(c, JUGADOR, {
        x: 480, y: 1690, escala: 1.4,
        boca: K.habla(t), parpadeo: K.parpadea(t),
      });
    });
    K.etiqueta(c, { x: 480, y: 330, texto: "TEXTO CLAVE", escala: K.curva.rebote(K.prog(t, 0.3, 0.7)) });
  }

  K.pieza = {
    duracion: 3,
    render(c, t) {
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, K.W, K.H);
      escena01(c, t);
    },
  };
})();
