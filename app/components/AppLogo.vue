<script setup lang="ts">
function enterMotion(delay: number = 0) {
  return {
    initial: { opacity: 0, x: -8 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, delay }
  }
}
</script>

<template>
  <Motion
    as="span"
    v-bind="enterMotion(0.2)"
    class="inline-flex items-center gap-1 font-mono text-sm tracking-tight"
  >
    <span class="text-neutral">~</span>
    <span class="text-primary font-medium">oritwoen</span>
    <span class="text-neutral">/</span>
    <span class="text-neutral">$</span>
  </Motion>
</template>
