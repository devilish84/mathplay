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
  sv: {
    title:    '💡 Låt oss titta tillsammans!',
    nextStep: 'Nästa steg →',
    done:     'Bra! Nu vet du hur man gör! 🌟',
    col:      { ones: 'ental', tens: 'tiotal', hundreds: 'hundratal' },
    calc:         (col, a, b, sum) => `Räkna ${col}: ${a} + ${b} = ${sum}`,
    calcCarryIn:  (col, a, b, sum) => `Räkna ${col}: ${a} + ${b} + 1 (minnessiffra) = ${sum}`,
    withCarryOut: (base, digit)    => `${base} → skriv ${digit}, minnessiffra 1 till nästa`,
    answer:       (ans)            => `Svaret är ${ans}! 🎉`,
  },
  nb: {
    title:    '💡 La oss se sammen!',
    nextStep: 'Neste steg →',
    done:     'Flott! Nå vet du hvordan det gjøres! 🌟',
    col:      { ones: 'enere', tens: 'tiere', hundreds: 'hundrer' },
    calc:         (col, a, b, sum) => `Regn ${col}: ${a} + ${b} = ${sum}`,
    calcCarryIn:  (col, a, b, sum) => `Regn ${col}: ${a} + ${b} + 1 (minnesiffer) = ${sum}`,
    withCarryOut: (base, digit)    => `${base} → skriv ${digit}, minnesiffer 1 til neste`,
    answer:       (ans)            => `Svaret er ${ans}! 🎉`,
  },
  de: {
    title:    '💡 Lass uns zusammen schauen!',
    nextStep: 'Nächster Schritt →',
    done:     'Super! Jetzt weißt du, wie es geht! 🌟',
    col:      { ones: 'Einer', tens: 'Zehner', hundreds: 'Hunderter' },
    calc:         (col, a, b, sum) => `Rechne ${col}: ${a} + ${b} = ${sum}`,
    calcCarryIn:  (col, a, b, sum) => `Rechne ${col}: ${a} + ${b} + 1 (Übertrag) = ${sum}`,
    withCarryOut: (base, digit)    => `${base} → schreibe ${digit}, Übertrag 1 zur nächsten`,
    answer:       (ans)            => `Die Antwort ist ${ans}! 🎉`,
  },
  es: {
    title:    '💡 ¡Miremos juntos!',
    nextStep: 'Siguiente paso →',
    done:     '¡Genial! ¡Ahora sabes cómo hacerlo! 🌟',
    col:      { ones: 'unidades', tens: 'decenas', hundreds: 'centenas' },
    calc:         (col, a, b, sum) => `Calculamos ${col}: ${a} + ${b} = ${sum}`,
    calcCarryIn:  (col, a, b, sum) => `Calculamos ${col}: ${a} + ${b} + 1 (llevada) = ${sum}`,
    withCarryOut: (base, digit)    => `${base} → escribe ${digit}, llevada 1 a la siguiente`,
    answer:       (ans)            => `¡La respuesta es ${ans}! 🎉`,
  },
  pt: {
    title:    '💡 Vamos ver juntos!',
    nextStep: 'Próximo passo →',
    done:     'Ótimo! Agora sabes como fazer! 🌟',
    col:      { ones: 'unidades', tens: 'dezenas', hundreds: 'centenas' },
    calc:         (col, a, b, sum) => `Calculamos ${col}: ${a} + ${b} = ${sum}`,
    calcCarryIn:  (col, a, b, sum) => `Calculamos ${col}: ${a} + ${b} + 1 (transporte) = ${sum}`,
    withCarryOut: (base, digit)    => `${base} → escreve ${digit}, transporte 1 para a seguinte`,
    answer:       (ans)            => `A resposta é ${ans}! 🎉`,
  },
  cs: {
    title:    '💡 Podívejme se spolu!',
    nextStep: 'Další krok →',
    done:     'Skvěle! Teď víš, jak to udělat! 🌟',
    col:      { ones: 'jednotky', tens: 'desítky', hundreds: 'stovky' },
    calc:         (col, a, b, sum) => `Počítáme ${col}: ${a} + ${b} = ${sum}`,
    calcCarryIn:  (col, a, b, sum) => `Počítáme ${col}: ${a} + ${b} + 1 (přenos) = ${sum}`,
    withCarryOut: (base, digit)    => `${base} → napíšeme ${digit}, přenos 1 do dalšího`,
    answer:       (ans)            => `Odpověď je ${ans}! 🎉`,
  },
  et: {
    title:    '💡 Vaatame koos!',
    nextStep: 'Järgmine samm →',
    done:     'Tubli! Nüüd tead, kuidas seda teha! 🌟',
    col:      { ones: 'ühed', tens: 'kümned', hundreds: 'sajad' },
    calc:         (col, a, b, sum) => `Arvutame ${col}: ${a} + ${b} = ${sum}`,
    calcCarryIn:  (col, a, b, sum) => `Arvutame ${col}: ${a} + ${b} + 1 (ülekanne) = ${sum}`,
    withCarryOut: (base, digit)    => `${base} → kirjuta ${digit}, ülekanne 1 järgmisesse`,
    answer:       (ans)            => `Vastus on ${ans}! 🎉`,
  },
}

export default i18n
