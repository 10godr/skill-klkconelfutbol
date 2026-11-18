// Uso:
//   node audio.mjs <carpeta-pieza> preparar <carpeta-audios> [respiro]
//       Une 01.mp3, 02.mp3... en voz.mp3 y mide cada frase en tiempos.json.
//   node audio.mjs <carpeta-pieza> mezclar <video-sin-audio.mp4> <salida.mp4>
//       Une el video con la voz y normaliza el volumen para redes.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const COLA = 0.7;
const [carpeta, modo, ...resto] = process.argv.slice(2);
if (!carpeta || !["preparar", "mezclar"].includes(modo)) {
  console.error("Uso: node audio.mjs <pieza> preparar <audios> [respiro] | mezclar <video> <salida>");
  process.exit(1);
}
const pieza = path.resolve(carpeta);
const ffmpeg = (args) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });
const duracion = (archivo) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration",
  "-of", "csv=p=0", archivo], { encoding: "utf8" }).trim());

function preparar(carpetaAudios, respiro) {
  const origen = path.resolve(carpetaAudios);
  const archivos = fs.readdirSync(origen).filter((f) => /^\d+\.(mp3|wav|m4a)$/i.test(f))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  if (!archivos.length) throw new Error(`No hay audios numerados en ${origen}`);

  let cursor = 0;
  const frases = archivos.map((archivo, i) => {
    const largo = duracion(path.join(origen, archivo));
    const frase = { n: i + 1, archivo, inicio: +cursor.toFixed(3), fin: +(cursor + largo).toFixed(3) };
    cursor += largo + (i < archivos.length - 1 ? respiro : COLA);
    return frase;
  });

  const entradas = archivos.flatMap((f) => ["-i", path.join(origen, f)]);
  const filtros = archivos.map((_, i) => {
    const pausa = i < archivos.length - 1 ? respiro : COLA;
    return `[${i}:a]aresample=44100,aformat=channel_layouts=stereo,apad=pad_dur=${pausa}[a${i}]`;
  });
  const union = `${archivos.map((_, i) => `[a${i}]`).join("")}concat=n=${archivos.length}:v=0:a=1[voz]`;
  fs.mkdirSync(pieza, { recursive: true });
  ffmpeg([...entradas, "-filter_complex", [...filtros, union].join(";"), "-map", "[voz]",
    "-c:a", "libmp3lame", "-q:a", "2", path.join(pieza, "voz.mp3")]);

  const datos = { duracion: +cursor.toFixed(3), respiro, frases };
  fs.writeFileSync(path.join(pieza, "tiempos.json"), JSON.stringify(datos, null, 2));
  console.log(`${frases.length} frases, ${datos.duracion} s. Listo: voz.mp3 y tiempos.json`);
}

function mezclar(video, salida) {
  const destino = path.resolve(salida);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  ffmpeg(["-i", path.resolve(video), "-i", path.join(pieza, "voz.mp3"),
    "-map", "0:v:0", "-map", "1:a:0", "-af", "loudnorm=I=-14:TP=-1:LRA=11",
    "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-shortest", "-movflags", "+faststart", destino]);
  console.log(`Video final: ${destino}`);
}

if (modo === "preparar") preparar(resto[0], Number(resto[1] ?? 0.3));
else mezclar(resto[0], resto[1]);
