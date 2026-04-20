<script setup lang="ts">
withDefaults(defineProps<{
  user?: string
  host?: string
  app?: string
  appIcon?: string
  editor?: string
  editorIcon?: string
  desktop?: string
  desktopIcon?: string
  cwd?: string
  branch?: string
  added?: number
  deleted?: number
  modified?: number
  runtime?: { icon: string, version: string, color?: string }
}>(), {
  user: 'oritwoen',
  host: 'arch',
  app: 'ghostty',
  appIcon: 'i-simple-icons-ghostty',
  editor: 'nvim',
  editorIcon: 'i-simple-icons-neovim',
  desktop: 'gnome',
  desktopIcon: 'i-simple-icons-gnome',
  cwd: '~/website',
  branch: 'main',
  added: 0,
  deleted: 0,
  modified: 0,
  runtime: () => ({ icon: 'i-simple-icons-nodedotjs', version: 'v25.0.0', color: 'text-success' })
})
</script>

<template>
  <div class="border-b border-default">
    <!-- Row 1: Ghostty tab strip + window controls -->
    <div class="flex items-center gap-1 px-2 py-1.5 font-mono text-[12px]">
      <!-- New tab + dropdown (decorative) -->
      <button
        class="flex items-center justify-center size-6 rounded-md text-dimmed hover:text-default hover:bg-default/40 transition-colors"
        aria-label="New tab"
      >
        <UIcon name="i-lucide-plus" class="size-3.5" />
      </button>
      <button
        class="flex items-center justify-center size-6 rounded-md text-dimmed hover:text-default hover:bg-default/40 transition-colors"
        aria-label="Recent tabs"
      >
        <UIcon name="i-lucide-chevron-down" class="size-3.5" />
      </button>

      <!-- Active tab pill -->
      <div
        class="flex-1 mx-1 flex items-center gap-2 px-3 py-1 rounded-md bg-default/50 border border-default/60 min-w-0"
      >
        <span class="size-2 rounded-full bg-success shadow-[0_0_6px_var(--ui-success)] shrink-0" />
        <span class="text-muted truncate hidden sm:inline">{{ user }}</span>
        <span class="text-neutral hidden sm:inline">@</span>
        <span class="text-muted truncate hidden sm:inline">{{ host }}</span>
        <span class="text-neutral hidden sm:inline">:</span>
        <span class="text-info truncate min-w-0">{{ cwd }}</span>
        <div class="flex-1" />
        <span class="text-dimmed/70 text-[10px] shrink-0 hidden sm:inline">nvim</span>
        <button
          class="flex items-center justify-center size-4 rounded text-neutral hover:text-default hover:bg-default/60 transition-colors shrink-0"
          aria-label="Close tab"
        >
          <UIcon name="i-lucide-x" class="size-3" />
        </button>
      </div>

      <!-- Window controls -->
      <div class="flex items-center gap-0.5">
        <button
          class="hidden sm:flex items-center justify-center size-6 rounded-md text-dimmed hover:text-default hover:bg-default/40 transition-colors"
          aria-label="Split pane"
        >
          <UIcon name="i-lucide-columns-2" class="size-3.5" />
        </button>
        <button
          class="hidden sm:flex items-center justify-center size-6 rounded-md text-dimmed hover:text-default hover:bg-default/40 transition-colors"
          aria-label="Menu"
        >
          <UIcon name="i-lucide-menu" class="size-3.5" />
        </button>
        <button
          class="flex items-center justify-center size-6 rounded-md text-dimmed hover:text-error hover:bg-error/15 transition-colors"
          aria-label="Close"
        >
          <UIcon name="i-lucide-x" class="size-3.5" />
        </button>
      </div>
    </div>

    <!-- Row 2: starship prompt (runs as first line inside the shell) -->
    <div class="flex items-center gap-x-2 gap-y-1 px-3 py-2 font-mono text-[11px] sm:text-[12px] border-t border-default/40 sm:px-6 flex-wrap">
      <span class="flex items-center gap-1 text-info">
        <UIcon name="i-lucide-folder" class="size-3" />
        <span>{{ cwd }}</span>
      </span>
      <span class="text-neutral">│</span>
      <span class="flex items-center gap-1 text-primary">
        <UIcon name="i-lucide-git-branch" class="size-3" />
        <span>{{ branch }}</span>
      </span>
      <span v-if="added > 0" class="text-success tabular-nums">+{{ added }}</span>
      <span v-if="deleted > 0" class="text-error tabular-nums">-{{ deleted }}</span>
      <span v-if="modified > 0" class="flex items-center gap-0.5 text-warning">
        <UIcon name="i-lucide-pencil" class="size-3" />
        <span class="tabular-nums">{{ modified }}</span>
      </span>
      <span class="text-neutral hidden sm:inline">│</span>
      <span class="hidden sm:flex items-center gap-1" :class="runtime.color ?? 'text-success'">
        <UIcon :name="runtime.icon" class="size-3" />
        <span>{{ runtime.version }}</span>
      </span>
      <span class="text-neutral hidden md:inline">│</span>
      <span class="hidden md:flex items-center gap-1 text-dimmed">
        <UIcon :name="editorIcon" class="size-3 text-success" />
        <span>{{ editor }}</span>
      </span>

      <span
        class="ml-auto hidden sm:flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.1em] bg-success/15 text-success border border-success/30"
      >
        normal
      </span>
      <span class="ml-auto sm:ml-0 inline-block w-[6px] h-[12px] bg-success animate-pulse" />
    </div>
  </div>
</template>
