# KLK con el Fútbol

Guía rápida para producir los videos de la cuenta.

- **Instagram:** [@klkconelfutbol](https://www.instagram.com/klkconelfutbol/)
- **TikTok:** [@klk.conelfutbol](https://www.tiktok.com/@klk.conelfutbol)

## Empezar un video

```text
/klk-contenido ideas
```

También puedes pedir ideas de un tema o ir directo con la tuya:

```text
/klk-contenido ideas Champions
/klk-contenido reel ¿Por qué a las jevas les gusta tanto Bellingham?
```

## Cómo va un video

1. **Idea.** Eliges una de las propuestas o das la tuya.
2. **Guion.** Revisas la tabla de diálogos y cambias lo que quieras.
3. **Audios.** Apruebas el guion y se generan las voces. Si ElevenLabs falla, recibes las frases numeradas para hacerlas a mano.
4. **Animación.** Se anima el video al ritmo de la voz.
5. **Entrega.** Recibes el video, las captions y la hora sugerida para publicar.
6. **Chat nuevo.** Si no hay cambios, abre otro chat para el siguiente video y ahorras tokens.

## Comandos

| Comando | Para qué sirve |
|---|---|
| `ideas [tema]` | 5 ideas puntuadas, de formatos distintos |
| `juzgar <idea o guion>` | Dice si vale la pena y da 3 alternativas |
| `guion <idea>` | Escribe el guion sin producir el video |
| `reel <idea>` | Hace el video completo, de la idea a la entrega |
| `reel Guion aprobado en <ruta>` | Produce un guion que ya aprobaste |
| `audios <pieza>` | Da las frases para generarlas en ElevenLabs |
| `variar <pieza>` | 3 variantes: otro gancho, ángulo o formato |
| `captions <pieza>` | 3 captions dominicanas y hashtags |
| `fijado <pieza>` | 2 opciones de comentario fijado |
| `investigar [tema]` | Busca lo que está pasando en el fútbol |
| `fechas [evento]` | Actualiza el calendario o agrega una fecha |
| `referencia <link o video>` | Saca los patrones de un creador o video |
| `jugador <nombre>` | Crea la caricatura de un jugador |
| `metricas <pieza> <datos>` | Lee los resultados y dice qué cambiar |

Todos empiezan con `/klk-contenido`. Una `<pieza>` se llama así: `reel-01-messi-91-goles`.

## Formatos

| Formato | De qué va |
|---|---|
| Adivina el jugador | Pistas hasta revelar quién es |
| Historias del coño | Historias duras o increíbles |
| Cara a cara | Dos jugadores o equipos con sus números |
| ¿Cuánto costó esa vaina? | Fichajes y dinero |
| El tíguere del mes | El jugador que está on fire |
| Lo que nadie te dijo | Datos poco conocidos |
| Cosas de jevas | Temas jocosos |
| ¿Qué pasaría si...? | Situaciones absurdas |

## Audios a mano

1. Abre [ElevenLabs](https://elevenlabs.io/app/speech-synthesis/text-to-speech) y elige la voz de la cuenta.
2. Genera cada frase y nómbrala con su número: `01.mp3`, `02.mp3`, `03.mp3`.
3. Guárdalas en `contenido/_entrada/<pieza>/`.
4. Avisa en el chat para seguir con la animación.

Si una frase suena mal, rehaz solo esa.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| **Frases para llenar** | `skill/klk-contenido/referencias/base-dominicana.md` |
| Identidad, logo y descripciones | `contenido/identidad/` |
| Guiones | `contenido/guiones/` |
| Audios | `contenido/_entrada/<pieza>/` |
| Videos terminados | `contenido/piezas/reels/<pieza>/` |
| Historial de videos | `contenido/registro.md` |
| Calendario | `contenido/calendario.md` |

## Ahorrar tokens

- Haz un video por chat.
- Edita el guion antes de aprobar los audios, porque cada voz gasta créditos.
- Para producir un guion ya aprobado en un chat nuevo, pega el comando `reel Guion aprobado en <ruta>`.
