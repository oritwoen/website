# oritwoen.dev

My personal website.

Built with Nuxt 4, Nuxt UI 4, Nuxt Content. Deployed on Cloudflare Workers.

## Stack

- Nuxt 4 + Vue 3
- Nuxt UI 4 + Tailwind 4
- Nuxt Content (markdown blog, YAML data)
- `@nuxtjs/seo` (sitemap, robots, OG image, schema.org)
- Takumi + Satori for OG image rendering
- motion-v for animations
- Cloudflare Workers (nitro `cloudflare-module`)

## Develop

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```
