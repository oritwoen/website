<script setup lang="ts">
interface FeedItem {
  kind: 'blog'
  path: string
  title: string
  date: string
  meta?: string
}

const { data: items } = await useAsyncData('home-feed', async () => {
  const posts = await queryCollection('posts').order('date', 'DESC').limit(4).all()

  const feed: FeedItem[] = posts.map(p => ({
    kind: 'blog' as const,
    path: p.path!,
    title: p.title ?? '',
    date: typeof p.date === 'string' ? p.date : new Date(p.date).toISOString().slice(0, 10),
    meta: p.badge?.label
  }))

  return feed
})
</script>

<template>
  <div
    v-if="items?.length"
    class="-mt-24 sm:-mt-32 pb-20 sm:pb-24 relative z-10"
  >
    <Motion v-bind="enterMotion(0.1)">
      <TerminalWindow cwd="~/latest" label="tail" :modified="1">
          <div class="flex items-center gap-2 mb-5">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">tail</span>
            <span class="text-muted">-f</span>
            <span class="text-primary">~/latest</span>
            <span class="flex-1 border-t border-default/30 ml-3" />
            <NuxtLink
              to="/blog"
              class="text-dimmed hover:text-primary transition-colors text-[11px]"
            >
              ~/blog
            </NuxtLink>
            <span class="text-neutral text-[11px]">·</span>
            <NuxtLink
              to="/reports"
              class="text-dimmed hover:text-primary transition-colors text-[11px]"
            >
              ~/reports
            </NuxtLink>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Motion
              v-for="(item, i) in items"
              :key="item.path"
              v-bind="staggerMotion(i)"
            >
              <NuxtLink
                :to="item.path"
                class="group block h-full p-3 rounded-md border border-default/60 bg-default/40 hover:bg-accented/40 hover:border-primary/30 transition-all"
              >
                <div class="flex items-center gap-2 mb-2 text-[10px]">
                  <span
                    class="uppercase tracking-[0.08em]"
                    :class="item.kind === 'blog' ? 'text-info' : 'text-primary'"
                  >
                    [{{ item.kind }}]
                  </span>
                  <span class="text-dimmed tabular-nums">{{ item.date }}</span>
                </div>

                <div class="text-highlighted group-hover:text-primary transition-colors text-[12px] leading-snug line-clamp-3 mb-2">
                  {{ item.title }}
                </div>

                <div v-if="item.meta" class="flex items-center gap-1 text-[10px] text-dimmed">
                  <span class="text-neutral">→</span>
                  <span class="truncate">{{ item.meta }}</span>
                </div>
              </NuxtLink>
            </Motion>
          </div>

          <Motion v-bind="enterMotion(0.5)">
            <div class="mt-5 pt-4 border-t border-default/30 flex items-center gap-2 text-[11px]">
              <span class="text-neutral">$</span>
              <span class="text-muted">echo</span>
              <span class="text-dimmed">"{{ items.length }} items · sorted by date"</span>
              <span class="ml-2 inline-block w-[7px] h-[14px] bg-primary animate-pulse" />
            </div>
          </Motion>
        </TerminalWindow>
    </Motion>
  </div>
</template>
