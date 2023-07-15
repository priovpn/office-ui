import { reactive } from 'vue'
import { ExportedGlobalComposer } from 'vue-i18n'
import storeKeys from '@/storeKeys'
export type Language = 'en' | 'ru' | 'ua'

export default reactive<{
  locale: Language
  locales: { [key: string]: { f: string; t: string } }
  set: (l: Language, i18n: ExportedGlobalComposer) => void
}>({
  locale: localStorage.getItem(storeKeys.locale) as Language,
  locales: {
    en: {
      f: '🇬🇧',
      t: 'English'
    },
    ru: {
      f: '🇷🇺',
      t: 'Русский'
    },
    ua: {
      f: '🇺🇦',
      t: 'Українська'
    }
  },

  set(l: Language, i18n: ExportedGlobalComposer) {
    localStorage.setItem(storeKeys.locale, l)
    this.locale = l
    i18n.locale = l
  }
})
