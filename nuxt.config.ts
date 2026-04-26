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

  compatibilityDate: '2025-01-15',

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      nodeCompat: true,
      deployConfig: true,
      wrangler: {
        name: 'website',
        account_id: '6ef8d3cbe19975e93d994f25228488e7',
        preview_urls: true,
        d1_databases: [{
          binding: 'DB',
          database_id: '3459751e-826a-4408-9df4-76534707f46a',
          database_name: 'website',
        }],
        routes: [
          {
            pattern: 'oritwoen.dev',
            custom_domain: true,
          },
        ],
        placement: {
          mode: 'smart',
        },
        observability: {
          logs: {
            enabled: true,
            invocation_logs: true,
          },
        },
      },
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
