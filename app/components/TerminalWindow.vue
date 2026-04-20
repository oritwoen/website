<script setup lang="ts">
interface Runtime {
  icon: string
  version: string
  color?: string
}

withDefaults(defineProps<{
  user?: string
  host?: string
  app?: string
  appIcon?: string
  cwd?: string
  branch?: string
  added?: number
  deleted?: number
  modified?: number
  runtime?: Runtime
  bodyClass?: string
}>(), {
  bodyClass: 'p-3 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-[1.7] sm:leading-[1.8]',
})
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-default/60 bg-elevated/30 backdrop-blur-sm terminal-glow">
    <TerminalHead
      :user="user"
      :host="host"
      :app="app"
      :app-icon="appIcon"
      :cwd="cwd"
      :branch="branch"
      :added="added"
      :deleted="deleted"
      :modified="modified"
      :runtime="runtime"
    />

    <div :class="bodyClass">
      <slot />
    </div>
  </div>
</template>
