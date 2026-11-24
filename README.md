# L'IA au service du Software Engineer

Support de la formation d'une journée « L'IA au service du Software Engineer » : un diaporama interactif en un seul fichier HTML (`index.html`), avec ses votes, exercices, chronos et notes formateur.

Public : développeurs, tech leads, architectes. Format : classe virtuelle sur Microsoft Teams.

## Ouvrir le diaporama

1. Téléchargez `index.html` dans un dossier local (sur GitHub : « Download raw file »).
2. Ouvrez-le avec Chrome ou Edge, par double-clic. Gardez le zoom du navigateur à 100 % (Ctrl+0).

Ne l'ouvrez pas depuis un aperçu Teams, OneDrive, SharePoint ou Outlook : les scripts y sont bloqués et le diaporama reste figé.

Les polices sont intégrées au fichier : il s'affiche à l'identique sans connexion. Internet reste nécessaire pour Kahoot, NéoGen et les liens externes.

## Raccourcis

| Touche | Action |
| --- | --- |
| → ou Espace | Avancer |
| ← | Reculer |
| F | Plein écran |
| N | Notes formateur |
| O | Sommaire et heure de début de la journée |
| L | Ligue des équipes |
| Début / Fin | Première / dernière slide |

## Vue présentateur

Cliquez sur « Présentateur », copiez le lien proposé et ouvrez-le dans une seconde fenêtre du même navigateur, sur votre autre écran. Elle affiche les notes, la slide suivante et un chrono, et suit la fenêtre principale.

Dans Teams, partagez uniquement la fenêtre du diaporama : la vue présentateur reste privée.

## Déroulé de la journée

9h30 – 12h00 et 13h30 – 17h30, avec une pause à 11h05 et une autre à 15h20. Si la journée commence à une autre heure, changez l'heure de début dans le Sommaire (O) : tous les repères se décalent.

| Étape | Heure | Contenu |
| --- | --- | --- |
| 0 | 9h30 | Accueil |
| 1 | 9h46 | Dans la tête d'Ada : tokens, température, contexte |
| 2 | 10h02 | Parler à Ada : prompts, techniques avancées · Exercice 1 |
| 3 | 11h15 | Ada à son poste : Kilo Code, AGENTS.md, Skills, RAG · Exercice 2 (après le déjeuner) |
| 4 | 14h28 | Les outils d'Ada : MCP, RAG dans l'IDE · Exercice 3 |
| 5 | 15h30 | Travailler avec Ada : cycle complet, Git, Memory Bank · Exercice 4 |
| 6 | 16h36 | Ada fait des bêtises : débogage, mutation testing, workflow d'équipe |
| 7 | 16h56 | Fin de période d'essai : mesure, Kahoot, boîte à prompts |

## Générer le PDF et la version stagiaires

Deux scripts bash, dans `scripts/`. Ils écrivent dans `dist/` (non versionné). Sous Windows, lancez-les depuis Git Bash.

| Script | Résultat | Prérequis |
| --- | --- | --- |
| `./scripts/generer-pdf.sh` | `dist/IA-Software-Engineer-diapo.pdf` : une page par slide, toutes les étapes affichées, une page par onglet sur les slides à onglets, sans les notes du formateur. Texte sélectionnable. | Node.js 18+ et Google Chrome ou Microsoft Edge |
| `./scripts/generer-version-stagiaires.sh` | `dist/IA-Software-Engineer-stagiaires.html` : le diaporama interactif (votes, onglets, chronos, boutons Copier), sans les notes du formateur ni la vue présentateur. Fonctionne sans connexion. | Node.js 18+ |

Chaque script prend en option un fichier d'entrée et un fichier de sortie, par exemple `./scripts/generer-pdf.sh index.html support.pdf`.

À la première exécution, `generer-pdf.sh` installe `playwright-core`, le pilote qui commande votre Chrome ou Edge ; aucun navigateur n'est téléchargé. Si votre navigateur est installé ailleurs : `CHROME_PATH="/chemin/vers/chrome" ./scripts/generer-pdf.sh`.

## Kit d'arrivée des participants

`kit-arrivee-kilo-code-neogen.md` est à envoyer aux participants avant la formation : en 5 étapes (20 minutes), ils installent Kilo Code dans le VS Code de leur workspace Coder et le branchent sur NéoGen. Avant l'envoi, remplacez `ADRESSE-NEOGEN` par l'adresse de NéoGen et complétez **CONTACT DU FORMATEUR**.

## Ressources interactives

Six pages autonomes à partager aux participants ou à projeter, dans le dossier `ressources/`. Comme le diaporama, chacune tient en un seul fichier HTML, polices comprises : elle s'ouvre dans Chrome ou Edge et fonctionne sans connexion.

| Fichier | Contenu |
| --- | --- |
| `1-dans-la-tete-d-une-ia.html` | Dans la tête d'une IA : prédire le mot suivant, vecteurs, attention, couches, entraînement. |
| `2-les-tokens-en-briques.html` | Les tokens, en briques : découpage en direct, coût entrée/sortie et relecture de l'historique. |
| `3-comment-une-ia-apprend.html` | Comment une IA apprend : erreur, gradient, descente, rétropropagation et surapprentissage. |
| `4-comprendre-le-rag.html` | Comprendre le RAG : analogies, pipeline en 6 étapes, démo de recherche avec et sans RAG, quiz. |
| `5-comprendre-mcp.html` | Comprendre MCP : le Model Context Protocol suivi pas à pas sur « Dois-je prendre un parapluie demain ? ». |
| `6-workflow-spec-driven-development.html` | Workflow Spec Driven Development : les 6 étapes avec exemples PHP, 10 prompts prêts à copier et le déroulé de l'atelier en binômes. |

## Démo RAG

Le dossier `demo-rag/` contient les trois documents de la Boutique (exemple de formation) utilisés pendant la démo « Une base de connaissances dans NéoGen » (étape 3) :

| Fichier | Contenu |
| --- | --- |
| `conditions-de-vente.md` | Prix, remise automatique, code BIENVENUE, cumul des réductions, cartes cadeaux, frais de port, retours. |
| `faq-service-client.md` | Questions fréquentes du service client : codes promo, livraison, retours, fidélité. |
| `livret-equipe-boutique.md` | Livret d'accueil de l'équipe Boutique : vie au bureau, façon de travailler, règles de code. Sert aussi de source à l'exercice 2 (AGENTS.md). |

Pour la démo : créez une base de connaissances dans NéoGen, ajoutez les trois fichiers, attendez la fin de l'indexation, puis posez la question « Un client peut-il cumuler BIENVENUE et la remise de 10 % ? ».

## Données enregistrées

Les équipes, les scores, les PIN Kahoot et l'heure de début sont enregistrés dans le navigateur, sur le poste utilisé. Présentez toujours depuis le même navigateur et ne videz pas ses données entre deux sessions.

## Mettre à jour

Remplacez `index.html` par la nouvelle version, puis committez.
