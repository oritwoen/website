<script setup lang="ts">
const links = [
  { label: 'github', to: 'https://github.com/oritwoen', icon: 'i-simple-icons-github' },
  { label: 'x', to: 'https://x.com/oritwoen', icon: 'i-simple-icons-x' },
]

function textToHex(s: string) {
  return '0x' + [...s].map(c => c.charCodeAt(0).toString(16)).join('')
}

// Easter eggs as hex
const blockHex = textToHex('oritwoen') // 0x6f72697477 6f656e
const txHex = textToHex('oritwoenoritwoenoritwoenoritwoen') // 64-char tx-hash-like
const txShort = `${txHex.slice(0, 10)}...${txHex.slice(-4)}`
</script>

<template>
  <UFooter
    :ui="{
      root: 'bg-elevated/30',
      container: 'border-t border-default/40 lg:py-6',
      right: 'gap-x-0 flex-wrap',
    }"
  >
    <template #left>
      <div class="flex items-center gap-2 font-mono text-xs text-dimmed flex-wrap">
        <span class="text-neutral">~</span>
        <span>oritwoen</span>
        <span class="text-neutral">/</span>
        <span class="text-neutral">$</span>
        <span class="text-neutral ml-2">echo</span>
        <span>"{{ new Date().getFullYear() }}"</span>
        <span class="text-neutral mx-1">│</span>
        <span
          class="flex items-center gap-1"
          :title="`ascii → hex: ${'oritwoen'} = ${blockHex}`"
        >
          <UIcon
            name="i-simple-icons-bitcoin"
            class="size-3 text-[#F7931A]"
          />
          <span class="tabular-nums">block #{{ blockHex }}</span>
        </span>
        <span class="text-neutral mx-1">│</span>
        <span
          class="flex items-center gap-1"
          :title="`ascii → hex: oritwoen×4 = ${txHex}`"
        >
          <UIcon
            name="i-simple-icons-ethereum"
            class="size-3 text-[#627EEA]"
          />
          <span class="tabular-nums">{{ txShort }}</span>
        </span>
      </div>
    </template>

    <template #right>
      <UButton
        v-for="link in links"
        :key="link.label"
        :icon="link.icon"
        :to="link.to"
        color="neutral"
        variant="ghost"
        size="sm"
        target="_blank"
        class="font-mono text-xs"
      >
        {{ link.label }}
      </UButton>
    </template>
  </UFooter>
</template>
