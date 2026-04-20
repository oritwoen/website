<script setup lang="ts">
interface Project {
  slug: string
  name: string
  description: string
  language: string
  icon: string
  tags: string[]
  stars: number
  href: string
  role: 'owner' | 'contributor'
}

defineProps<{
  project: Project
  langColors?: Record<string, string>
}>()
</script>

<template>
  <a
    :href="project.href"
    target="_blank"
    rel="noopener noreferrer"
    class="block rounded-lg border border-default/60 bg-default/40 hover:bg-accented/30 hover:border-primary/30 transition-all duration-200 p-4 group"
  >
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <UIcon
          :name="project.icon"
          class="size-4 text-primary shrink-0"
        />
        <span class="text-highlighted group-hover:text-primary transition-colors duration-200 text-sm">
          {{ project.name }}
        </span>
        <span
          v-if="project.role === 'contributor'"
          class="text-[10px] text-dimmed bg-accented/40 px-1.5 py-0.5 rounded"
        >
          contributor
        </span>
      </div>
      <div class="flex items-center gap-1 text-dimmed text-[11px]">
        <span class="text-primary">★</span>
        {{ project.stars }}
      </div>
    </div>
    <p class="text-muted text-[12px] leading-relaxed mb-3 line-clamp-2">
      {{ project.description }}
    </p>
    <div class="flex items-center gap-2 flex-wrap">
      <span
        class="text-[11px] uppercase tracking-[0.1em]"
        :class="langColors?.[project.language] || 'text-dimmed'"
      >
        {{ project.language }}
      </span>
      <template
        v-for="tag in project.tags.slice(0, 2)"
        :key="tag"
      >
        <span class="text-[11px] text-dimmed bg-accented/50 px-1.5 py-0.5 rounded">
          {{ tag }}
        </span>
      </template>
    </div>
  </a>
</template>
