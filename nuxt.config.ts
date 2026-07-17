export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  ui: {
    content: true
  },

  runtimeConfig: {
    usesendApiKey: '',
    usesendBaseUrl: '',
    fromEmail: '',
    contactEmail: ''
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  vite: {
    optimizeDeps: {
      include: ['motion-v', 'framer-motion', 'framer-motion/dom']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    locales: [
      {
        code: 'fr',
        language: 'fr-FR',
        name: 'Français',
        file: 'fr.json'
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    langDir: 'locales',
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    baseUrl: 'https://heroldtamko.dev',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  ogImage: {
    zeroRuntime: true
  }
})
