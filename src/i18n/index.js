import { useSelector } from 'react-redux'
import fi from './fi'
import en from './en'

const TRANSLATIONS = { fi, en }

export const LANGUAGES = [
  { code: 'fi', label: 'Suomi' },
  { code: 'en', label: 'English' },
]

export function useTranslation() {
  const lang = useSelector((state) => state.settings.language)
  const dict = TRANSLATIONS[lang] ?? TRANSLATIONS.fi

  return function t(key, vars = {}) {
    const val = key.split('.').reduce((o, k) => o?.[k], dict) ?? key
    if (typeof val !== 'string') return key
    return Object.entries(vars).reduce((s, [k, v]) => s.replace(`{${k}}`, v), val)
  }
}
