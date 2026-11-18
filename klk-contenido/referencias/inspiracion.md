# Analizar referencias

Un link casi nunca deja ver el video por dentro. Para analizar animación y ritmo, pide el mp4 en `<contenido>/_entrada/`.

## Con un video
1. Lee duración y resolución con `ffprobe`.
2. Saca una sola hoja de fotogramas (ver `animacion.md`).
3. Detecta cortes: `ffmpeg -i video.mp4 -vf "select='gt(scene,0.3)',showinfo" -an -f null -`.
4. Anota gancho, duración de planos, recursos visuales, uso de voz y cómo provoca comentarios.

## Qué guardar
`<contenido>/inspiracion/<creador-o-tema>.md`, en menos de 30 líneas: fuente, qué le gusta al usuario, patrones, qué adoptamos y qué no.

## Regla
Se toman técnicas y estructuras. Nunca se copian personajes, guiones, frases ni diseños concretos.

Termina con 2 o 3 ideas para KLK que apliquen esos patrones, puntuadas con la tarjeta de `director.md`.
