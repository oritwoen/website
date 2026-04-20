<script setup lang="ts">
interface TerminalSegment {
  text: string
  style: string
}

interface TerminalLine {
  segments: TerminalSegment[]
}

const { lines } = defineProps<{
  lines: TerminalLine[]
}>()

const segmentStyles: Record<string, string> = {
  'prompt': 'text-muted',
  'cmd': 'text-highlighted',
  'flag': 'text-primary',
  'dim': 'text-muted',
  'success': 'text-success',
  'url': 'text-info',
  'metric-good': 'text-primary',
}

function lineMotion(index: number) {
  return {
    initial: { opacity: 0, x: -4 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, delay: 1.4 + index * 0.4 },
  }
}

function isPromptLine(line: TerminalLine) {
  return line.segments[0]?.style === 'prompt'
}

function lineClass(line: TerminalLine, index: number) {
  if (isPromptLine(line)) return index > 0 ? 'mt-4' : ''
  const prevIsPrompt = index > 0 && isPromptLine(lines[index - 1]!)
  return prevIsPrompt ? 'pl-4 mt-1' : 'pl-4'
}
</script>

<template>
  <TerminalWindow
    cwd="~/website"
    :added="12"
    :deleted="4"
    :modified="3"
    body-class="min-h-50 p-3 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-[1.7] sm:leading-[1.8] overflow-x-auto"
  >
    <Motion
      v-for="(line, lineIndex) in lines"
      :key="lineIndex"
      v-bind="lineMotion(lineIndex)"
      :class="lineClass(line, lineIndex)"
    >
      <span
        v-for="(segment, segIndex) in line.segments"
        :key="segIndex"
        :class="segmentStyles[segment.style]"
      >
        {{ segment.text }}
      </span>
    </Motion>
  </TerminalWindow>
</template>
