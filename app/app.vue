<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#0f0d0a' },
    { name: 'color-scheme', content: 'dark' },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  ],
})

useSeoMeta({
  ogType: 'website',
  ogSiteName: 'oritwoen',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterSite: '@oritwoen',
  twitterCreator: '@oritwoen',
  author: 'oritwoen',
})

useSchemaOrg([
  defineWebSite({
    name: 'oritwoen',
    description: 'Blockchain, crypto security, and dev tooling. TypeScript, Rust, Vue. Open-source since 2016.',
    inLanguage: 'en',
  }),
  definePerson({
    '@id': 'https://oritwoen.dev#person',
    'name': 'oritwoen',
    'alternateName': 'Ori',
    'url': 'https://oritwoen.dev',
    'jobTitle': 'Software Engineer',
    'description': 'Breaks crypto and builds the tools to do it. Rust systems, TypeScript tooling, Vue fullstack.',
    'knowsAbout': [
      'Cryptography',
      'Blockchain',
      'Rust',
      'TypeScript',
      'Vue.js',
      'Nuxt',
      'Security Research',
      'ECDSA',
      'secp256k1',
    ],
    'sameAs': [
      'https://github.com/oritwoen',
      'https://x.com/oritwoen',
      'https://bsky.app/profile/oritwoen.dev',
      'https://farcaster.xyz/oritwoen',
    ],
  }),
])
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <BgHexRain />

    <AppHeader />

    <Motion v-bind="staggerMotion(0)">
      <HeroShaders class="absolute top-0 inset-x-0 opacity-15 h-full" />
    </Motion>

    <GradientGlow class="top-0 w-2/3 h-1/2" />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
