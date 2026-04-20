<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  color?: 'primary' | 'info' | 'highlighted' | 'muted'
}>(), {
  color: 'primary',
})

const colorClass = computed(() => ({
  primary: 'text-primary',
  info: 'text-info',
  highlighted: 'text-highlighted',
  muted: 'text-muted',
}[props.color]))
</script>

<template>
  <div class="rounded-lg border border-default/60 bg-default/40 p-3">
    <div
      class="text-2xl font-bold leading-none tabular-nums"
      :class="colorClass"
    >
      <slot />
    </div>
    <div class="text-[10px] uppercase tracking-[0.08em] text-dimmed mt-2">
      {{ label }}
    </div>
  </div>
</template>
