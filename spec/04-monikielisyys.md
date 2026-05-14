# Monikielisyys (i18n) — Spesifikaatio

## Tavoite

Peli toimii usealla kielellä. Kaikki käyttöliittymätekstit sijaitsevat käännöstiedostoissa — ei kovakoodattuja tekstejä komponenteissa.

## Rakenne

```
src/i18n/
  fi.js      ← suomi (oletuskieli, ensisijainen)
  en.js      ← englanti
  index.js   ← useTranslation-hook + kielivalinta
```

## Käännösavaimet (esimerkki `fi.js`)

```js
export default {
  home: {
    title: "Matematiikkaa",
    subtitle: "Mitä harjoitellaan tänään?",
    categories: {
      addition: "Yhteenlaskut",
      subtraction: "Vähennyslaskut",
      sequences: "Lukujonot",
      units: "Yksikkömuunnokset",
      comingSoon: "Tulossa",
    }
  },
  game: {
    question: "Kysymys",
    of: "/",
    points: "Pisteet",
    check: "Tarkista ✓",
    next: "Seuraava →",
    back: "← Takaisin",
    hint: "💡 Vihje",
    showStep: "Mikä vähennetään?",
    startFromOnes: "Aloita ykköisistä!",
    borrowTip: "Tarvitsetko lainausta? Klikkaa ylärivin numeroa 👆",
    carryTip: "Ylittyykö 10? Kirjoita muistinumero 1 yläpuolelle ☝️",
  },
  feedback: {
    correct: "🎉 Oikein! Hienosti tehty!",
    wrong: "😅 Ei ihan! Oikea vastaus oli {answer}",
    seqCorrect: "🎉 Oikein! Loistavaa!",
    seqWrong: "😅 Ei ihan! Oikeat luvut näkyvät yläpuolella.",
  },
  hint: {
    title: "💡 Katsotaan yhdessä!",
    nextStep: "Seuraava vaihe →",
    done: "Hienosti! Nyt tiedät miten se tehdään! 🌟",
    borrowNeeded: "Katsotaan ensin ykkösiä: {a} − {b}. Ei onnistu!",
    borrowFrom: "Lainataan yksi {from}sta!",
  },
  summary: {
    perfect: "Täydellinen tulos!",
    great: "Todella hyvä työ!",
    good: "Hyvä yritys!",
    keepGoing: "Harjoittele lisää, se auttaa!",
    result: "Sait {score}/{total} oikein ({pct}%)",
    retry: "🔄 Pelaa uudelleen",
    backToLevels: "← Valitse taso",
  },
  levels: {
    selectTitle: "Valitse taso",
    label: {
      lv1: "Taso 1", lv2: "Taso 2", lv3: "Taso 3", lv4: "Taso 4",
      seqA: "Jono A", seqB: "Jono B", seqC: "Jono C", seqD: "Jono D",
    }
  },
  columns: {
    ones: "ykköset",
    tens: "kymmenet",
    hundreds: "sadat",
  }
}
```

## useTranslation-hook

```js
// src/i18n/index.js
import { useSelector } from 'react-redux'
import fi from './fi'
import en from './en'

const TRANSLATIONS = { fi, en }

export function useTranslation() {
  const lang = useSelector(state => state.settings.language)
  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.fi

  // Tukee {muuttujia}: t('feedback.wrong', { answer: 18 })
  return (key, vars = {}) => {
    const val = key.split('.').reduce((o, k) => o?.[k], t) ?? key
    return Object.entries(vars).reduce(
      (s, [k, v]) => s.replace(`{${k}}`, v), val
    )
  }
}
```

## Kielivalinta

- Tallennetaan Redux settingsSlice:een (`language: 'fi'`)
- Kotinäytön oikeassa yläkulmassa `<select>` -valikko
- Oletuskieli: `fi`
