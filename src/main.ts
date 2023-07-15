import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import LottieAnimation from 'lottie-web-vue'
import App from './App.vue'
import router from './router'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Theme styles
import '@/assets/styles/app.scss'
import EnLocale from './locales/EnLocale'
import RuLocale from './locales/RuLocale'
import LocaleStore, { Language } from './store/LocaleStore'
import UaLocale from './locales/UaLocale'

const i18n = createI18n({
  locale: LocaleStore.locale,
  fallbackLocale: 'en' as Language,
  messages: {
    en: EnLocale,
    ru: RuLocale,
    ua: UaLocale
  }
})

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1a252e',
          secondary: '#1a252e',
          background: '#18242D'
          // background: '#FFFFFF',
          // surface: '#FFFFFF',
          // primary: '#6200EE',
          // 'primary-darken-1': '#3700B3',
          // 'secondary-darken-1': '#018786',
          // error: '#B00020',
          // info: '#2196F3',
          // success: '#4CAF50',
          // warning: '#FB8C00'
        }
      }
    }
  }
})

const app = createApp(App)

app.use(router).use(vuetify).use(i18n).use(LottieAnimation).mount('#app')
