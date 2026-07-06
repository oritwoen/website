export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    'motion-v/nuxt',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://oritwoen.dev',
    name: 'oritwoen',
    description: 'Blockchain, crypto security, and dev tooling. TypeScript, Rust, Vue. Open source since 2016.',
    defaultLocale: 'en',
    titleSeparator: 'λ',
    identity: {
      type: 'Person',
    },
    twitter: '@oritwoen',
  },

  content: {
    experimental: { sqliteConnector: 'native' },
  },

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2026-07-05',

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      nodeCompat: true,
      deployConfig: true,
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    families: [
      { name: 'Space Grotesk', provider: 'google', weights: [400, 700] },
      { name: 'Space Mono', provider: 'google', weights: [400, 700] },
    ],
  },

  ogImage: {
    zeroRuntime: true,
  },
})
