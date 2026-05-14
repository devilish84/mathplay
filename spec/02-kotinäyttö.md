# Kotinäyttö — Spesifikaatio

## Yleiskuvaus

Kotinäyttö on ensimmäinen asia, jonka lapsi tai vanhempi näkee sovelluksen avattua. Sen tehtävä on tarjota selkeä kategoriavalinta ilman ylimääräistä tekstiä.

## Layout

```
┌─────────────────────────────────────────────────┐
│  🔢 Matematiikkaa        [Suomi ▾]              │
├─────────────────────────────────────────────────┤
│                                                 │
│  ╔══════════════════╗  ╔══════════════════╗    │
│  ║  ➕ Yhteenlaskut  ║  ║ ➖ Vähennyslaskut ║    │
│  ║  Taso 1–4        ║  ║ Taso 1–4         ║    │
│  ╚══════════════════╝  ╚══════════════════╝    │
│                                                 │
│  ╔══════════════════╗  ╔══════════════════╗    │
│  ║  🔢 Lukujonot     ║  ║ 📏 Yksiköt        ║    │
│  ║  Tasot A–D       ║  ║  (tulossa)        ║    │
│  ╚══════════════════╝  ╚══════════════════╝    │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Kategoriat (v1.0)

| Kategoria | Ikoni | Alataso-kuvaus | Tila |
|-----------|-------|----------------|------|
| Yhteenlaskut | ➕ | Taso 1–4, vaaka ja allekkain | Valmis |
| Vähennyslaskut | ➖ | Taso 1–4, vaaka ja allekkain | Valmis |
| Lukujonot | 🔢 | Jono A–D | Valmis |
| Yksikkömuunnokset | 📏 | Pituus, paino, tilavuus | Tulossa |

## Käyttäytyminen

- Kategoriaa klikatessa siirrytään kyseisen kategorian **tasovalintanäyttöön**
- "Tulossa"-kategoriat näytetään himmennettynä eikä niitä voi klikata
- Kielivalitsin näkyy oikeassa yläkulmassa (v1.1)

## Värit

Käytetään nykyistä väripalettia:
- Yhteenlaskut: vihreä (`#00b894`)
- Vähennyslaskut: punainen/roosa (`#d63031`)
- Lukujonot: sininen (`#0984e3`)
- Yksiköt: violetti (`#6c5ce7`) — himmennetty jos ei käytettävissä
