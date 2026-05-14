export default {
  fi: {
    title:    '💡 Katsotaan yhdessä!',
    nextStep: 'Seuraava vaihe →',
    done:     'Hienosti! Nyt tiedät miten se tehdään! 🌟',
    col:      { ones: 'ykköset', tens: 'kymmenet', hundreds: 'sadat' },
    calc:         (col, a, b, sum)           => `Lasketaan ${col}: ${a} + ${b} = ${sum}`,
    calcCarryIn:  (col, a, b, sum)           => `Lasketaan ${col}: ${a} + ${b} + 1 (muistinumero) = ${sum}`,
    withCarryOut: (base, digit)              => `${base} → kirjoitetaan ${digit}, muistinumero 1 seuraavaan`,
    answer:       (ans)                      => `Vastaus on ${ans}! 🎉`,
  },
  en: {
    title:    '💡 Let\'s look together!',
    nextStep: 'Next step →',
    done:     'Great! Now you know how to do it! 🌟',
    col:      { ones: 'ones', tens: 'tens', hundreds: 'hundreds' },
    calc:         (col, a, b, sum)           => `Calculate ${col}: ${a} + ${b} = ${sum}`,
    calcCarryIn:  (col, a, b, sum)           => `Calculate ${col}: ${a} + ${b} + 1 (carry) = ${sum}`,
    withCarryOut: (base, digit)              => `${base} → write ${digit}, carry 1 to next`,
    answer:       (ans)                      => `The answer is ${ans}! 🎉`,
  },
}
