# Mathplay

Selaimessa toimiva matematiikan harjoituspeli alakouluikäisille (6–10 v.). Lapsi harjoittelee vähennyslaskuja, yhteenlaskuja, kertotauluja, lukujonoja ja mittamuunnoksia — välittömällä palautteella ja vaihe vaiheelta etenevällä vihjeellä.

**Tuotanto:** [mathplay.x84.fi](https://mathplay.x84.fi)

---

## Pikaopas kehittäjälle

```bash
npm install
npm run dev        # kehityspalvelin → http://localhost:5173
npm run build      # tuotantobuild → dist/
npm run lint       # ESLint-tarkistus
npm test           # Playwright E2E -testit
```

---

## Hakemistorakenne

```
src/
  App.tsx                  ← juurikomponentti, reititys tasojen välillä
  levels.ts                ← kokoaa ALL_LEVELS kaikista kategorioista

  store/
    gameSlice.ts           ← aktiivinen peli (pisteet, kysymys, ajastin, tila)
    progressSlice.ts       ← sessiohistoria + virheisiin perustuva painotus
    settingsSlice.ts       ← kieli (havaitaan selaimesta automaattisesti)

  i18n/                    ← kaikki käännökset (ks. i18n-osio alla)

  screens/
    Home.tsx               ← tehtäväruudukko kategoria- ja tähtifiltteröinnillä

  common/
    Toolbar.tsx            ← edistyminen, pisteet, ajastin, kielivalitsin
    GameScreen.tsx         ← yleiskäyttöinen pelikuori (vähennyslaskut, yhteenlaskut, kertotaulut)
    GameSetupDialog.tsx    ← kysymysten määrä, harjoitus/koe-tila, aikaraja
    Summary.tsx            ← kierroksen lopputulos, uudelleenyritys, ilotulitus täysillä pisteillä

  subtraction/             ← vähennyslaskutyypit + lainausvihjeet
  addition/                ← yhteenlaskutyypit + muistonumerovihje
  multiplication/          ← kertotaulut
  sequences/               ← lukujonot
  measurements/            ← mittamuunnokset, yksikköaritmetiikka, tilavuuslaskut

tests/                     ← Playwright E2E -testit
spec/                      ← kirjalliset määrittelydokumentit
```

---

## Uuden tason lisääminen

### Valmiiseen kategoriaan (esim. vähennyslaskut)

Lisää uusi objekti kategorian `levels.ts`-tiedostoon. Tason tulee sisältää `id`, `icon`, `className`, `stars` ja `generate()`-funktio — katso malli olemassa olevista tasoista.

Lisää sitten käännökset `src/i18n/levelLocales.ts`:ään kaikille 9 kielelle:

```ts
'oma_taso_id': {
  fi: { label: 'Oma taso', title: 'Oma taso', desc: 'Esim. ...' },
  en: { label: 'My level', title: 'My level', desc: 'e.g. ...' },
  sv: { ... }, nb: { ... }, de: { ... },
  es: { ... }, pt: { ... }, cs: { ... }, et: { ... },
},
```

### Uusi kategoria

1. Luo `src/<kategoria>/`-kansio, jonne tulee `levels.ts` ja React-komponentti
2. Lisää tasot `src/levels.ts`:ään `ALL_LEVELS`-kokoelmaan
3. Lisää type guard `App.tsx`:ään ja renderöi uusi komponentti
4. Lisää kategoria `Home.tsx`:n `CATEGORIES`-listaan
5. Lisää kategorian nimi `src/i18n/screens/Home.i18n.ts`:ään kohtaan `categories`

---

## i18n-järjestelmä

Kaikki käyttäjälle näytettävä teksti on käännöstiedostoissa — komponenteissa ei saa olla kovakoodattuja merkkijonoja millään kielellä.

### Rakenne

```
src/i18n/
  index.ts                 ← useTranslation-hook, useLang, LANGUAGES-lista
  levelLocales.ts          ← getLevelLocale() — tason label/title/desc kaikille kielille

  fi.ts  en.ts  sv.ts  nb.ts  de.ts  es.ts  pt.ts  cs.ts  et.ts
    ↑ globaalit varakäännökset

  screens/                 ← näyttökohtaiset käännökset
  common/                  ← komponenttikohtaiset käännökset
  addition/ subtraction/ multiplication/ sequences/ measurements/
```

### Käyttö komponentissa

```tsx
import { useTranslation, useLang } from '../i18n'
import translations from '../i18n/screens/MyScreen.i18n'

export default function MyScreen() {
  const t    = useTranslation(translations)  // hakee oikean kielen automaattisesti
  const lang = useLang()                     // 'fi' | 'en' | 'sv' | ...

  return <p>{t('myKey')}</p>
}
```

### Käännöstiedoston muoto

```ts
// src/i18n/screens/MyScreen.i18n.ts
export default {
  fi: { myKey: 'Teksti suomeksi' },
  en: { myKey: 'Text in English' },
  sv: { myKey: 'Text på svenska' },
  nb: { myKey: 'Tekst på norsk' },
  de: { myKey: 'Text auf Deutsch' },
  es: { myKey: 'Texto en español' },
  pt: { myKey: 'Texto em português' },
  cs: { myKey: 'Text v češtině' },
  et: { myKey: 'Tekst eesti keeles' },
}
```

### Tuetut kielet

| Koodi | Kieli |
|-------|-------|
| `fi`  | Suomi |
| `en`  | Englanti |
| `sv`  | Ruotsi |
| `nb`  | Norja (bokmål) |
| `de`  | Saksa |
| `es`  | Espanja |
| `pt`  | Portugali |
| `cs`  | Tšekki |
| `et`  | Viro |

---

## Testit

Testit ovat Playwrightilla kirjoitettuja E2E-testejä `tests/`-kansiossa.

```bash
npm test                   # aja kaikki testit
npm run test:report        # avaa HTML-raportti
```

Testit käynnistävät kehityspalvelimen automaattisesti (`playwright.config.ts`).

---

## Deployment

Push `main`-haaraan käynnistää CI/CD-pipelinen, joka buildaa ja deployaa sovelluksen automaattisesti Azure Static Web Appsiin.

```bash
git push origin main
```
