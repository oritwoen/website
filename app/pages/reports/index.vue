<script setup lang="ts">
const reportsDescription = 'Bug bounty and security research. Classified archive — aggregate only.'

useSeoMeta({
  title: 'Reports',
  description: reportsDescription,
  ogTitle: 'Reports',
  ogDescription: reportsDescription,
  robots: 'noindex'
})

useSchemaOrg([
  defineWebPage({ '@type': 'AboutPage' }),
  defineBreadcrumb({ itemListElement: [{ name: 'Reports', item: '/reports' }] })
])

defineOgImage('Hero', {
  title: 'reports',
  description: reportsDescription,
  path: '~/reports',
  tag: '[classified]',
  terminal: [
    { prompt: true, text: 'stat ~/reports', color: 'accent' },
    { text: 'status: sealed', color: 'title' },
    { text: 'count: 0x██ · era: ████–████' },
    { prompt: true, text: 'access --list', color: 'accent' },
    { text: 'request only', color: 'success' }
  ]
})

// Stable hacker-glitch placeholders — no real numbers leaked
const stats = [
  { label: 'reports', value: '0x██', color: 'primary' as const },
  { label: 'programs', value: '▓▓', color: 'info' as const },
  { label: 'era', value: '████–████', color: 'highlighted' as const },
  { label: 'platforms', value: '▒▓', color: 'muted' as const }
]

const categories = [
  { label: 'information exposure', bar: 16, hash: '7F' },
  { label: 'authorization bypass', bar: 9, hash: 'A3' },
  { label: 'insecure credentials', bar: 7, hash: '2C' },
  { label: 'smart contract', bar: 3, hash: 'E1' },
  { label: 'open redirect', bar: 3, hash: '4B' },
  { label: 'rate-limit / automation', bar: 3, hash: 'D5' },
  { label: 'other web', bar: 8, hash: '9F' }
]

function barSegments(n: number, total = 20) {
  return Array.from({ length: total }, (_, i) => i < n)
}

// Sealed teaser rows — all values obscured
const sealed = [
  { year: '████', platform: '████████', width: 'w-3/4' },
  { year: '████', platform: '████████', width: 'w-2/3' },
  { year: '████', platform: '████████', width: 'w-4/5' },
  { year: '████', platform: '████████', width: 'w-1/2' },
  { year: '████', platform: '████████', width: 'w-3/5' },
  { year: '████', platform: '████████', width: 'w-2/3' }
]
</script>

<template>
  <UContainer class="py-12 sm:py-32">
    <div class="max-w-4xl mx-auto">
      <Motion v-bind="enterMotion(0.1)">
        <TerminalWindow cwd="~/reports" :modified="1">
          <!-- Classified banner -->
          <div class="mb-6 flex items-center gap-3 flex-wrap">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">cat</span>
            <span class="text-primary"> ~/reports/classified</span>
            <div class="flex-1" />
            <span class="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.12em] bg-error/15 text-error border border-error/30">
              <span class="size-1.5 rounded-full bg-error animate-pulse" />
              classified
            </span>
          </div>

          <p class="text-muted mb-6 max-w-2xl leading-relaxed">
            Archive sealed. Past bug bounty programs and direct disclosure to
            companies no longer around. Real numbers redacted. Details on request.
          </p>

          <!-- Stats (obscured) -->
          <div class="mb-8 pt-4 border-t border-default/40">
            <div class="mb-4">
              <span class="text-neutral">$ </span>
              <span class="text-highlighted">stat</span>
              <span class="text-primary"> ~/reports</span>
              <span class="text-muted"> --mask</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <Motion
                v-for="(s, i) in stats"
                :key="s.label"
                v-bind="staggerMotion(i)"
              >
                <StatCard :label="s.label" :color="s.color">
                  <span class="font-mono">{{ s.value }}</span>
                </StatCard>
              </Motion>
            </div>
          </div>

          <!-- Category breakdown — fake hex counts, obfuscated bars -->
          <div class="mb-8 pt-4 border-t border-default/40">
            <div class="mb-4">
              <span class="text-neutral">$ </span>
              <span class="text-highlighted">grep</span>
              <span class="text-muted"> -c </span>
              <span class="text-primary">category ~/reports/</span>
              <span class="text-dimmed"> | head</span>
            </div>

            <div class="space-y-1.5">
              <Motion
                v-for="(cat, i) in categories"
                :key="cat.label"
                v-bind="staggerMotion(i)"
              >
                <div class="flex items-center gap-3 text-[12px]">
                  <span class="w-44 shrink-0 text-muted">{{ cat.label }}</span>
                  <span class="flex gap-0.5 font-mono">
                    <span
                      v-for="(filled, bi) in barSegments(cat.bar)"
                      :key="bi"
                      class="w-1.5 h-3 rounded-sm"
                      :class="filled ? 'bg-primary/70' : 'bg-default/50'"
                    />
                  </span>
                  <span class="text-dimmed tabular-nums text-[11px] w-8 text-right font-mono">0x{{ cat.hash }}</span>
                </div>
              </Motion>
            </div>
          </div>

          <!-- Redacted entries -->
          <div class="mb-8 pt-4 border-t border-default/40">
            <div class="mb-4">
              <span class="text-neutral">$ </span>
              <span class="text-highlighted">ls</span>
              <span class="text-primary"> ~/reports </span>
              <span class="text-muted">| xxd | head</span>
            </div>

            <div class="space-y-1 font-mono text-[12px]">
              <Motion
                v-for="(s, i) in sealed"
                :key="i"
                v-bind="staggerMotion(i)"
              >
                <div class="flex items-center gap-3">
                  <span class="text-primary/70 w-12 shrink-0 select-none">{{ s.year }}</span>
                  <span class="text-neutral">│</span>
                  <span
                    class="inline-block h-3 bg-default/70 rounded-sm shrink-0"
                    :class="s.width"
                    style="max-width: 260px;"
                  />
                  <div class="flex-1" />
                  <span class="text-dimmed text-[10px] select-none uppercase tracking-[0.08em]">{{ s.platform }}</span>
                </div>
              </Motion>
            </div>
          </div>

          <!-- CTA -->
          <div class="pt-4 border-t border-default/40 flex items-center gap-3 flex-wrap">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">request</span>
            <span class="text-muted"> --details</span>
            <div class="flex-1" />
            <UButton
              to="/contact"
              label="reach out"
              trailing-icon="i-lucide-arrow-right"
              color="primary"
              size="sm"
            />
          </div>
        </TerminalWindow>
      </Motion>
    </div>
  </UContainer>
</template>
