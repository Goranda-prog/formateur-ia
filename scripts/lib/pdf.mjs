// Génère le PDF du diaporama : une page 1920 × 1080 par slide, toutes les étapes affichées.
// Les slides à onglets donnent une page par onglet. Les notes du formateur ne sont pas imprimées.
// Usage : node pdf.mjs <diaporama.html> <sortie.pdf>
import { chromium } from 'playwright-core';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const [, , entree, sortie] = process.argv;
if (!entree || !sortie) {
  console.error('Usage : node pdf.mjs <diaporama.html> <sortie.pdf>');
  process.exit(1);
}

// Le navigateur installé sur le poste : Chrome, sinon Edge, sinon le chemin donné dans CHROME_PATH.
async function lancerNavigateur() {
  const essais = process.env.CHROME_PATH
    ? [{ executablePath: process.env.CHROME_PATH }]
    : [{ channel: 'chrome' }, { channel: 'msedge' }];
  let derniereErreur;
  for (const options of essais) {
    try {
      return await chromium.launch(options);
    } catch (e) {
      derniereErreur = e;
    }
  }
  console.error('Impossible de lancer Chrome ou Edge.');
  console.error('Installez Google Chrome ou Microsoft Edge, ou indiquez le chemin du navigateur :');
  console.error('  CHROME_PATH="/chemin/vers/chrome" ./scripts/generer-pdf.sh');
  console.error(String(derniereErreur && derniereErreur.message || derniereErreur).split('\n')[0]);
  process.exit(1);
}

// Mise en page d'impression : toutes les slides les unes sous les autres, une par page.
const CSS_IMPRESSION = `
@page { size: 1920px 1080px; margin: 0 }
*, *::before, *::after { animation: none !important; transition: none !important }
html, body { height: auto !important; overflow: visible !important; background: #01061A !important }
#viewport, #stage { position: static !important; inset: auto !important; transform: none !important;
  width: 1920px !important; height: auto !important; overflow: visible !important }
#stage > .slide { display: block !important; position: relative !important; inset: auto !important;
  width: 1920px !important; height: 1080px !important; overflow: hidden !important;
  break-after: page; page-break-after: always }
#stage > .slide:last-child { break-after: auto; page-break-after: auto }
.step { opacity: 1 !important; transform: none !important }
.reveal { opacity: 1 !important }
.notes, #bar, #progress, .notes-drawer, .overlay, #presenter { display: none !important }
`;

const navigateur = await lancerNavigateur();
try {
  const contexte = await navigateur.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await contexte.newPage();
  const erreurs = [];
  page.on('pageerror', (e) => erreurs.push(e.message));

  await page.goto(pathToFileURL(path.resolve(entree)).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  // Parcourt tout le diaporama une fois, pour que chaque élément interactif soit initialisé.
  const total = await page.evaluate(() => document.querySelectorAll('#stage > .slide').length);
  await page.keyboard.press('Home');
  for (let i = 0; i < 2000; i++) {
    const fini = await page.evaluate((n) => {
      const c = document.getElementById('count');
      const steps = document.querySelectorAll('.slide.active .step');
      const restantes = [...steps].some((s) => !s.classList.contains('visible'));
      return c && c.textContent.trim().startsWith(n + ' /') && !restantes;
    }, total);
    if (fini) break;
    await page.keyboard.press('ArrowRight');
  }

  // Déroule tout : étapes, blocs révélés, pièges signalés ; une copie de la slide par onglet.
  const pages = await page.evaluate((css) => {
    const slides = [...document.querySelectorAll('#stage > .slide')];
    const choisirOnglet = (slide, k) => {
      slide.querySelectorAll('.tab[data-tab]').forEach((t) => t.setAttribute('aria-selected', String(+t.dataset.tab === k)));
      slide.querySelectorAll('.recipe-panel[data-panel]').forEach((p) => p.classList.toggle('on', +p.dataset.panel === k));
    };
    for (const slide of slides) {
      const onglets = [...slide.querySelectorAll('[data-widget="tabs"] .tab[data-tab]')].map((t) => +t.dataset.tab);
      if (onglets.length < 2) continue;
      let precedente = slide;
      onglets.forEach((k, n) => {
        if (n === 0) { choisirOnglet(slide, k); return; }
        const copie = slide.cloneNode(true);
        choisirOnglet(copie, k);
        precedente.after(copie);
        precedente = copie;
      });
    }
    document.querySelectorAll('.step').forEach((e) => e.classList.add('visible'));
    document.querySelectorAll('.reveal').forEach((e) => e.classList.add('shown'));
    document.querySelectorAll('.trap').forEach((e) => e.classList.add('on'));
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    return document.querySelectorAll('#stage > .slide').length;
  }, CSS_IMPRESSION);

  await page.emulateMedia({ media: 'screen' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  fs.mkdirSync(path.dirname(path.resolve(sortie)), { recursive: true });
  await page.pdf({ path: sortie, printBackground: true, preferCSSPageSize: true });

  const taille = (fs.statSync(sortie).size / 1024 / 1024).toFixed(1);
  console.log(`PDF généré : ${sortie}`);
  console.log(`${total} slides, ${pages} pages (une page par onglet sur les slides à onglets), ${taille} Mo.`);
  if (erreurs.length) console.warn('Erreurs JavaScript pendant la génération :', erreurs.slice(0, 3).join(' | '));
} finally {
  await navigateur.close();
}
