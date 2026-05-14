# Jakelu — Spesifikaatio

## Kaksi jakelutapaa

### 1. Node.js-palvelu

Tuotantoympäristö jossa `dist/`-kansio tarjoillaan HTTP-palvelimen kautta.

```bash
npm run build          # rakentaa dist/
npm run serve          # käynnistää Node.js-palvelun portissa 3000
```

**package.json lisäykset:**
```json
{
  "scripts": {
    "serve": "node server.js"
  },
  "dependencies": {
    "express": "^4.x"
  }
}
```

**server.js (minimaalinen):**
```js
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(join(__dirname, 'dist')))
app.get('*', (_, res) => res.sendFile(join(__dirname, 'dist/index.html')))
app.listen(process.env.PORT ?? 3000, () => console.log('Mathplay running'))
```

### 2. Yksittäinen HTML-tiedosto

Kaikki JavaScript ja CSS upotetaan yhteen `index.html`-tiedostoon — ei erillistä palvelinta tarvita.

```bash
npm run build:single   # tuottaa dist/index.html joka toimii file://-protokollalla
```

**vite.config.js lisäys:**
```js
// Erillinen "single file" build-mode
// Käyttää vite-plugin-singlefile tai base: './' + inlineäänin
```

**Rajoitukset yksittäisessä tiedostossa:**
- localStorage toimii normaalisti
- Ei verkkoyhteyttä tarvita
- Tiedoston koko noin 300–500 KB (gzip ~100 KB)

## Ympäristömuuttujat

```
PORT=3000              # palvelinportti (Node.js-moodi)
VITE_APP_VERSION=1.0   # näytetään UI:ssa
```

## CI/CD (tuleva)

- GitHub Actions: `npm run build` → deploy `main`-haarasta
- Haara `development` = kehitys, `main` = tuotanto
