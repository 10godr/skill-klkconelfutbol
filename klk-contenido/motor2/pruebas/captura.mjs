import puppeteer from "puppeteer-core";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
const aqui = path.dirname(fileURLToPath(import.meta.url));
const salida = process.argv[2];
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args:["--allow-file-access-from-files"] });
const p = await b.newPage(); p.on("pageerror", e => console.error(e.message));
await p.setViewport({ width: 1080, height: 1920 });
for (const n of (process.argv[3]||"1,2,3").split(",").map(Number)) {
  await p.goto(pathToFileURL(path.join(aqui,"estilos.html")).href + "?estilo=" + n);
  await p.waitForFunction("window.listo === true", { timeout: 20000 });
  await p.screenshot({ path: path.join(salida, `estilo-${n}.png`) });
}
await b.close();
