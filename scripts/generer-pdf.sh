#!/usr/bin/env bash
# Génère le PDF complet du diaporama.
#   - une page 1920 × 1080 par slide, toutes les étapes déjà affichées ;
#   - une page par onglet pour les slides à onglets ;
#   - sans les notes du formateur.
#
# Usage :
#   ./scripts/generer-pdf.sh                          # index.html -> dist/IA-Software-Engineer-diapo.pdf
#   ./scripts/generer-pdf.sh mon-diapo.html sortie.pdf
#
# Prérequis : Node.js 18 ou plus, et Google Chrome ou Microsoft Edge installés.
# Navigateur installé ailleurs : CHROME_PATH="/chemin/vers/chrome" ./scripts/generer-pdf.sh
set -euo pipefail

SCRIPTS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RACINE="$(cd "$SCRIPTS/.." && pwd)"
ENTREE="${1:-$RACINE/index.html}"
SORTIE="${2:-$RACINE/dist/IA-Software-Engineer-diapo.pdf}"

command -v node >/dev/null 2>&1 || { echo "Node.js est requis : https://nodejs.org" >&2; exit 1; }
[ -f "$ENTREE" ] || { echo "Fichier introuvable : $ENTREE" >&2; exit 1; }

if [ ! -d "$SCRIPTS/node_modules/playwright-core" ]; then
  echo "Première exécution : installation de playwright-core (pilote du navigateur, aucun navigateur téléchargé)…"
  (cd "$SCRIPTS" && npm install --no-audit --no-fund --loglevel=error)
fi

mkdir -p "$(dirname "$SORTIE")"
node "$SCRIPTS/lib/pdf.mjs" "$ENTREE" "$SORTIE"
