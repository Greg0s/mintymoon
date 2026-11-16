# mintymoon

Hub de [mintymoon.app](https://mintymoon.app) : une page qui mène vers les sites du groupe.

- Site statique (HTML/CSS + un peu de JS pour le FR/EN), servi par GitHub Pages.
- Polices auto-hébergées (Unbounded, Instrument Serif, Archivo, licence OFL).
- Les aperçus des cartes (`assets/previews/`) sont capturés par le workflow **Capture previews** (lancement manuel dans l'onglet Actions), ou en local avec `node scripts/capture-previews.mjs`.

## Ajouter un site

Copier un bloc `<a class="portal">` dans `index.html`, ajouter ses textes FR/EN dans `assets/main.js`, et son URL dans `scripts/capture-previews.mjs`.
