import img1dl from './images/missing/1dl.png'
import img2dl from './images/missing/2dl.png'
import img3dl from './images/missing/3dl.png'
import img4dl from './images/missing/4dl.png'
import img5dl from './images/missing/5dl.png'
import img6dl from './images/missing/6dl.png'
import img7dl from './images/missing/7dl.png'
import img8dl from './images/missing/8dl.png'
import img9dl from './images/missing/9dl.png'

export const MISSING_PITCHER_IMGS: Record<number, string> = {
  1: img1dl, 2: img2dl, 3: img3dl, 4: img4dl, 5: img5dl,
  6: img6dl, 7: img7dl, 8: img8dl, 9: img9dl,
}

export interface MissingLevel {
  kind:        'missing'
  id:          string
  icon:        string
  className:   string
  pool:        number[]   // pitcher fill amounts (dl) to draw from
  maxPitchers: number     // max pitchers shown per question
  maxLitres:   number     // max target litres (1, 2, or 3)
  i18n:        Record<string, { label: string; title: string; desc: string }>
}

export const MISSING_LEVELS: MissingLevel[] = [
  {
    kind:        'missing',
    id:          'miss_1l',
    icon:        '⭐⭐',
    className:   'level-blue',
    pool:        [1, 2, 3, 4, 5, 6, 7, 8, 9],
    maxPitchers: 1,
    maxLitres:   1,
    i18n: {
      fi: { label: 'Puuttuva dl',        title: 'Kuinka monta dl puuttuu?',        desc: 'Montako desilitraa puuttuu, jotta kannussa olisi 1 litra?' },
      en: { label: 'Missing dl',         title: 'How many dl are missing?',        desc: 'How many decilitres are missing to make 1 litre?' },
      sv: { label: 'Saknade dl',         title: 'Hur många dl saknas?',            desc: 'Hur många deciliter saknas för att kannorna ska ha 1 liter?' },
      nb: { label: 'Manglende dl',       title: 'Hvor mange dl mangler?',          desc: 'Hvor mange desilitere mangler for å fylle til 1 liter?' },
      de: { label: 'Fehlende dl',        title: 'Wie viele dl fehlen?',            desc: 'Wie viele Deziliter fehlen, damit die Kanne 1 Liter hat?' },
      es: { label: 'dl que faltan',      title: '¿Cuántos dl faltan?',            desc: '¿Cuántos decilitros faltan para llegar a 1 litro?' },
      pt: { label: 'dl em falta',        title: 'Quantos dl faltam?',             desc: 'Quantos decilitros faltam para completar 1 litro?' },
      cs: { label: 'Chybějící dl',       title: 'Kolik dl chybí?',                desc: 'Kolik decilitrů chybí, aby byl v džbánu 1 litr?' },
      et: { label: 'Puuduv dl',          title: 'Mitu dl puudub?',                desc: 'Mitu detsiliitrit puudub, et kannu mahuks 1 liiter?' },
    },
  },
  {
    kind:        'missing',
    id:          'miss_multi',
    icon:        '⭐⭐⭐',
    className:   'level-purple',
    pool:        [1, 2, 3, 4, 5, 6, 7, 8, 9],
    maxPitchers: 3,
    maxLitres:   3,
    i18n: {
      fi: { label: 'Kannuja yhteensä',   title: 'Montako dl puuttuu litraan?',     desc: 'Laske 1–3 kannun sisältö ja arvaile kuinka paljon puuttuu 1–3 litraan.' },
      en: { label: 'Multiple pitchers',  title: 'How many dl missing to the litre?', desc: 'Add up 1–3 pitchers and find how many dl are missing to reach 1–3 litres.' },
      sv: { label: 'Flera kannor',       title: 'Hur många dl saknas till litern?', desc: 'Addera 1–3 kannors innehåll och räkna ut hur mycket som saknas till 1–3 liter.' },
      nb: { label: 'Flere kanner',       title: 'Hvor mange dl mangler til literen?', desc: 'Legg sammen 1–3 kanner og finn ut hvor mange dl som mangler til 1–3 liter.' },
      de: { label: 'Mehrere Kannen',     title: 'Wie viele dl fehlen bis zum Liter?', desc: 'Addiere 1–3 Kannen und finde heraus, wie viele dl bis 1–3 Liter fehlen.' },
      es: { label: 'Varias jarras',      title: '¿Cuántos dl faltan para el litro?', desc: 'Suma 1–3 jarras y calcula cuántos dl faltan para llegar a 1–3 litros.' },
      pt: { label: 'Vários jarros',      title: 'Quantos dl faltam para o litro?',  desc: 'Some 1–3 jarros e calcula quantos dl faltam para atingir 1–3 litros.' },
      cs: { label: 'Více džbánů',        title: 'Kolik dl chybí do litru?',        desc: 'Sečti 1–3 džbány a zjisti, kolik dl chybí do 1–3 litrů.' },
      et: { label: 'Mitu kannu',         title: 'Mitu dl puudub liitrini?',        desc: 'Liida 1–3 kannu ja leia, mitu dl puudub 1–3 liitrini.' },
    },
  },
]
