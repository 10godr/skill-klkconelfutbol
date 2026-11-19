# Voz con ElevenLabs

La voz oficial de todos los videos es **Joan Fermín**, guardada en `<skill>/config.local.json`.

## Antes de generar
Muestra los diálogos finales, cuántos caracteres gastarán y pide un "sí" para este guion. Los créditos son limitados, así que no hagas tomas de prueba por tu cuenta.

## Generar
1. Con el "sí", genera solo la frase 1 con el conector de ElevenLabs, usando la voz elegida y una sola toma.
2. Si funciona, sigue frase por frase y guarda `01.mp3`, `02.mp3`... en `<contenido>/_entrada/<pieza>/`.
3. **Si falla, está saturado, no carga o la cuenta está bloqueada, no reintentes.** Cada reintento puede cobrar y gastar tokens. Pasa directo al plan B.

## Plan B: el usuario genera los audios
Entrega exactamente este bloque, con una frase por sección para copiar y pegar:

````markdown
**ElevenLabs no respondió. Genera estos audios a mano:**

- **Link:** https://elevenlabs.io/app/speech-synthesis/text-to-speech
- **Voz:** <nombre de la voz>
- **Guarda en:** `<contenido>/_entrada/<pieza>/`

**01.mp3**
```
<diálogo 1>
```

**02.mp3**
```
<diálogo 2>
```

Avísame cuando estén y sigo con la animación.
````

El comando `audios <pieza>` entrega este mismo bloque a partir del guion.

## Al recibir los audios
- Comprueba que estén todos los números que pide el guion y que no estén vacíos.
- Cada pieza usa su propia carpeta para no mezclar audios de videos anteriores.
- Si una frase suena mal, pide o genera solo esa frase de nuevo.
