<script setup lang="ts">
interface TerminalLine {
  prompt?: boolean
  text: string
  color?: 'muted' | 'accent' | 'success' | 'title'
}

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  path?: string
  tag?: string
  terminal?: TerminalLine[]
}>(), {
  title: 'oritwoen',
  description: 'I break crypto and build the tools to do it. Blockchain since 2016, Rust systems, TypeScript tooling, Vue fullstack.',
  path: '~/.about',
  tag: 'ships code. breaks things. patches them back.',
  terminal: () => [],
})

const defaultTerminal: TerminalLine[] = [
  { prompt: true, text: 'neofetch --short', color: 'accent' },
  { text: 'user: oritwoen' },
  { text: 'stack: TypeScript / Rust / Vue', color: 'title' },
  { text: 'since: 2016 — Arch Linux, btw' },
  { prompt: true, text: 'cat /etc/motd', color: 'accent' },
  { text: '"if it compiles, ship it."', color: 'success' },
]

const lines = computed<TerminalLine[]>(() => props.terminal.length > 0 ? props.terminal : defaultTerminal)

function lineColor(line: TerminalLine) {
  if (line.color === 'success') return '#4ade80'
  if (line.color === 'accent') return '#fde68a'
  if (line.color === 'title') return '#fde68a'
  if (line.color === 'muted') return '#71717a'
  return '#d4d4d8'
}
</script>

<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      padding: 56px 64px;
      gap: 48px;
      background: #0f0d0a;
      background-image: radial-gradient(circle at 15% 20%, rgba(245, 158, 11, 0.28) 0%, transparent 55%), radial-gradient(circle at 90% 85%, rgba(245, 158, 11, 0.14) 0%, transparent 55%);
      font-family: Space Mono, monospace;
    "
  >
    <!-- Left column: text -->
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        gap: 24px;
      "
    >
      <!-- Pill -->
      <div style="display: flex;">
        <div
          style="
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 20px;
            border-radius: 999px;
            border: 1px solid rgba(245, 158, 11, 0.35);
            background: rgba(245, 158, 11, 0.08);
            color: #fbbf24;
            font-size: 20px;
          "
        >
          <div style="width: 10px; height: 10px; border-radius: 10px; background: #f59e0b;" />
          <span>{{ tag }}</span>
        </div>
      </div>

      <!-- Title -->
      <div
        style="
          font-family: Space Grotesk, sans-serif;
          font-weight: 700;
          font-size: 130px;
          line-height: 0.95;
          letter-spacing: -4px;
          color: #fde68a;
        "
      >
        {{ title }}
      </div>

      <!-- Description -->
      <div
        style="
          font-family: Space Grotesk, sans-serif;
          font-size: 26px;
          line-height: 1.4;
          color: #d4d4d8;
          max-width: 560px;
        "
      >
        {{ description }}
      </div>

      <!-- Buttons -->
      <div style="display: flex; gap: 12px; margin-top: 8px;">
        <div
          style="
            display: flex;
            align-items: center;
            padding: 14px 28px;
            border-radius: 10px;
            background: #f59e0b;
            color: #0f0d0a;
            font-family: Space Grotesk, sans-serif;
            font-weight: 700;
            font-size: 20px;
            box-shadow: 0 0 24px rgba(245, 158, 11, 0.35);
          "
        >
          GitHub
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            padding: 14px 28px;
            border-radius: 10px;
            background: rgba(39, 39, 42, 0.6);
            border: 1px solid rgba(245, 158, 11, 0.2);
            color: #d4d4d8;
            font-family: Space Grotesk, sans-serif;
            font-weight: 400;
            font-size: 20px;
          "
        >
          oritwoen.dev
        </div>
      </div>
    </div>

    <!-- Right column: terminal -->
    <div
      style="
        display: flex;
        flex-direction: column;
        width: 480px;
        border-radius: 16px;
        border: 1px solid rgba(245, 158, 11, 0.28);
        background: rgba(24, 24, 27, 0.72);
        box-shadow: 0 0 80px rgba(245, 158, 11, 0.18);
        overflow: hidden;
      "
    >
      <!-- Titlebar -->
      <div
        style="
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(245, 158, 11, 0.15);
        "
      >
        <div style="width: 12px; height: 12px; border-radius: 12px; background: #27272a; border: 1px solid #3f3f46;" />
        <div style="width: 12px; height: 12px; border-radius: 12px; background: #27272a; border: 1px solid #3f3f46;" />
        <div style="width: 12px; height: 12px; border-radius: 12px; background: #27272a; border: 1px solid #3f3f46;" />
        <div style="flex: 1;" />
        <div style="font-size: 14px; color: #71717a;">
          {{ path }}
        </div>
      </div>

      <!-- Body -->
      <div
        style="
          display: flex;
          flex-direction: column;
          padding: 24px 28px;
          gap: 8px;
          font-size: 18px;
          line-height: 1.6;
        "
      >
        <div
          v-for="(line, i) in lines"
          :key="i"
          :style="`display: flex; gap: 10px; ${line.prompt && i > 0 ? 'margin-top: 10px;' : ''}`"
        >
          <span
            v-if="line.prompt"
            style="color: #52525b;"
          >$</span>
          <span :style="`color: ${lineColor(line)};`">
            {{ line.text }}
          </span>
        </div>

        <div style="display: flex; align-items: center; gap: 6px; margin-top: 14px;">
          <span style="color: #52525b;">$</span>
          <div style="width: 10px; height: 18px; background: #f59e0b;" />
        </div>
      </div>
    </div>
  </div>
</template>
