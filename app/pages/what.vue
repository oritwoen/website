<script setup lang="ts">
const whatDescription = 'Stuff I build on request, or for myself when idea sticks. Crypto tools, GPU kernels, Nuxt apps, CLIs without bloat.'

useSeoMeta({
  title: 'What',
  description: whatDescription,
  ogTitle: 'What',
  ogDescription: whatDescription,
})

useSchemaOrg([
  defineWebPage({ '@type': 'AboutPage' }),
  defineBreadcrumb({ itemListElement: [{ name: 'What', item: '/what' }] }),
])

defineOgImage('Hero', {
  title: 'what',
  description: whatDescription,
  path: '~/.services',
  tag: 'commission · whim · collab',
  terminal: [
    { prompt: true, text: 'ls ~/.services', color: 'accent' },
    { text: 'crypto-security   : ECDSA, lattice HNP', color: 'title' },
    { text: 'gpu-compute       : Rust + wgpu, ECDLP', color: 'title' },
    { text: 'full-stack-web    : Nuxt 4, Cloudflare', color: 'title' },
    { text: 'security-audits   : bug bounty, contracts', color: 'title' },
  ],
})

interface Service {
  id: string
  icon: string
  title: string
  description: string
  tags: string[]
  examples: { name: string, href: string, kind: 'own' | 'client' | 'contrib' }[]
  accent: 'primary' | 'info' | 'success' | 'warning'
}

const services: Service[] = [
  {
    id: 'crypto-security',
    icon: 'i-lucide-shield-check',
    title: 'crypto security',
    description: 'Breaking ECDSA where someone broke it first. Nonce reuse, biased k, lattice attacks on HNP. GPU Pollard Kangaroo when secp256k1 range needs brute force.',
    tags: ['Rust', 'ECDSA', 'ECDLP'],
    examples: [
      { name: 'kangaroo', href: 'https://github.com/oritwoen/kangaroo', kind: 'own' },
      { name: 'vusi', href: 'https://github.com/oritwoen/vusi', kind: 'own' },
    ],
    accent: 'primary',
  },
  {
    id: 'gpu-compute',
    icon: 'i-lucide-cpu',
    title: 'gpu compute',
    description: 'Loops that belong on GPU. Rust with wgpu, one shader runs on Vulkan, Metal and DX12. Brute search, vanity addresses, hash reversal.',
    tags: ['Rust', 'wgpu', 'shaders'],
    examples: [
      { name: 'vgen', href: 'https://github.com/oritwoen/vgen', kind: 'own' },
      { name: 'shaha', href: 'https://github.com/oritwoen/shaha', kind: 'own' },
    ],
    accent: 'info',
  },
  {
    id: 'full-stack-web',
    icon: 'i-lucide-layout',
    title: 'full-stack web',
    description: 'Nuxt 4 on Cloudflare Workers and D1. Same stack as this site. Headless CMS plumbing, e-commerce, GraphQL, component libs.',
    tags: ['Nuxt', 'Vue', 'Cloudflare'],
    examples: [
      { name: 'bitcoin.pl', href: 'https://bitcoin.pl', kind: 'client' },
    ],
    accent: 'success',
  },
  {
    id: 'dev-tooling',
    icon: 'i-lucide-wrench',
    title: 'dev tooling',
    description: 'CLIs that respect your time. Rust or TypeScript, Nuxt modules, unjs-style micro libs, unified git API, local-first search.',
    tags: ['Rust', 'TypeScript', 'CLI'],
    examples: [
      { name: 'omnichron', href: 'https://github.com/oritwoen/omnichron', kind: 'own' },
      { name: 'gixa', href: 'https://github.com/oritwoen/gixa', kind: 'own' },
    ],
    accent: 'primary',
  },
  {
    id: 'security-audits',
    icon: 'i-lucide-bug',
    title: 'security audits',
    description: 'Web pentests. Smart contract audits. OAuth flow review. 23 reports out across Immunefi, HackerOne, direct programs.',
    tags: ['security', 'bug-bounty', 'contracts'],
    examples: [
      { name: 'reports', href: '/reports', kind: 'own' },
    ],
    accent: 'warning',
  },
  {
    id: 'ai-agents',
    icon: 'i-lucide-bot',
    title: 'ai agents',
    description: 'Plumbing around Claude and other LLMs. Skill systems, memory, MCP servers, local retrieval, workflow orchestration. Boring until it works.',
    tags: ['AI', 'Claude', 'MCP'],
    examples: [
      { name: 'skilld', href: 'https://github.com/skilld-dev/skilld', kind: 'contrib' },
    ],
    accent: 'info',
  },
]

const accentColor = {
  primary: 'text-primary',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
}

const kindMeta: Record<'own' | 'client' | 'contrib', { glyph: string, color: string, label: string }> = {
  own: { glyph: '●', color: 'text-primary', label: 'mine' },
  client: { glyph: '◆', color: 'text-warning', label: 'client work' },
  contrib: { glyph: '○', color: 'text-info', label: 'contributor' },
}

interface Mode {
  icon: string
  label: string
  description: string
  color: string
}

const modes: Mode[] = [
  {
    icon: 'i-lucide-briefcase',
    label: 'commission',
    description: 'Paid gig. Scope on paper, timeline you can plan against, rates agreed first.',
    color: 'text-primary',
  },
  {
    icon: 'i-lucide-sparkles',
    label: 'whim',
    description: 'Weird problem, no budget? Sometimes just build it if idea sticks.',
    color: 'text-info',
  },
  {
    icon: 'i-lucide-handshake',
    label: 'collaboration',
    description: 'Long haul. OSS, startup, research, whatever we build together over months. Equity or revenue share.',
    color: 'text-success',
  },
]
</script>

<template>
  <UContainer class="py-12 sm:py-32">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Services terminal -->
      <Motion v-bind="enterMotion(0.1)">
        <TerminalWindow
          cwd="~/.services"
          :modified="6"
        >
          <div class="mb-4">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">cat</span>
            <span class="text-primary"> manifest</span>
          </div>
          <p class="text-muted mb-6 max-w-2xl">
            Things I build for you, or for myself when idea's good enough.
            Shipping code since 2016. Blockchain since Ethereum Classic days.
            Mostly Rust and Nuxt now.
          </p>

          <div class="mb-4 pt-4 border-t border-default/40">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">ls</span>
            <span class="text-primary"> . </span>
            <span class="text-muted">--category</span>
          </div>

          <div class="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-dimmed">
            <span
              v-for="(meta, key) in kindMeta"
              :key="key"
            >
              <span
                :class="meta.color"
                class="mr-1"
              >{{ meta.glyph }}</span>{{ meta.label }}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Motion
              v-for="(service, i) in services"
              :key="service.id"
              v-bind="staggerMotion(i)"
            >
              <div
                class="group rounded-lg border border-default/60 bg-default/40 hover:bg-accented/30 hover:border-primary/30 transition-all duration-200 p-4 h-full flex flex-col"
              >
                <div class="flex items-center gap-2 mb-2">
                  <UIcon
                    :name="service.icon"
                    class="size-4 shrink-0"
                    :class="accentColor[service.accent]"
                  />
                  <span class="text-highlighted group-hover:text-primary transition-colors text-sm">
                    {{ service.title }}
                  </span>
                </div>

                <p class="text-muted text-[12px] leading-relaxed mb-3 flex-1">
                  {{ service.description }}
                </p>

                <div class="flex flex-wrap items-center gap-2 text-[11px]">
                  <span
                    v-for="tag in service.tags"
                    :key="tag"
                    class="text-dimmed bg-accented/50 px-1.5 py-0.5 rounded"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="flex items-center gap-2 text-[11px] text-dimmed pt-3 mt-3 border-t border-default/40">
                  <span class="text-neutral">→</span>
                  <template
                    v-for="(ex, ei) in service.examples"
                    :key="ex.name"
                  >
                    <span
                      v-if="ei > 0"
                      class="text-neutral"
                    >·</span>
                    <a
                      :href="ex.href"
                      :target="ex.href.startsWith('http') ? '_blank' : undefined"
                      :rel="ex.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                      :title="kindMeta[ex.kind].label"
                      class="hover:text-primary transition-colors underline underline-offset-4 decoration-default/50"
                    >
                      <span
                        :class="kindMeta[ex.kind].color"
                        class="mr-1"
                      >{{ kindMeta[ex.kind].glyph }}</span>{{ ex.name }}
                    </a>
                  </template>
                </div>
              </div>
            </Motion>
          </div>
        </TerminalWindow>
      </Motion>

      <!-- Modes terminal -->
      <Motion v-bind="enterMotion(0.2)">
        <TerminalWindow
          cwd="~/.work"
          :added="3"
        >
          <div class="mb-4">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">echo</span>
            <span class="text-muted"> "ways to work"</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Motion
              v-for="(mode, i) in modes"
              :key="mode.label"
              v-bind="staggerMotion(i)"
            >
              <div class="rounded-lg border border-default/60 bg-default/40 p-4 h-full">
                <div class="flex items-center gap-2 mb-2">
                  <UIcon
                    :name="mode.icon"
                    class="size-4 shrink-0"
                    :class="mode.color"
                  />
                  <span
                    class="uppercase tracking-[0.1em] text-[11px]"
                    :class="mode.color"
                  >
                    {{ mode.label }}
                  </span>
                </div>
                <p class="text-muted text-[12px] leading-relaxed">
                  {{ mode.description }}
                </p>
              </div>
            </Motion>
          </div>

          <div class="mt-5 pt-4 border-t border-default/40 flex items-center gap-3 flex-wrap">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">contact</span>
            <span class="text-muted"> --rate=negotiable</span>
            <div class="flex-1" />
            <UButton
              to="/contact"
              label="got an idea?"
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
