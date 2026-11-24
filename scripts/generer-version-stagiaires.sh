#!/usr/bin/env bash
# Génère la version stagiaires du diaporama : un seul fichier HTML, toujours interactif
# (votes, onglets, chronos, boutons Copier, plein écran…), mais sans les notes du formateur
# et sans la vue présentateur. Les polices restent intégrées : il fonctionne sans connexion.
#
# Usage :
#   ./scripts/generer-version-stagiaires.sh                         # index.html -> dist/IA-Software-Engineer-stagiaires.html
#   ./scripts/generer-version-stagiaires.sh mon-diapo.html sortie.html
#
# Prérequis : Node.js 18 ou plus (aucune dépendance à installer).
set -euo pipefail

SCRIPTS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RACINE="$(cd "$SCRIPTS/.." && pwd)"
ENTREE="${1:-$RACINE/index.html}"
SORTIE="${2:-$RACINE/dist/IA-Software-Engineer-stagiaires.html}"

command -v node >/dev/null 2>&1 || { echo "Node.js est requis : https://nodejs.org" >&2; exit 1; }
[ -f "$ENTREE" ] || { echo "Fichier introuvable : $ENTREE" >&2; exit 1; }

mkdir -p "$(dirname "$SORTIE")"
node "$SCRIPTS/lib/stagiaires.mjs" "$ENTREE" "$SORTIE"
