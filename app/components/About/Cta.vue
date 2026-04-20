<script setup lang="ts">
const props = defineProps<{
  command: string
}>()

const { copy, copied } = useClipboard()
</script>

<template>
  <Motion v-bind="enterMotion(1.1)">
    <div class="mt-12 text-center">
      <GradientGlow class="bottom-0 w-2/3 h-1/2" />
      <div class="relative z-10">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-4">
          fork<br>something
        </h2>
        <p class="text-dimmed max-w-sm mx-auto mb-8 leading-relaxed">
          Crypto security, blockchain infra, dev tooling — always open
          for interesting problems.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <UButton
            label="GitHub"
            color="primary"
            size="xl"
            to="https://github.com/oritwoen"
            target="_blank"
          />
          <UButton
            label="X"
            color="neutral"
            variant="soft"
            size="xl"
            to="https://x.com/oritwoen"
            target="_blank"
          />
        </div>
        <div class="mt-6">
          <UButton
            :label="props.command"
            :trailing-icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
            color="neutral"
            variant="subtle"
            class="font-mono font-light text-toned gap-4"
            size="xl"
            :ui="{ trailingIcon: 'size-5' }"
            @click="copy(props.command)"
          />
        </div>
      </div>
    </div>
  </Motion>
</template>
