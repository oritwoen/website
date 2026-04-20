<script setup lang="ts">
interface Badge {
  label: string
  tone?: 'primary' | 'muted'
}

interface ExternalLink {
  label: string
  href: string
}

defineProps<{
  backTo: string
  backLabel: string
  path: string
  title: string
  description?: string
  date: string | Date
  badges?: Badge[]
  author?: string
  external?: ExternalLink
}>()

function fmtDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d
  return date.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<template>
  <Motion v-bind="enterMotion(0.1)">
    <UButton
      :to="backTo"
      :label="backLabel"
      icon="i-lucide-arrow-left"
      color="neutral"
      variant="soft"
      size="sm"
      class="mb-6 font-mono"
    />
  </Motion>

  <Motion v-bind="enterMotion(0.2)">
    <TerminalWindow class="mb-8">
      <div class="mb-3">
        <span class="text-neutral">$ </span>
        <span class="text-highlighted">cat</span>
        <span class="text-primary"> {{ path }}</span>
      </div>

      <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-highlighted mb-3 leading-tight">
        {{ title }}
      </h1>

      <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px]">
        <span class="text-muted">{{ fmtDate(date) }}</span>

        <template v-if="badges?.length">
          <span class="text-neutral">·</span>
          <span
            v-for="b in badges"
            :key="b.label"
            class="px-1.5 py-0.5 rounded text-[11px]"
            :class="b.tone === 'muted'
              ? 'bg-accented/30 text-dimmed'
              : 'bg-accented/50 text-primary'"
          >
            {{ b.label }}
          </span>
        </template>

        <template v-if="author">
          <span class="text-neutral">·</span>
          <span class="text-muted">{{ author }}</span>
        </template>

        <template v-if="external">
          <span class="text-neutral">·</span>
          <a
            :href="external.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-dimmed hover:text-primary transition-colors underline underline-offset-4"
          >{{ external.label }}</a>
        </template>
      </div>

      <p
        v-if="description"
        class="mt-3 text-muted text-[12px] leading-relaxed"
      >
        {{ description }}
      </p>
    </TerminalWindow>
  </Motion>
</template>
