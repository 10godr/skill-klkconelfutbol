# Skill de KLK con el Fútbol

Skill de Claude Code para crear videos de fútbol narrados en dominicano: ideas, guiones, voz, animación 2D, captions y métricas.

## Instalación

Requiere Node.js, FFmpeg y Chrome o Edge.

```powershell
./install.ps1
```

```sh
./install.sh
```

El instalador descarga las dependencias y enlaza la skill en `~/.claude/skills/klk-contenido`.

Después crea `klk-contenido/config.local.json`:

```json
{
  "contenido": "C:\\ruta\\a\\contenido",
  "voz": { "nombre": null, "id": null }
}
```

## Uso

```text
/klk-contenido ideas
/klk-contenido guion <idea>
/klk-contenido reel <idea>
/klk-contenido reel Guion aprobado en <ruta>
```

La carpeta `contenido/` guarda videos, audios y guiones, y no forma parte de este repositorio.
