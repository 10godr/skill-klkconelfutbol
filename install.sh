#!/bin/sh
# Instala las dependencias y enlaza la skill en ~/.claude/skills.
set -e
RAIZ="$(cd "$(dirname "$0")" && pwd)"
DESTINO="$HOME/.claude/skills/klk-contenido"

(cd "$RAIZ" && npm install --no-audit --no-fund)
mkdir -p "$HOME/.claude/skills"
if [ -e "$DESTINO" ]; then echo "Ya existe $DESTINO. Bórralo primero si quieres volver a enlazarlo."; exit 1; fi
ln -s "$RAIZ/klk-contenido" "$DESTINO"
echo "Skill enlazada: $DESTINO -> $RAIZ/klk-contenido"
command -v ffmpeg >/dev/null || echo "Aviso: ffmpeg no está en el PATH."
