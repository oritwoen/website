<script setup lang="ts">
interface SurroundItem {
  path?: string
  title?: string
  description?: string
}

defineProps<{
  items: (SurroundItem | null)[] | null | undefined
}>()
</script>

<template>
  <Motion
    v-if="items?.some(Boolean)"
    v-bind="enterMotion(0.5)"
  >
    <USeparator class="my-12" />
    <div class="grid sm:grid-cols-2 gap-4">
      <NuxtLink
        v-for="s in items"
        v-show="s"
        :key="s?.path ?? ''"
        :to="s?.path"
        class="group p-4 rounded-xl border border-default/60 bg-elevated/20 hover:bg-elevated/40 transition-colors duration-200"
      >
        <div class="font-mono text-[11px] text-primary uppercase tracking-[0.12em] mb-1">
          {{ s?.title }}
        </div>
        <div
          v-if="s?.description"
          class="text-muted text-[12px] line-clamp-2"
        >
          {{ s.description }}
        </div>
      </NuxtLink>
    </div>
  </Motion>
</template>
