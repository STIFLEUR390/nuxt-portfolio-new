export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],
  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
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
      { code: 'fr', name: 'Français' },
      { code: 'en', name: 'English' }
    ],
    defaultLocale: 'fr'
  },

  ogImage: {
    zeroRuntime: true
  }
})
