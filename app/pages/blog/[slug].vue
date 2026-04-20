<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('posts').path(route.path).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('posts', route.path, { fields: ['description'] }),
)

const title = post.value.seo?.title || post.value.title
const description = post.value.seo?.description || post.value.description

const publishedDate = post.value.date
  ? new Date(post.value.date).toISOString()
  : undefined
const authorName = post.value.authors?.[0]?.name ?? 'oritwoen'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'article',
  articlePublishedTime: publishedDate,
  articleAuthor: [authorName],
  articleTag: post.value.badge?.label ? [post.value.badge.label] : undefined,
  twitterTitle: title,
  twitterDescription: description,
})

useSchemaOrg([
  defineArticle({
    headline: title,
    description,
    datePublished: publishedDate,
    author: [{ '@id': 'https://oritwoen.dev#person' }],
    keywords: post.value.badge?.label ? [post.value.badge.label] : undefined,
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Blog', item: '/blog' },
      { name: title ?? 'Post' },
    ],
  }),
])

defineOgImage('Hero', {
  title: post.value.title ?? 'blog post',
  description: description ?? undefined,
  path: `~/blog/${route.params.slug}`,
  tag: post.value.badge?.label ?? 'blog',
  terminal: [
    { prompt: true, text: `cat ~/blog/${route.params.slug}.md`, color: 'accent' },
    { text: `title: ${post.value.title ?? ''}`, color: 'title' },
    { text: `date:  ${post.value.date ? new Date(post.value.date).toISOString().slice(0, 10) : ''}` },
    { text: `tag:   ${post.value.badge?.label ?? 'blog'}` },
    { text: `by:    ${post.value.authors?.[0]?.name ?? 'oritwoen'}` },
    { prompt: true, text: 'wc -w', color: 'accent' },
    { text: 'markdown post', color: 'success' },
  ],
})

const badges = computed(() =>
  post.value?.badge?.label ? [{ label: post.value.badge.label, tone: 'primary' as const }] : [],
)
</script>

<template>
  <div
    v-if="post"
    class="py-12 sm:py-16"
  >
    <div class="max-w-3xl mx-auto px-4">
      <EntryHeader
        back-to="/blog"
        back-label="back to blog"
        :path="`~/blog/${route.params.slug}`"
        :title="post.title ?? ''"
        :description="post.description"
        :date="post.date"
        :badges="badges"
        :author="post.authors?.[0]?.name || 'oritwoen'"
      />

      <EntryBody :value="post" />

      <EntrySurround :items="surround" />
    </div>
  </div>
</template>
