# Instala las dependencias y enlaza la skill en ~/.claude/skills.
$origen = Join-Path $PSScriptRoot "klk-contenido"
$skills = Join-Path $env:USERPROFILE ".claude\skills"
$destino = Join-Path $skills "klk-contenido"

Push-Location $PSScriptRoot
npm install --no-audit --no-fund
Pop-Location

New-Item -ItemType Directory -Force $skills | Out-Null
if (Test-Path $destino) {
    Write-Host "Ya existe $destino. Borralo primero si quieres volver a enlazarlo."
    exit 1
}
New-Item -ItemType Junction -Path $destino -Target $origen | Out-Null
Write-Host "Skill enlazada: $destino -> $origen"
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) { Write-Host "Aviso: ffmpeg no esta en el PATH." }
