<script setup lang="ts">
const timeline = [
  { year: '2016', msg: 'first commit. GitHub. Bitcointalk. the beginning.' },
  { year: '2017', msg: 'Ethereum. mining pools. node-stratum-pool.' },
  { year: '2018', msg: 'dApps era. commonwealth.gg. p3c.' },
  { year: '2019', msg: 'trading APIs. ccxt. e-commerce integrations.' },
  { year: '2021', msg: 'Nervos hackathon. Arweave. Stellar. Polkadot.' },
  { year: '2022', msg: 'Elrond puzzles. Sui. Ari10 crypto payments.' },
  { year: '2023', msg: 'Nuxt ecosystem. schema-org. form-actions. hints.' },
  { year: '2024', msg: 'bitcoin.pl. CDN infra. WordPress backend.' },
  { year: '2025', msg: 'crypto puzzles. b1000. cryptopuzzles. archex.' },
  { year: '2026', msg: 'AI agents. Rust crypto tools. kangaroo. boha. gixa.' }
]

const stacks = [
  { label: 'primary', items: ['TypeScript', 'Rust', 'Vue/Nuxt'] },
  { label: 'secondary', items: ['Python', 'Shell', 'Solidity'] },
  { label: 'tools', items: ['Arch Linux', 'Neovim', 'Docker', 'PostgreSQL', 'Git'] },
  { label: 'domains', items: ['cryptography', 'blockchain', 'ECDLP', 'hash reversal'] }
]

const philosophy = [
  'if it compiles, ship it.',
  'break crypto. build the tools to do it.',
  'Arch Linux, btw.'
]
</script>

<template>
  <Motion v-bind="enterMotion(0.1)">
    <TerminalWindow cwd="~/.about" :added="3" :modified="2">
        <div class="mb-4">
          <span class="text-neutral">$ </span>
          <span class="text-highlighted">cat</span>
          <span class="text-primary"> ~/.about</span>
        </div>

        <Motion v-bind="enterMotion(0.2)">
          <p class="text-muted ml-0 mb-4 max-w-lg leading-relaxed">
            Software engineer since 2016. Started with Ethereum Classic,
            spent years across 8 blockchains, now building Rust crypto tools
            and TypeScript libraries. Also runs Arch Linux.
          </p>
        </Motion>

        <Motion v-bind="enterMotion(0.35)">
          <div class="mb-4">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">cat</span>
            <span class="text-primary"> ~/.stack</span>
          </div>
        </Motion>

        <Motion v-bind="enterMotion(0.45)">
          <div class="grid grid-cols-2 gap-x-8 gap-y-1 ml-0 mb-6">
            <template
              v-for="(group, gi) in stacks"
              :key="group.label"
            >
              <Motion v-bind="staggerMotion(gi)">
                <div class="mb-2">
                  <span class="text-primary text-[11px] uppercase tracking-[0.12em]">{{ group.label }}</span>
                  <div class="text-muted">
                    {{ group.items.join(', ') }}
                  </div>
                </div>
              </Motion>
            </template>
          </div>
        </Motion>

        <Motion v-bind="enterMotion(0.6)">
          <div class="mb-4">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">cat</span>
            <span class="text-primary"> ~/.philosophy</span>
          </div>
        </Motion>

        <div class="ml-0 mb-6">
          <Motion
            v-for="(line, i) in philosophy"
            :key="line"
            v-bind="staggerMotion(i)"
          >
            <p class="text-muted mb-1">
              <span class="text-neutral">→</span> "{{ line }}"
            </p>
          </Motion>
        </div>

        <Motion v-bind="enterMotion(0.8)">
          <div class="mb-4">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">git log</span>
            <span class="text-primary"> --oneline</span>
            <span class="text-muted"> --author=oritwoen</span>
          </div>
        </Motion>

        <div class="ml-0">
          <Motion
            v-for="(entry, i) in timeline"
            :key="entry.year"
            v-bind="staggerMotion(i)"
          >
            <div class="flex gap-3 mb-1 group">
              <span class="text-primary shrink-0">{{ entry.year }}</span>
              <span class="text-neutral">│</span>
              <span class="text-muted">{{ entry.msg }}</span>
            </div>
          </Motion>
        </div>
    </TerminalWindow>
  </Motion>
</template>
