export interface BorrowingHintStrings {
  title:        string
  nextStep:     string
  done:         string
  col:          { ones: string; tens: string; hundreds: string }
  lookOk:       (col: string, a: number, b: number) => string
  lookFail:     (col: string, a: number, b: number) => string
  borrow:       (toCol: string, fromCol: string, old: number, reduced: number, toNew: number) => string
  borrowCalc:   (col: string, orig: number, result: number) => string
  borrowChain:  (zeroCol: string, srcCol: string, srcOld: number, srcNew: number, midNew: number, onesNew: number) => string
  calcCol:      (col: string, a: number, b: number, res: number) => string
  calcColSimple:(col: string, a: number, b: number, res: number) => string
  answer:       (ans: number) => string
}

const i18n: Record<string, BorrowingHintStrings> = {
  fi: {
    title:    '💡 Katsotaan yhdessä!',
    nextStep: 'Seuraava vaihe →',
    done:     'Hienosti! Nyt tiedät miten se tehdään! 🌟',
    col:      { ones: 'ykköset', tens: 'kymmenet', hundreds: 'sadat' },
    lookOk:       (col, a, b)                           => `Katsotaan ensin ${col}ä: ${a} − ${b}. Onnistuu!`,
    lookFail:     (col, a, b)                           => `Katsotaan ensin ${col}ä: ${a} − ${b}. Ei onnistu — ${a} on pienempi kuin ${b}!`,
    borrow:       (toCol, fromCol, old, reduced, toNew) => `Lainataan yksi ${fromCol}sta! ${old} → ${reduced}, ja ${toCol} saavat +10 → ${toNew}.`,
    borrowCalc:   (col, orig, result)                  => `Lasketaan ${col}: 10 + ${orig} = ${result} ✓`,
    borrowChain:  (zeroCol, srcCol, srcOld, srcNew, midNew, onesNew) => `${zeroCol} on 0, joten lainataan ${srcCol}sta! ${srcOld} → ${srcNew}. Kymmenet saavat 10, mutta antavat heti ykköisille: kymmenet ${midNew}, ykköset ${onesNew}.`,
    calcCol:      (col, a, b, res)                      => `Lasketaan ${col}: ${a} − ${b} = ${res}`,
    calcColSimple:(col, a, b, res)                      => `${col}: ${a} − ${b} = ${res}`,
    answer:       (ans)                                 => `Vastaus on ${ans}! 🎉`,
  },
  en: {
    title:    "💡 Let's look together!",
    nextStep: 'Next step →',
    done:     'Great! Now you know how to do it! 🌟',
    col:      { ones: 'ones', tens: 'tens', hundreds: 'hundreds' },
    lookOk:       (col, a, b)                           => `Let's look at ${col}: ${a} − ${b}. That works!`,
    lookFail:     (col, a, b)                           => `Let's look at ${col}: ${a} − ${b}. Can't do it — ${a} is smaller than ${b}!`,
    borrow:       (toCol, fromCol, old, reduced, toNew) => `Borrow one from ${fromCol}! ${old} → ${reduced}, and ${toCol} gets +10 → ${toNew}.`,
    borrowCalc:   (col, orig, result)                  => `Calculate ${col}: 10 + ${orig} = ${result} ✓`,
    borrowChain:  (zeroCol, srcCol, srcOld, srcNew, midNew, onesNew) => `${zeroCol} is 0, so borrow from ${srcCol}! ${srcOld} → ${srcNew}. Tens get 10 but pass it to ones: tens ${midNew}, ones ${onesNew}.`,
    calcCol:      (col, a, b, res)                      => `Calculate ${col}: ${a} − ${b} = ${res}`,
    calcColSimple:(col, a, b, res)                      => `${col}: ${a} − ${b} = ${res}`,
    answer:       (ans)                                 => `The answer is ${ans}! 🎉`,
  },
}

export default i18n
