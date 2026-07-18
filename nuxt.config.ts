export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    'nuxt-directus-sdk'
  ],

  directus: {
    url: process.env.DIRECTUS_URL || 'https://portfolio-directus.aplix.nl',
    adminToken: process.env.DIRECTUS_ADMIN_TOKEN,
    proxy: {
      enabled: true,
      path: '/directus'
    },
    types: {
      prefix: 'App'
    },
    image: {
      setDefaultProvider: true
    },
    visualEditor: false
  },

  sitemap: {
    urls: [
      { loc: '/', changefreq: 'monthly', priority: 1 },
      { loc: '/projects', changefreq: 'monthly', priority: 0.8 },
      { loc: '/about', changefreq: 'monthly', priority: 0.8 },
      { loc: '/contact', changefreq: 'monthly', priority: 0.6 },
      { loc: '/blog', changefreq: 'weekly', priority: 0.7 }
    ]
  },


  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  image: {
    domains: ['images.unsplash.com'],
    format: ['webp']
  },

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
    baseUrl: 'https://portfolio.aplix.nl',
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
