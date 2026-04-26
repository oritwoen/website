<script setup lang="ts">
const contactDescription = 'Email, GitHub, X, Bluesky, Farcaster, Telegram, Discord. Open for work on crypto security, blockchain infra, and dev tooling.'

useSeoMeta({
  title: 'Contact',
  description: contactDescription,
  ogTitle: 'Contact',
  ogDescription: contactDescription,
})

useSchemaOrg([
  defineWebPage({ '@type': 'ContactPage' }),
  defineBreadcrumb({ itemListElement: [{ name: 'Contact', item: '/contact' }] }),
])

defineOgImage('Hero', {
  title: 'contact',
  description: 'Email, GitHub, X, Bluesky, Farcaster, Telegram, Discord. Open for interesting problems.',
  path: '~/.contact',
  tag: 'drop a line.',
  terminal: [
    { prompt: true, text: 'cat ~/.contact', color: 'accent' },
    { text: 'email:    hello@oritwoen.dev', color: 'title' },
    { text: 'github:   @oritwoen', color: 'title' },
    { text: 'x:        @oritwoen', color: 'title' },
    { text: 'bluesky:  @oritwoen.dev', color: 'title' },
    { text: 'farcaster:@oritwoen', color: 'title' },
    { text: 'telegram: @oritwoen', color: 'title' },
    { text: 'discord:  @oritwoen', color: 'title' },
    { prompt: true, text: 'echo "open for"', color: 'accent' },
    { text: 'crypto security · blockchain infra · dev tooling', color: 'success' },
  ],
})

const contacts = [
  {
    label: 'email',
    value: 'hello@oritwoen.dev',
    href: 'mailto:hello@oritwoen.dev',
    icon: 'i-lucide-mail',
  },
  {
    label: 'github',
    value: 'oritwoen',
    href: 'https://github.com/oritwoen',
    icon: 'i-simple-icons-github',
  },
  {
    label: 'x',
    value: '@oritwoen',
    href: 'https://x.com/oritwoen',
    icon: 'i-simple-icons-x',
  },
  {
    label: 'bluesky',
    value: '@oritwoen.dev',
    href: 'https://bsky.app/profile/oritwoen.dev',
    icon: 'i-simple-icons-bluesky',
  },
  {
    label: 'farcaster',
    value: '@oritwoen',
    href: 'https://farcaster.xyz/oritwoen',
    icon: 'i-simple-icons-farcaster',
  },
  {
    label: 'telegram',
    value: '@oritwoen',
    href: 'https://t.me/oritwoen',
    icon: 'i-simple-icons-telegram',
  },
  {
    label: 'discord',
    value: '@oritwoen',
    href: 'https://discord.com/users/oritwoen',
    icon: 'i-simple-icons-discord',
  },
]
</script>

<template>
  <div class="py-12 sm:py-32">
    <div class="max-w-2xl mx-auto px-4">
      <Motion v-bind="enterMotion(0.1)">
        <TerminalWindow cwd="~/.contact">
          <div class="mb-4">
            <span class="text-neutral">$ </span>
            <span class="text-highlighted">cat</span>
            <span class="text-primary"> ~/.contact</span>
          </div>

          <div
            v-for="(item, index) in contacts"
            :key="item.label"
            class="mb-1"
          >
            <Motion v-bind="enterMotion(0.3 + index * 0.15)">
              <div class="flex items-center gap-3 group">
                <span class="text-neutral w-16 shrink-0">{{ item.label }}</span>
                <span class="text-neutral">→</span>
                <a
                  :href="item.href"
                  target="_blank"
                  class="text-primary hover:text-primary-300 transition-colors duration-200 flex items-center gap-2"
                >
                  <UIcon
                    :name="item.icon"
                    class="size-4"
                  />
                  {{ item.value }}
                </a>
              </div>
            </Motion>
          </div>

          <Motion v-bind="enterMotion(0.8)">
            <div class="mt-6 pt-4 border-t border-default/40">
              <span class="text-neutral">$ </span>
              <span class="text-highlighted">echo</span>
              <span class="text-muted"> "always open for interesting problems"</span>
            </div>
          </Motion>
        </TerminalWindow>
      </Motion>
    </div>
  </div>
</template>
