// Uso:
//   node render.mjs <carpeta-pieza> preview 1.5 4 8   -> PNG en <carpeta-pieza>/preview
//   node render.mjs <carpeta-pieza> video [salida.mp4] -> MP4 1080x1920 a 30 fps
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const MOTOR = path.dirname(fileURLToPath(import.meta.url));
const FPS = 30;
const NAVEGADORES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];

const [carpeta, modo, ...resto] = process.argv.slice(2);
if (!carpeta || !["preview", "video"].includes(modo)) {
  console.error("Uso: node render.mjs <carpeta-pieza> preview <segundos...> | video [salida.mp4]");
  process.exit(1);
}

const pieza = path.resolve(carpeta);
const navegador = NAVEGADORES.find((ruta) => fs.existsSync(ruta));
if (!navegador) throw new Error("No se encontró Chrome ni Edge.");

const browser = await puppeteer.launch({ executablePath: navegador, headless: true });
try {
  const page = await browser.newPage();
  page.on("pageerror", (e) => console.error("Error en la escena:", e.message));
  await page.setViewport({ width: 1080, height: 1920 });
  await page.goto(pathToFileURL(path.join(MOTOR, "lienzo.html")).href, { waitUntil: "load" });
  const tiempos = path.join(pieza, "tiempos.json");
  if (fs.existsSync(tiempos)) {
    await page.evaluate((datos) => { window.KLK.tiempos = datos; }, JSON.parse(fs.readFileSync(tiempos, "utf8")));
  }
  const scripts = (carpetaJs) => (fs.existsSync(carpetaJs)
    ? fs.readdirSync(carpetaJs).filter((f) => f.endsWith(".js")).sort().map((f) => path.join(carpetaJs, f))
    : []);
  // Los videos largos pueden repartir sus escenas en <pieza>/escenas/*.js.
  for (const js of [...scripts(path.join(MOTOR, "jugadores")), ...scripts(path.join(pieza, "escenas")), path.join(pieza, "escenas.js")]) {
    await page.addScriptTag({ path: js });
  }
  const duracion = await page.evaluate(async () => {
    await document.fonts.load('80px "Lilita One"', "ÁÑ¡91");
    await document.fonts.ready;
    return window.KLK.pieza.duracion;
  });

  const captura = async (t, tipo, calidad) => {
    const datos = await page.evaluate((seg, formato, q) => {
      const lienzo = document.getElementById("c");
      window.KLK.pieza.render(lienzo.getContext("2d"), seg);
      return lienzo.toDataURL(formato, q);
    }, t, tipo, calidad);
    return Buffer.from(datos.split(",")[1], "base64");
  };

  if (modo === "preview") {
    const destino = path.join(pieza, "preview");
    fs.mkdirSync(destino, { recursive: true });
    for (const seg of resto.map(Number)) {
      fs.writeFileSync(path.join(destino, `t${seg.toFixed(2)}.png`), await captura(seg, "image/png"));
    }
    console.log(`Previews en ${destino}`);
  } else {
    const salida = path.resolve(resto[0] || path.join(pieza, "video-sin-audio.mp4"));
    fs.mkdirSync(path.dirname(salida), { recursive: true });
    const ffmpeg = spawn("ffmpeg", ["-v", "error", "-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
      "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", "-movflags", "+faststart", salida],
      { stdio: ["pipe", "inherit", "inherit"] });
    const total = Math.ceil(duracion * FPS);
    for (let f = 0; f < total; f++) {
      const imagen = await captura(f / FPS, "image/jpeg", 0.96);
      if (!ffmpeg.stdin.write(imagen)) await new Promise((r) => ffmpeg.stdin.once("drain", r));
      if (f % 60 === 0) console.log(`fotograma ${f}/${total}`);
    }
    ffmpeg.stdin.end();
    const codigo = await new Promise((r) => ffmpeg.on("close", r));
    if (codigo !== 0) throw new Error(`ffmpeg terminó con código ${codigo}`);
    console.log(`Video listo: ${salida}`);
  }
} finally {
  await browser.close();
}
