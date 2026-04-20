<script setup lang="ts">
definePageMeta({
  colorMode: 'dark',
})

const { data: page } = await useAsyncData('index', () => queryCollection('content').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
})

defineOgImage('Hero', {
  title: 'oritwoen',
  description: description ?? undefined,
  path: '~/.about',
  tag: page.value?.hero?.headline ?? 'ships code. breaks things. patches them back.',
})

const heroTitle = computed(() => {
  const [primary = '', ...secondaryParts] = (page.value?.title ?? '').split('\n')

  return {
    primary,
    secondary: secondaryParts.join(' ').trim(),
  }
})
</script>

<template>
  <div v-if="page">
    <UPageHero
      :ui="{
        root: 'pb-16 sm:pb-32',
        container: 'relative z-10 py-12 sm:py-20 lg:py-32',
        wrapper: 'flex flex-col items-start',
        title: 'text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] tracking-tighter leading-[1.05]',
        description: 'mt-4 sm:mt-5 max-w-xl mx-auto text-sm sm:text-lg leading-relaxed text-default',
        links: 'gap-3',
      }"
      orientation="horizontal"
    >
      <template #top>
        <Motion v-bind="staggerMotion(0)">
          <HeroShaders class="absolute top-0 inset-x-0 opacity-15 h-full" />
        </Motion>

        <GradientGlow class="top-0 w-2/3 h-1/2" />
      </template>

      <template #headline>
        <Motion v-bind="enterMotion(0.2)">
          <UBadge
            color="neutral"
            variant="soft"
            :label="page.hero.headline"
            class="rounded-full px-3 py-1.5 gap-1.5 bg-white/5 backdrop-blur"
          >
            <template #leading>
              <UChip
                inset
                standalone
                :ui="{ base: 'animate-pulse ring-0' }"
              />
            </template>
          </UBadge>
        </Motion>
      </template>

      <template #title>
        <Motion
          as="span"
          v-bind="enterMotion(0.35)"
          class="inline-block"
        >
          <span
            class="animate-shimmer bg-size-[200%_auto] bg-clip-text text-transparent"
            :style="{
              backgroundImage: 'linear-gradient(135deg, var(--color-primary-300), var(--color-primary-300), var(--color-primary-100), var(--color-primary-100), var(--color-primary-100), var(--color-primary-200), var(--color-primary-300))',
              animationDuration: '10s',
            }"
          >
            {{ heroTitle.primary }}
          </span>
        </Motion>
      </template>

      <template #description>
        <Motion
          as="span"
          v-bind="enterMotion(0.5)"
          class="inline-block"
        >
          {{ page.description }}
        </Motion>
      </template>

      <template #links>
        <div class="flex flex-col items-start gap-5 w-full">
          <Motion
            class="flex flex-col items-start gap-4 w-full"
            v-bind="enterMotion(0.6)"
          >
            <span class="font-mono uppercase text-xs tracking-[0.12em] text-dimmed">
              {{ page.logos.title }}
            </span>
            <div class="flex flex-wrap items-center gap-6">
              <NuxtLink
                v-for="logo in page.logos.items"
                :key="logo.icon"
                :to="logo.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="logo.name"
                :title="logo.name"
                class="text-muted hover:text-[var(--brand)] transition-colors duration-200"
                :style="{ '--brand': logo.color }"
              >
                <UIcon
                  :name="logo.icon"
                  class="size-6"
                />
              </NuxtLink>
            </div>
          </Motion>

          <Motion
            class="flex flex-wrap gap-3"
            v-bind="enterMotion(0.7)"
          >
            <UButton
              v-for="link in page.hero.links"
              :key="link.label"
              v-bind="link"
            />
          </Motion>
        </div>
      </template>

      <Motion
        as-child
        v-bind="enterMotion(0.85)"
      >
        <HeroTerminal :lines="page.terminal.lines" />
      </Motion>
    </UPageHero>

    <UContainer>
      <HomeFeed />
    </UContainer>
  </div>
</template>
