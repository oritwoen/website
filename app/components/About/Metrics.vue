<script setup lang="ts">
</script>

<template>
  <Motion v-bind="enterMotion(1.0)">
    <div class="rounded-2xl border border-default bg-default overflow-hidden">
      <div class="grid sm:grid-cols-2 gap-px">
        <Motion v-bind="staggerMotion(0)">
          <div class="rounded-none p-8 text-center">
            <div class="text-4xl font-bold tracking-tight leading-none text-primary">
              10
            </div>
            <div class="font-mono text-xs uppercase tracking-[0.06em] text-dimmed mt-3">
              years on GitHub
            </div>
          </div>
        </Motion>
        <Motion v-bind="staggerMotion(1)">
          <div class="rounded-none p-8 text-center">
            <div class="text-4xl font-bold tracking-tight leading-none text-info">
              6
            </div>
            <div class="font-mono text-xs uppercase tracking-[0.06em] text-dimmed mt-3">
              languages shipped
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </Motion>
</template>
