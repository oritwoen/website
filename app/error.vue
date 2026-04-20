<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error?.statusCode === 404)
const code = computed(() => props.error?.statusCode ?? 500)
const message = computed(() => is404.value ? 'route not found' : (props.error?.message || 'something broke'))

useSeoMeta({
  title: `${code.value} — ${message.value}`,
  robots: 'noindex'
})

function handleHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-16">
    <div class="max-w-xl w-full">
      <TerminalWindow cwd="~/error" :deleted="1">
        <div class="space-y-2">
          <div>
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">cat</span>
            <span class="text-primary"> /var/log/last.err</span>
          </div>
          <div class="pl-4 text-error tabular-nums">
            [{{ code }}] {{ message }}
          </div>

          <div class="pt-3">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">cd</span>
            <span class="text-primary"> ~</span>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-default/40 flex items-center gap-3">
          <UButton
            color="primary"
            size="sm"
            label="back home"
            trailing-icon="i-lucide-arrow-right"
            @click="handleHome"
          />
          <UButton
            to="/projects"
            color="neutral"
            variant="soft"
            size="sm"
            label="projects"
          />
        </div>
      </TerminalWindow>
    </div>
  </div>
</template>
