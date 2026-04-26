<script setup lang="ts">
import { motion } from 'motion-v'
import type { VariantType } from 'motion-v'

const route = useRoute()

const links = [
  { label: 'What', to: '/what' },
  { label: 'Projects', to: '/projects' },
  { label: 'Reports', to: '/reports' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const items = computed(() =>
  links.map(l => ({
    ...l,
    active: route.path === l.to || route.path.startsWith(`${l.to}/`),
  })),
)

const variants: Record<string, VariantType | ((custom: unknown) => VariantType)> = {
  normal: {
    rotate: 0,
    y: 0,
    opacity: 1,
  },
  close: (custom: unknown) => {
    const c = custom as number
    return {
      rotate: c === 1 ? 45 : c === 3 ? -45 : 0,
      y: c === 1 ? 6 : c === 3 ? -6 : 0,
      opacity: c === 2 ? 0 : 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    }
  },
}
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="h-6 w-auto shrink-0" />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        class="hidden lg:flex"
        to="https://github.com/oritwoen"
        target="_blank"
        aria-label="GitHub"
      />
      <UButton
        icon="i-simple-icons-x"
        color="neutral"
        variant="ghost"
        class="hidden lg:flex"
        to="https://x.com/oritwoen"
        target="_blank"
        aria-label="X"
      />
      <UButton
        icon="i-simple-icons-bluesky"
        color="neutral"
        variant="ghost"
        class="hidden lg:flex"
        to="https://bsky.app/profile/oritwoen.dev"
        target="_blank"
        aria-label="Bluesky"
      />
      <UButton
        icon="i-simple-icons-farcaster"
        color="neutral"
        variant="ghost"
        class="hidden lg:flex"
        to="https://farcaster.xyz/oritwoen"
        target="_blank"
        aria-label="Farcaster"
      />
    </template>

    <template #toggle="{ open, toggle, ui }">
      <UButton
        size="sm"
        variant="ghost"
        color="neutral"
        square
        :aria-label="open ? 'Close navigation' : 'Open navigation'"
        :aria-expanded="open"
        :class="ui.toggle({ toggleSide: 'right' })"
        @click="toggle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <motion.line
            x1="4"
            y1="6"
            x2="20"
            y2="6"
            :variants="variants"
            :animate="open ? 'close' : 'normal'"
            :custom="1"
            class="outline-none"
          />
          <motion.line
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            :variants="variants"
            :animate="open ? 'close' : 'normal'"
            :custom="2"
            class="outline-none"
          />
          <motion.line
            x1="4"
            y1="18"
            x2="20"
            y2="18"
            :variants="variants"
            :animate="open ? 'close' : 'normal'"
            :custom="3"
            class="outline-none"
          />
        </svg>
      </UButton>
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
      />

      <div class="mt-4 flex flex-col gap-2">
        <UButton
          icon="i-simple-icons-github"
          label="GitHub"
          color="neutral"
          variant="soft"
          block
          to="https://github.com/oritwoen"
          target="_blank"
        />
        <UButton
          icon="i-simple-icons-x"
          label="X"
          color="neutral"
          variant="soft"
          block
          to="https://x.com/oritwoen"
          target="_blank"
        />
        <UButton
          icon="i-simple-icons-bluesky"
          label="Bluesky"
          color="neutral"
          variant="soft"
          block
          to="https://bsky.app/profile/oritwoen.dev"
          target="_blank"
        />
        <UButton
          icon="i-simple-icons-farcaster"
          label="Farcaster"
          color="neutral"
          variant="soft"
          block
          to="https://farcaster.xyz/oritwoen"
          target="_blank"
        />
      </div>
    </template>
  </UHeader>
</template>
