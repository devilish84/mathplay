# Matematiikkapeli — Yleiskuvaus

## Tarkoitus

Selainpohjainen matematiikkaharjoittelupeli, joka on suunniteltu ensisijaisesti alakouluikäisille lapsille. Peli tukee oppimista visuaalisesti selkeiden tehtävien, välittömän palautteen ja askel-askeleelta etenevien vihjeiden avulla.

## Kohderyhmä

- **Ensisijainen käyttäjä:** 6–10-vuotias lapsi
- **Toissijainen käyttäjä:** vanhempi tai opettaja, joka seuraa edistymistä ja valitsee harjoiteltavan aiheen

## Tekniset vaatimukset

| Vaatimus | Ratkaisu |
|----------|----------|
| Frontend | React + Vite |
| Tila | Redux Toolkit |
| Kielituki | i18n-rakenne (fi, en lähtökohtana) |
| Jakelu | 1) Node.js-palvelu (Express/serve), 2) yksittäinen HTML-tiedosto (`vite build --base ./`) |
| Versiointi | Git, haara `development` + `main` |

## Arkkitehtuuriperiaatteet

- **Laajennettavuus:** uusi aihealue lisätään omana kansionaan (`src/<aihe>/`) ilman muutoksia muihin osioihin
- **Komponenttijako:** jokainen näkymä ja merkittävä UI-elementti on oma tiedostonsa
- **Tila Redux-storessa:** pisteet, virhehistoria, kielivalinta, nykyinen taso
- **Ei ulkoisia CSS-frameworkeja** — oma tyylitiedosto (`App.css`)

## Kansiorakenne (tavoite)

```
src/
  App.jsx
  App.css
  main.jsx
  store/
    index.js          ← Redux store
    progressSlice.js  ← pisteet, virhehistoria, painotus
    settingsSlice.js  ← kieli, ääniasetukset
  i18n/
    fi.js
    en.js
    index.js
  screens/
    Home.jsx
  common/
    GameScreen.jsx
    LevelSelect.jsx
    Summary.jsx
  subtraction/   …
  addition/      …
  sequences/     …
  unitConversions/ …  (tuleva)
```
