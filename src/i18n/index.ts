import { useSelector } from 'react-redux'
import fi from './fi'
import en from './en'
import sv from './sv'
import nb from './nb'
import de from './de'
import es from './es'
import pt from './pt'
import cs from './cs'
import et from './et'
import type { RootState } from '../store'

type TranslationDict = Record<string, unknown>
type LocalTranslations = { fi: TranslationDict; en?: TranslationDict; [key: string]: TranslationDict | undefined }

const GLOBAL_TRANSLATIONS: LocalTranslations = { fi, en, sv, nb, de, es, pt, cs, et }

export const LANGUAGES = [
  { code: 'fi', label: 'Suomi' },
  { code: 'en', label: 'English' },
  { code: 'sv', label: 'Svenska' },
  { code: 'nb', label: 'Norsk' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'cs', label: 'Čeština' },
  { code: 'et', label: 'Eesti' },
]

export function useLang(): string {
  return useSelector((state: RootState) => state.settings.language)
}

export function useTranslation(localTranslations?: LocalTranslations) {
  const lang = useSelector((state: RootState) => state.settings.language)
  const source = localTranslations ?? GLOBAL_TRANSLATIONS
  const dict = source[lang] ?? source.fi

  return function t(key: string, vars: Record<string, string | number> = {}): string {
    const val = key.split('.').reduce<unknown>((o, k) => (o as TranslationDict)?.[k], dict) ?? key
    if (typeof val !== 'string') return key
    return Object.entries(vars).reduce((s, [k, v]) => s.replace(`{${k}}`, String(v)), val)
  }
}
