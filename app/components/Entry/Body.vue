<script setup lang="ts">
defineProps<{
  value: unknown
}>()
</script>

<template>
  <Motion v-bind="enterMotion(0.3)">
    <div
      class="prose prose-invert prose-sm sm:prose-base max-w-none
             prose-headings:font-mono prose-headings:tracking-tight
             prose-a:text-primary prose-a:no-underline hover:prose-a:underline
             prose-pre:bg-default/60 prose-pre:border prose-pre:border-default/50
             prose-pre:rounded-xl prose-pre:p-4 sm:prose-pre:p-5
             prose-pre:overflow-x-auto prose-pre:shadow-none
             prose-pre:text-[12px] sm:prose-pre:text-[13px] prose-pre:leading-[1.7]
             prose-code:font-mono
             [&_:not(pre)>code]:text-primary [&_:not(pre)>code]:bg-accented/40
             [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5
             [&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:font-normal
             [&_:not(pre)>code]:before:content-none [&_:not(pre)>code]:after:content-none
             [&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:font-mono"
    >
      <ContentRenderer :value="value as any" />
    </div>
  </Motion>
</template>
