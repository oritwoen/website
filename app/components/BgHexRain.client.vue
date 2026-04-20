<script setup lang="ts">
// Minimal tech-stack orbit — corner accent, brand-colored icons with gentle drift
interface Orb {
  icon: string
  color: string
  // percent coords inside the container
  x: number
  y: number
  size: string
  // animation stagger
  delay: string
  duration: string
}

const orbs: Orb[] = [
  { icon: 'i-simple-icons-typescript',  color: '#3178C6', x: 15, y: 12, size: 'size-5', delay: '0s',    duration: '11s' },
  { icon: 'i-simple-icons-rust',        color: '#DEA584', x: 62, y: 18, size: 'size-6', delay: '-2s',   duration: '14s' },
  { icon: 'i-simple-icons-vuedotjs',    color: '#4FC08D', x: 38, y: 32, size: 'size-5', delay: '-5s',   duration: '9s'  },
  { icon: 'i-simple-icons-nuxtdotjs',   color: '#00DC82', x: 82, y: 44, size: 'size-6', delay: '-3.5s', duration: '13s' },
  { icon: 'i-simple-icons-python',      color: '#3776AB', x: 8,  y: 58, size: 'size-5', delay: '-7s',   duration: '10s' },
  { icon: 'i-simple-icons-archlinux',   color: '#1793D1', x: 48, y: 62, size: 'size-5', delay: '-4s',   duration: '12s' },
  { icon: 'i-simple-icons-neovim',      color: '#57A143', x: 74, y: 74, size: 'size-5', delay: '-6s',   duration: '15s' },
  { icon: 'i-simple-icons-cloudflare',  color: '#F38020', x: 28, y: 80, size: 'size-6', delay: '-1s',   duration: '11s' },
  { icon: 'i-simple-icons-bitcoin',     color: '#F7931A', x: 58, y: 88, size: 'size-5', delay: '-8s',   duration: '13s' },
  { icon: 'i-simple-icons-ethereum',    color: '#627EEA', x: 90, y: 20, size: 'size-5', delay: '-2.5s', duration: '10s' },
  { icon: 'i-simple-icons-solana',      color: '#14F195', x: 6,  y: 88, size: 'size-5', delay: '-9s',   duration: '12s' }
]
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none fixed bottom-0 right-0 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] hidden md:block"
    style="z-index: 0;"
  >
    <span
      v-for="(o, i) in orbs"
      :key="i"
      class="absolute bg-orb opacity-[0.14]"
      :style="{
        top: `${o.y}%`,
        left: `${o.x}%`,
        color: o.color,
        animationDelay: o.delay,
        animationDuration: o.duration
      }"
    >
      <UIcon :name="o.icon" :class="o.size" />
    </span>
  </div>
</template>

<style scoped>
.bg-orb {
  animation-name: orb-drift;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}

@keyframes orb-drift {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.14;
  }
  33% {
    transform: translate(6px, -4px);
    opacity: 0.22;
  }
  66% {
    transform: translate(-4px, 5px);
    opacity: 0.10;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bg-orb {
    animation: none;
    opacity: 0.14;
  }
}
</style>
