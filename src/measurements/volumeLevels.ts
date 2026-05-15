import img1dl  from './images/1dl_mitta_lapinakyva.png'
import img3dl  from './images/3dl_limppari.png'
import img1l   from './images/1l_maitopurkki_lapinakyva.png'
import img2l   from './images/2l_mehukannu_lapinakyva.png'
import img5l   from './images/5l_kattila_lapinakyva.png'

export interface VolumeItem {
  img:    string
  labels: Record<string, string>
  dl:     number
}

export const VOLUME_ITEMS: VolumeItem[] = [
  { img: img1dl, dl: 1,  labels: { fi: '1 dl mitta',      sv: '1 dl mått',       nb: '1 dl mål',        de: '1 dl Messbecher', es: '1 dl taza',      pt: '1 dl copo',      cs: '1 dl odměrka',   et: '1 dl mõõt',      en: '1 dl cup'     } },
  { img: img3dl, dl: 3,  labels: { fi: '3 dl limppari',   sv: '3 dl flaska',     nb: '3 dl flaske',     de: '3 dl Flasche',    es: '3 dl botella',   pt: '3 dl garrafa',   cs: '3 dl láhev',     et: '3 dl pudel',     en: '3 dl bottle'  } },
  { img: img1l,  dl: 10, labels: { fi: '1 l maitopurkki', sv: '1 l mjölkpaket',  nb: '1 l melkepakke',  de: '1 l Milchkarton', es: '1 l cartón',     pt: '1 l caixa',      cs: '1 l krabice',    et: '1 l pakend',     en: '1 l carton'   } },
  { img: img2l,  dl: 20, labels: { fi: '2 l mehukannu',   sv: '2 l saftkanna',   nb: '2 l saftkanne',   de: '2 l Saftkrug',    es: '2 l jarra',      pt: '2 l jarro',      cs: '2 dl džbán',     et: '2 l kann',       en: '2 l jug'      } },
  { img: img5l,  dl: 50, labels: { fi: '5 l kattila',     sv: '5 l kastrull',    nb: '5 l gryte',       de: '5 l Topf',        es: '5 l olla',       pt: '5 l panela',     cs: '5 l hrnec',      et: '5 l pott',       en: '5 l pot'      } },
]

export interface VolumeQuestion {
  items:    { item: VolumeItem; count: number }[]  // which items and how many of each
  totalDl:  number
  // answer format
  answerInLDl: boolean  // true → answer as l + dl, false → answer as dl only
}

export interface VolumeLevelI18n { label: string; title: string; desc: string }

export interface VolumeLevel {
  kind:      'volume'
  id:        string
  i18n:      Record<string, VolumeLevelI18n>
  icon:      string
  className: string
  generate:  () => VolumeQuestion
}

import { rand, shuffle } from '../rng'

function buildQuestion(pool: VolumeItem[], maxDl: number, answerInLDl: boolean): VolumeQuestion {
  let totalDl = 0
  const items: { item: VolumeItem; count: number }[] = []

  const shuffled = shuffle([...pool]).slice(0, rand(2, 3))
  for (const item of shuffled) {
    const maxCount = Math.max(1, Math.floor((maxDl - totalDl) / item.dl))
    if (maxCount < 1) continue
    const count = rand(1, Math.min(maxCount, 4))
    items.push({ item, count })
    totalDl += item.dl * count
  }

  // ensure at least one item
  if (items.length === 0) {
    const item = pool[0]
    items.push({ item, count: 1 })
    totalDl = item.dl
  }

  return { items, totalDl, answerInLDl }
}

export const VOLUME_LEVELS: VolumeLevel[] = [
  {
    kind:      'volume',
    id:        'vol_dl_only',
    i18n: {
      fi: { label: 'dl laskut',      title: 'Laske desilitrat',           desc: 'Laske kuvissa näkyvien astioiden yhteistilavuus desilitroina' },
      en: { label: 'dl sums',        title: 'Count decilitres',           desc: 'Count the total volume of the pictured containers in decilitres' },
      sv: { label: 'dl summor',      title: 'Räkna deciliter',            desc: 'Räkna den totala volymen av de avbildade behållarna i deciliter' },
      nb: { label: 'dl summmer',     title: 'Tell desilitere',            desc: 'Tell det totale volumet av de avbildede beholderne i desilitere' },
      de: { label: 'dl Aufgaben',    title: 'Deziliter zählen',           desc: 'Zähle das Gesamtvolumen der abgebildeten Behälter in Dezilitern' },
      es: { label: 'sumas de dl',    title: 'Cuenta decilitros',          desc: 'Cuenta el volumen total de los recipientes en decilitros' },
      pt: { label: 'somas de dl',    title: 'Conta decilitros',           desc: 'Conta o volume total dos recipientes em decilitros' },
      cs: { label: 'dl příklady',    title: 'Počítej decilitry',          desc: 'Spočítej celkový objem vyobrazených nádob v decilintrech' },
      et: { label: 'dl ülesanded',   title: 'Loe detsiliitrid',           desc: 'Loe piltidel näidatud nõude kogumaht detsiliitrites' },
    },
    icon:      '⭐',
    className: 'level-green',
    generate() {
      return buildQuestion(
        VOLUME_ITEMS.filter(i => i.dl <= 3),
        20, false
      )
    },
  },
  {
    kind:      'volume',
    id:        'vol_l_dl',
    i18n: {
      fi: { label: 'l ja dl laskut',    title: 'Laske litrat ja desilitrat',     desc: 'Laske kuvissa näkyvien astioiden yhteistilavuus litroina ja desilitroina' },
      en: { label: 'l and dl sums',     title: 'Count litres and decilitres',    desc: 'Count the total volume of the pictured containers in litres and decilitres' },
      sv: { label: 'l och dl summor',   title: 'Räkna liter och deciliter',      desc: 'Räkna den totala volymen av de avbildade behållarna i liter och deciliter' },
      nb: { label: 'l og dl summer',    title: 'Tell liter og desilitere',       desc: 'Tell det totale volumet av de avbildede beholderne i liter og desilitere' },
      de: { label: 'l und dl Aufgaben', title: 'Liter und Deziliter zählen',     desc: 'Zähle das Gesamtvolumen der abgebildeten Behälter in Liter und Deziliter' },
      es: { label: 'sumas de l y dl',   title: 'Cuenta litros y decilitros',     desc: 'Cuenta el volumen total de los recipientes en litros y decilitros' },
      pt: { label: 'somas de l e dl',   title: 'Conta litros e decilitros',      desc: 'Conta o volume total dos recipientes em litros e decilitros' },
      cs: { label: 'l a dl příklady',   title: 'Počítej litry a decilitry',      desc: 'Spočítej celkový objem vyobrazených nádob v litrech a decilintrech' },
      et: { label: 'l ja dl ülesanded', title: 'Loe liitrid ja detsiliitrid',    desc: 'Loe piltidel näidatud nõude kogumaht liitrites ja detsiliitrites' },
    },
    icon:      '⭐⭐',
    className: 'level-blue',
    generate() {
      return buildQuestion(
        VOLUME_ITEMS.filter(i => i.dl <= 20),
        40, true
      )
    },
  },
  {
    kind:      'volume',
    id:        'vol_mix',
    i18n: {
      fi: { label: 'Astiat yhteensä',    title: 'Astiat yhteensä',            desc: 'Kaikki astiat sekaisin — laske yhteistilavuus' },
      en: { label: 'All containers',     title: 'All containers',             desc: 'All containers mixed — count the total volume' },
      sv: { label: 'Alla behållare',     title: 'Alla behållare',             desc: 'Alla behållare blandade — räkna totalvolymen' },
      nb: { label: 'Alle beholdere',     title: 'Alle beholdere',             desc: 'Alle beholdere blandet — tell totalvolumet' },
      de: { label: 'Alle Behälter',      title: 'Alle Behälter',              desc: 'Alle Behälter gemischt — zähle das Gesamtvolumen' },
      es: { label: 'Todos los recipientes', title: 'Todos los recipientes',   desc: 'Todos los recipientes mezclados — cuenta el volumen total' },
      pt: { label: 'Todos os recipientes', title: 'Todos os recipientes',     desc: 'Todos os recipientes misturados — conta o volume total' },
      cs: { label: 'Všechny nádoby',     title: 'Všechny nádoby',             desc: 'Všechny nádoby dohromady — spočítej celkový objem' },
      et: { label: 'Kõik nõud',          title: 'Kõik nõud',                  desc: 'Kõik nõud kokku — loe kogumaht' },
    },
    icon:      '⭐⭐⭐',
    className: 'level-purple',
    generate() {
      return buildQuestion(VOLUME_ITEMS, 80, true)
    },
  },
]
