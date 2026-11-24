// Génère la version stagiaires du diaporama : même fichier HTML, mêmes interactions
// (votes, onglets, chronos, boutons Copier…), sans les notes du formateur ni la vue présentateur.
// Usage : node stagiaires.mjs <diaporama.html> <sortie.html>
import fs from 'node:fs';
import path from 'node:path';

const [, , entree, sortie] = process.argv;
if (!entree || !sortie) {
  console.error('Usage : node stagiaires.mjs <diaporama.html> <sortie.html>');
  process.exit(1);
}

const echec = (message) => {
  console.error('Échec : ' + message);
  process.exit(1);
};

let html = fs.readFileSync(entree, 'utf8');
const avant = (html.match(/<aside class="notes">/g) || []).length;
if (!avant) echec("aucune note formateur trouvée : est-ce bien le diaporama ?");

// 1. Les notes du formateur : retirées du fichier, pas seulement masquées.
html = html.replace(/[ \t]*<aside class="notes">[\s\S]*?<\/aside>\n?/g, '');
if (/class="notes"/.test(html)) echec('des notes formateur sont encore présentes.');

// 2. Les commandes réservées au formateur : bouton Notes, vue présentateur.
//    Les éléments restent dans la page (le script du diaporama s'en sert) mais sont masqués et inactifs.
const ajout = `<style id="version-stagiaires">
#bar [data-cmd="notes"], #bar [data-cmd="presenter"], .notes-drawer, #ovPresenter, #presenter { display: none !important }
body.presenter { overflow: hidden !important; background: #01061A !important }
body.presenter #viewport { display: block !important }
body.presenter #bar { display: flex !important }
</style>
<script>
/* Version stagiaires : pas de vue présentateur */
try { if (location.hash === '#presentateur') history.replaceState(null, '', location.pathname + location.search); } catch (e) { location.hash = ''; }
</script>
`;
if (!html.includes('</head>')) echec('balise </head> introuvable.');
html = html.replace('</head>', ajout + '</head>');

// 3. Les textes qui parlent des notes.
html = html.replace('(tous les horaires du diapo et des notes suivent)', '(tous les horaires du diapo suivent)');
html = html.replace(/<title>([^<]*)<\/title>/, (_, titre) => `<title>${titre} · version stagiaires</title>`);

fs.mkdirSync(path.dirname(path.resolve(sortie)), { recursive: true });
fs.writeFileSync(sortie, html);

const taille = (Buffer.byteLength(html) / 1024 / 1024).toFixed(1);
console.log(`Version stagiaires générée : ${sortie}`);
console.log(`${avant} blocs de notes formateur retirés, vue présentateur désactivée, ${taille} Mo.`);
