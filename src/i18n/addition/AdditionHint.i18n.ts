export interface AdditionHintStrings {
  title:        string
  nextStep:     string
  done:         string
  col:          { ones: string; tens: string; hundreds: string }
  calc:         (col: string, a: number, b: number, sum: number) => string
  calcCarryIn:  (col: string, a: number, b: number, sum: number) => string
  withCarryOut: (base: string, digit: number) => string
  answer:       (ans: number) => string
}

const i18n: Record<string, AdditionHintStrings> = {
  fi: {
    title:    '💡 Katsotaan yhdessä!',
    nextStep: 'Seuraava vaihe →',
    done:     'Hienosti! Nyt tiedät miten se tehdään! 🌟',
    col:      { ones: 'ykköset', tens: 'kymmenet', hundreds: 'sadat' },
    calc:         (col, a, b, sum) => `Lasketaan ${col}: ${a} + ${b} = ${sum}`,
    calcCarryIn:  (col, a, b, sum) => `Lasketaan ${col}: ${a} + ${b} + 1 (muistinumero) = ${sum}`,
    withCarryOut: (base, digit)    => `${base} → kirjoitetaan ${digit}, muistinumero 1 seuraavaan`,
    answer:       (ans)            => `Vastaus on ${ans}! 🎉`,
  },
  en: {
    title:    "💡 Let's look together!",
    nextStep: 'Next step →',
    done:     'Great! Now you know how to do it! 🌟',
    col:      { ones: 'ones', tens: 'tens', hundreds: 'hundreds' },
    calc:         (col, a, b, sum) => `Calculate ${col}: ${a} + ${b} = ${sum}`,
    calcCarryIn:  (col, a, b, sum) => `Calculate ${col}: ${a} + ${b} + 1 (carry) = ${sum}`,
    withCarryOut: (base, digit)    => `${base} → write ${digit}, carry 1 to next`,
    answer:       (ans)            => `The answer is ${ans}! 🎉`,
  },
}

export default i18n
