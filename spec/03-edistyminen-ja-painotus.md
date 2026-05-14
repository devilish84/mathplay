# Edistyminen ja virhepainotus — Spesifikaatio

## Tavoite

Järjestelmä seuraa lapsen virheitä tehtävätyypeittäin ja painottaa tulevia tehtäviä niin, että vaikeat kohdat toistuvat useammin.

## Redux-tila (`progressSlice`)

```js
{
  sessions: [
    {
      id: "uuid",
      date: "2026-05-14",
      mode: "subtraction",      // subtraction | addition | sequences
      levelId: "5",             // tason tunnus
      score: 7,
      total: 10,
      errors: [
        { a: 34, b: 16, userAnswer: 24, correct: 18 },
        ...
      ]
    }
  ],
  weights: {
    // tehtävätyyppikohtainen paino 1.0 = normaali, >1.0 = painotettu
    "subtraction-column-lv3": 1.8,
    "addition-column-lv2": 1.2,
  }
}
```

## Painotusalgoritmi (v1.0 — yksinkertainen)

1. Jokaisen session lopussa lasketaan **virheprosentti** tasolla
2. Jos virheprosentti > 40 % → tason paino +0.3 (max 3.0)
3. Jos virheprosentti < 20 % → tason paino −0.1 (min 1.0)
4. Tehtävävalinnassa `generate()`-funktiota kutsutaan painotettua satunnaisuutta käyttäen

## Tehtävävalinta painotuksella (tuleva toteutus)

```js
// Esimerkki: tasot joilla paino > 1.5 saavat 2× todennäköisyyden tulla valituksi
function weightedLevelPick(levels, weights) { ... }
```

## UI-indikaattorit (v1.1)

- Tasovalinnassa virhealttiit tasot merkitään pienellä punaisella tähdellä tai prosentilla
- Kotinäytön kategoriakortissa voidaan näyttää "viimeisin tulos"

## Tallennus

- Redux-tila tallennetaan `localStorage`een automaattisesti (redux-persist tai manuaalinen serialize)
- Ei vaadi käyttäjätiliä — laitekohtainen historia
