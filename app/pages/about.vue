<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('content').first())

const aboutDescription = 'Software engineer since 2016. Rust crypto tools, TypeScript libraries, Vue/Nuxt frontends. Running Arch Linux since forever.'

useSeoMeta({
  title: 'About',
  description: aboutDescription,
  ogTitle: 'About',
  ogDescription: aboutDescription,
})

useSchemaOrg([
  defineWebPage({ '@type': 'AboutPage' }),
  defineBreadcrumb({ itemListElement: [{ name: 'About', item: '/about' }] }),
])

defineOgImage('Hero', {
  title: 'about',
  description: 'Software engineer since 2016. Rust crypto tools, TypeScript libraries, Arch Linux.',
  path: '~/.about',
  tag: 'if it compiles, ship it.',
  terminal: [
    { prompt: true, text: 'whoami', color: 'accent' },
    { text: 'software engineer, 10 years on GitHub' },
    { prompt: true, text: 'cat ~/.stack', color: 'accent' },
    { text: 'TypeScript / Rust / Vue / Python', color: 'title' },
    { text: 'Arch Linux / Docker / PostgreSQL' },
    { prompt: true, text: 'echo "domain"', color: 'accent' },
    { text: 'cryptography, blockchain, ECDLP', color: 'success' },
  ],
})
</script>

<template>
  <div v-if="page">
    <div class="py-12 sm:py-32">
      <div class="max-w-3xl mx-auto px-4">
        <AboutTerminal />
        <AboutMetrics />
        <AboutCta :command="page.cta.command" />
      </div>
    </div>
  </div>
</template>
