<script setup lang="ts">
const blogDescription = 'Notes on crypto, Rust, Nuxt, and dev tooling. Writing things down so I do not forget.'

useSeoMeta({
  title: 'Blog',
  description: blogDescription,
  ogTitle: 'Blog',
  ogDescription: blogDescription,
})

useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage' }),
  defineBreadcrumb({ itemListElement: [{ name: 'Blog', item: '/blog' }] }),
])

defineOgImage('Hero', {
  title: 'blog',
  description: 'Notes on crypto, Rust, Nuxt. Writing things down so I do not forget.',
  path: '~/blog',
  tag: 'write once. reference forever.',
  terminal: [
    { prompt: true, text: 'ls ~/blog --reverse', color: 'accent' },
    { text: 'ai-agent-toolchain.md', color: 'title' },
    { text: 'ecdsa-nonce-reuse.md', color: 'title' },
    { text: 'gpu-kangaroo-rust.md', color: 'title' },
    { prompt: true, text: 'cat topics', color: 'accent' },
    { text: 'crypto, Rust, Nuxt, tooling' },
    { prompt: true, text: 'echo "rss"', color: 'accent' },
    { text: '/rss.xml', color: 'success' },
  ],
})

const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('posts').order('date', 'DESC').all(),
)
</script>

<template>
  <div class="py-12 sm:py-32">
    <div class="max-w-3xl mx-auto px-4">
      <Motion v-bind="enterMotion(0.1)">
        <TerminalWindow
          cwd="~/blog"
          :added="1"
        >
          <div class="mb-6">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">ls</span>
            <span class="text-primary"> ~/blog</span>
            <span class="text-muted"> --reverse</span>
          </div>

          <div v-if="posts">
            <Motion
              v-for="(post, index) in posts"
              :key="post.path"
              v-bind="staggerMotion(index)"
            >
              <NuxtLink
                :to="post.path"
                class="block mb-3 group"
              >
                <div class="flex items-start gap-3 hover:bg-accented/50 rounded-lg p-2 -mx-2 transition-colors duration-200">
                  <span class="text-primary shrink-0 w-20">
                    {{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short' }) }}
                  </span>
                  <span class="text-neutral">│</span>
                  <div class="flex-1">
                    <div class="text-highlighted group-hover:text-primary transition-colors duration-200">
                      {{ post.title }}
                    </div>
                    <div class="text-muted text-[12px] mt-0.5">
                      {{ post.description }}
                    </div>
                    <div class="mt-1">
                      <span class="text-primary text-[11px] uppercase tracking-[0.12em]">
                        {{ post.badge?.label }}
                      </span>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </Motion>
          </div>

          <div
            v-else
            class="text-muted"
          >
            no posts yet.
          </div>
        </TerminalWindow>
      </Motion>
    </div>
  </div>
</template>
