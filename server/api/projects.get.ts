import { defineEventHandler } from 'h3'

interface RepoMeta {
  slug: string
  icon: string
  tags: string[]
  href: string
  role: 'owner' | 'contributor'
}

const repos: RepoMeta[] = [
  // Owned
  { slug: 'kangaroo', icon: 'i-lucide-cpu', tags: ['ECDLP', 'GPU', 'cryptography'], href: 'https://github.com/oritwoen/kangaroo', role: 'owner' },
  { slug: 'boha', icon: 'i-lucide-blocks', tags: ['blockchain', 'puzzles'], href: 'https://github.com/oritwoen/boha', role: 'owner' },
  { slug: 'omnichron', icon: 'i-lucide-archive', tags: ['web archives', 'search'], href: 'https://github.com/oritwoen/omnichron', role: 'owner' },
  { slug: 'gixa', icon: 'i-lucide-git-branch', tags: ['git', 'dev tooling'], href: 'https://github.com/oritwoen/gixa', role: 'owner' },
  { slug: 'vgen', icon: 'i-lucide-key', tags: ['crypto', 'GPU'], href: 'https://github.com/oritwoen/vgen', role: 'owner' },
  { slug: 'vuke', icon: 'i-lucide-shield-check', tags: ['ECDSA', 'cryptanalysis'], href: 'https://github.com/oritwoen/vuke', role: 'owner' },
  { slug: 'vusi', icon: 'i-lucide-bug', tags: ['ECDSA', 'security'], href: 'https://github.com/oritwoen/vusi', role: 'owner' },
  { slug: 'shaha', icon: 'i-lucide-database', tags: ['hash reversal', 'cryptography'], href: 'https://github.com/oritwoen/shaha', role: 'owner' },
  { slug: 'archex', icon: 'i-lucide-package', tags: ['Arch Linux', 'tooling'], href: 'https://github.com/oritwoen/archex', role: 'owner' },
  // Contributor
  { slug: 'nuxt', icon: 'i-lucide-frame', tags: ['Vue', 'framework'], href: 'https://github.com/nuxt/nuxt', role: 'contributor' },
  { slug: 'skilld', icon: 'i-lucide-wrench', tags: ['AI agents', 'tooling'], href: 'https://github.com/skilld-dev/skilld', role: 'contributor' },
  { slug: 'retriv', icon: 'i-lucide-search', tags: ['search', 'local-first'], href: 'https://github.com/skilld-dev/retriv', role: 'contributor' },
  { slug: 'nuxt-ui', icon: 'i-lucide-palette', tags: ['UI', 'components'], href: 'https://github.com/nuxt/ui', role: 'contributor' },
  { slug: 'nuxt-devtools', icon: 'i-lucide-bug', tags: ['devtools', 'DX'], href: 'https://github.com/nuxt/devtools', role: 'contributor' },
  { slug: 'unstorage', icon: 'i-lucide-hard-drive', tags: ['storage', 'unjs'], href: 'https://github.com/unjs/unstorage', role: 'contributor' },
]

function ownerRepoFromHref(href: string): string {
  return href.replace('https://github.com/', '')
}

export default defineEventHandler(async () => {
  const authHeaders = {
    'User-Agent': 'oritwoen-website',
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  }

  const userPromise = $fetch<{ public_repos: number, followers: number }>(
    'https://api.github.com/users/oritwoen',
    { headers: authHeaders },
  ).catch(() => null)

  const results = await Promise.all(
    repos.map(async (meta) => {
      try {
        const ownerRepo = ownerRepoFromHref(meta.href)
        const res = await $fetch<{
          stargazers_count: number
          language: string | null
          description: string | null
          owner: { login: string }
        }>(`https://api.github.com/repos/${ownerRepo}`, {
          headers: authHeaders,
        })

        return {
          slug: meta.slug,
          name: meta.slug === 'nuxt-ui' ? 'ui' : meta.slug === 'nuxt-devtools' ? 'devtools' : meta.slug,
          description: res.description || '',
          language: (res.language || 'unknown').toLowerCase(),
          icon: meta.icon,
          tags: meta.tags,
          stars: res.stargazers_count,
          href: meta.href,
          role: meta.role,
        }
      }
      catch {
        return {
          slug: meta.slug,
          name: meta.slug,
          description: '',
          language: 'unknown',
          icon: meta.icon,
          tags: meta.tags,
          stars: 0,
          href: meta.href,
          role: meta.role,
        }
      }
    }),
  )

  // Sort: owners first, then by stars
  results.sort((a, b) => {
    if (a.role !== b.role) return a.role === 'owner' ? -1 : 1
    return b.stars - a.stars
  })

  const user = await userPromise

  return {
    seo: {
      title: 'Projects — oritwoen',
      description: 'Open-source projects — crypto security, blockchain, dev tooling, Rust systems.',
    },
    headline: 'repos',
    title: 'open source',
    description: 'TypeScript, Rust, Vue, Python. Crypto security, blockchain infra, and the dev tooling that holds it together.',
    github: {
      publicRepos: user?.public_repos ?? null,
      followers: user?.followers ?? null,
    },
    items: results,
  }
})
