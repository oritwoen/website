<script setup lang="ts">
const { data: projects } = await useFetch('/api/projects')

const projectsDescription = 'Open-source projects — Rust crypto tools, TypeScript libraries, Vue/Nuxt apps. ECDLP solvers, hash reversal, blockchain infra, dev tooling.'

useSeoMeta({
  title: 'Projects',
  description: projectsDescription,
  ogTitle: 'Projects',
  ogDescription: projectsDescription
})

useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage' }),
  defineBreadcrumb({ itemListElement: [{ name: 'Projects', item: '/projects' }] })
])

defineOgImage('Hero', {
  title: 'projects',
  description: 'Open-source projects across Rust, TypeScript, Vue. Crypto tools, blockchain infra, dev tooling.',
  path: '~/projects',
  tag: 'fork something interesting.',
  terminal: [
    { prompt: true, text: 'ls ~/projects --sort=stars', color: 'accent' },
    { text: 'kangaroo  — Pollard ECDLP, GPU', color: 'title' },
    { text: 'boha      — crypto puzzles DB', color: 'title' },
    { text: 'vuke      — weak BTC key recovery', color: 'title' },
    { text: 'vgen      — vanity addr, GPU', color: 'title' },
    { prompt: true, text: 'git remote -v', color: 'accent' },
    { text: 'github.com/oritwoen', color: 'success' }
  ]
})

const langColors: Record<string, string> = {
  rust: 'text-orange-400',
  typescript: 'text-blue-400',
  python: 'text-green-400'
}

const ownedProjects = computed(() => projects.value?.items?.filter((p: any) => p.role === 'owner') ?? [])
const contributedProjects = computed(() => projects.value?.items?.filter((p: any) => p.role === 'contributor') ?? [])

const stats = computed(() => {
  const items = (projects.value?.items ?? []) as any[]
  if (items.length === 0) return null

  const langs: Record<string, number> = {}
  for (const p of items) if (p.language) langs[p.language] = (langs[p.language] || 0) + 1
  const topLang = Object.entries(langs).sort((a, b) => b[1] - a[1])[0]

  const ownedStars = ownedProjects.value.reduce((sum: number, p: any) => sum + (p.stars ?? 0), 0)
  const topRepo = [...ownedProjects.value].sort((a: any, b: any) => (b.stars ?? 0) - (a.stars ?? 0))[0]

  return {
    owned: ownedProjects.value.length,
    contributed: contributedProjects.value.length,
    ownedStars,
    languages: Object.keys(langs).length,
    topLang: topLang ? { name: topLang[0], count: topLang[1] } : null,
    topRepo: topRepo ? { name: topRepo.name, stars: topRepo.stars } : null
  }
})
</script>

<template>
  <div class="py-12 sm:py-32">
    <div class="max-w-4xl mx-auto px-4">
      <Motion v-bind="enterMotion(0.1)">
        <TerminalWindow cwd="~/projects" :added="8" :modified="5">
          <div v-if="projects && stats">
            <!-- Stats header -->
            <div class="mb-6">
              <div class="mb-4">
                <span class="text-neutral">$ </span>
                <span class="text-highlighted">stat</span>
                <span class="text-primary"> ~/projects</span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <Motion v-bind="staggerMotion(0)">
                  <StatCard label="public repos" color="primary">
                    {{ projects?.github?.publicRepos ?? '—' }}
                  </StatCard>
                </Motion>
                <Motion v-bind="staggerMotion(1)">
                  <StatCard label="mine / contrib" color="muted">
                    {{ stats.owned }}<span class="text-dimmed text-base">/{{ stats.contributed }}</span>
                  </StatCard>
                </Motion>
                <Motion v-bind="staggerMotion(2)">
                  <StatCard label="★ own" color="info">
                    {{ stats.ownedStars }}
                  </StatCard>
                </Motion>
                <Motion v-bind="staggerMotion(3)">
                  <StatCard label="languages" color="highlighted">
                    {{ stats.languages }}
                  </StatCard>
                </Motion>
              </div>

              <div class="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-dimmed">
                <span v-if="stats.topLang">
                  <span class="text-neutral">→</span>
                  top lang
                  <span class="text-primary">{{ stats.topLang.name }}</span>
                  <span class="text-muted">({{ stats.topLang.count }} repos)</span>
                </span>
                <span v-if="stats.topRepo">
                  <span class="text-neutral">→</span>
                  top repo
                  <span class="text-primary">{{ stats.topRepo.name }}</span>
                  <span class="text-muted">({{ stats.topRepo.stars }} ★)</span>
                </span>
              </div>
            </div>

            <!-- Own projects -->
            <div class="mb-2 pt-4 border-t border-default/40">
              <span class="text-neutral">$ </span>
              <span class="text-highlighted">ls</span>
              <span class="text-primary"> ~/projects</span>
              <span class="text-muted"> --mine --sort=stars</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <Motion
                v-for="(project, index) in ownedProjects"
                :key="project.slug"
                v-bind="staggerMotion(index)"
              >
                <RepoCard :project="project" :lang-colors="langColors" />
              </Motion>
            </div>

            <!-- Contributions -->
            <div class="mb-2">
              <span class="text-neutral">$ </span>
              <span class="text-highlighted">ls</span>
              <span class="text-primary"> ~/contributions</span>
              <span class="text-muted"> --sort=stars</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Motion
                v-for="(project, index) in contributedProjects"
                :key="project.slug"
                v-bind="staggerMotion(index)"
              >
                <RepoCard :project="project" :lang-colors="langColors" />
              </Motion>
            </div>

            <!-- Footer -->
            <Motion v-bind="enterMotion(0.8)">
              <div class="mt-6 pt-4 border-t border-default/40">
                <span class="text-neutral">$ </span>
                <span class="text-highlighted">echo</span>
                <span class="text-muted"> "full source on"</span>
                <span class="text-neutral"> </span>
                <a
                  href="https://github.com/oritwoen"
                  target="_blank"
                  class="text-primary hover:text-primary-300 transition-colors duration-200 underline underline-offset-4"
                >github.com/oritwoen</a>
              </div>
            </Motion>
          </div>
        </TerminalWindow>
      </Motion>
    </div>
  </div>
</template>
