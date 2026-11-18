# Animación 2D

Canvas de 1080×1920 a 30 fps, renderizado con Puppeteer y FFmpeg. Cada video solo escribe `<taller>/escenas.js`. En videos largos, reparte las escenas en `<taller>/escenas/*.js`, que se cargan antes de `escenas.js`.

## Estilo
- 2D plano, colores sólidos y contorno negro grueso. Nada de 3D ni 2.5D.
- Personajes cabezones con ojos expresivos, manos de bola y boca que habla.
- Cámara viva: zoom lento dentro del plano y cambio de plano cada 2 a 5 segundos.
- Cada frase debe tener algo que pase en pantalla. Una idea por plano.
- Recursos: pantalla dividida en diagonal, panel de estadísticas, tarjetas VS, grada, contador y confeti.
- Zona segura: lo importante va en x 60–900 y en y 250–1500.

## API del motor (`K = window.KLK`)
**Tiempo y curvas**
- `K.prog(t, a, b)`, `K.lerp(a, b, p)`, `K.clamp(v, a, b)`
- `K.curva.salida | suave | rebote | elastico`
- `K.azar(semilla)`: azar repetible; nunca uses `Math.random`, porque el video parpadea.

**Voz**
- `K.tiempos`: `{ duracion, frases: [{ n, inicio, fin }] }`
- `K.frase(n)`: inicio y fin de la frase n. Úsalo para sincronizar las escenas.
- `K.hablando(t)`, `K.habla(t)`, `K.parpadea(t, cada)`

**Escena**
- `K.camara(c, { x, y, zoom, giro }, dibujar)`
- `K.temblor(t, inicio, duracion, fuerza)` devuelve `{ x, y }`
- `K.barrido(c, p, escenaA, escenaB)`
- `K.forma(c, trazar, { relleno, borde, grosor })`
- Fondos: `K.cancha(c, t)`, `K.estadio(c, t)`
- Objetos: `K.balon(c, x, y, r, giro)`, `K.porteria(c, { x, y, ancho, alto, golpe: { x, y, fuerza } })`

**Gráficos**
- `K.texto(c, txt, x, y, { tam, color, borde, grosor, alinear })`
- `K.pildora(c, { x, y, numero, unidad, tam, escala, color })`
- `K.etiqueta(c, { x, y, texto, tam, escala, fondo, color, giro })`
- `K.estallido(c, x, y, radio, puntas, relleno)`
- `K.confeti(c, t, inicio, { cantidad, semilla })`

**Jugador**
`K.jugador(c, K.JUGADORES.messi, pose)`. Pose: `x, y, escala, inclina, cabeza, boca, parpadeo, ceja, mira: { x, y }, brazoI, codoI, brazoD, codoD, piernaI, piernaD`. Los ángulos van en radianes: brazo `0.5` en reposo y `2.5` arriba.

Si hace falta un fondo u objeto reutilizable, agrégalo al motor en un archivo corto, no dentro de la pieza.

## Crear un jugador
Crea `<skill>/motor/jugadores/<nombre>.js` copiando la estructura de `messi.js`. Lo que lo hace reconocible:
1. Pelo, barba y forma de la cara (`pelo`, `barba`, `contorno`, `rostro`).
2. Colores del equipo y número, sin escudos ni patrocinadores.
3. Un gesto propio, como una celebración famosa.

Enseña un primer plano y espera aprobación antes de usarlo en un video.

**Pendiente:** agregarle a Messi los tatuajes y la cinta de capitán cuando el usuario lo pida.

## Comandos
```bash
node "<skill>/motor/render.mjs" "<taller>" preview 1 4.5 12
node "<skill>/motor/render.mjs" "<taller>" video "<taller>/video-sin-audio.mp4"
```

## Pasada de director
1. Antes del render completo, revisa 3 o 4 fotogramas de las escenas nuevas.
2. Después del render, arma una sola hoja de 10 a 20 fotogramas:
   `ffmpeg -i video.mp4 -vf "fps=<n>/<duración>,scale=300:-2,tile=10x2:padding=4" -frames:v 1 _hoja.jpg`
3. Comprueba: gancho claro en el primer fotograma, jugador reconocible, textos dentro de la zona segura, nada tapado, sin saltos y escenas sincronizadas con su frase.
4. Corrige antes de enseñar el video. Di con honestidad que revisaste fotogramas: el movimiento final lo juzga el usuario.
