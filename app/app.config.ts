export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      warning: 'purple',
      neutral: 'zinc',
    },
    badge: {
      slots: {
        base: 'font-mono',
      },
    },
    button: {
      slots: {
        base: 'font-semibold transition-all duration-200',
      },
      variants: {
        size: {
          xs: { base: 'px-3' },
          sm: { base: 'px-4' },
          md: { base: 'px-4' },
          lg: { base: 'px-5' },
          xl: { base: 'px-6' },
        },
      },
      compoundVariants: [
        {
          color: 'primary' as const,
          variant: 'solid' as const,
          class: 'hover:bg-primary active:bg-primary shadow-[0_0_12px_var(--btn-glow)] hover:shadow-[0_0_20px_var(--btn-glow-hover)] hover:-translate-y-px active:translate-y-0 [--btn-glow:color-mix(in_oklch,var(--ui-primary)_15%,transparent)] [--btn-glow-hover:color-mix(in_oklch,var(--ui-primary)_25%,transparent)]',
        },
        {
          color: 'primary' as const,
          variant: 'soft' as const,
          class: 'shadow-[0_0_8px_var(--btn-soft-glow)] [--btn-soft-glow:color-mix(in_oklch,var(--ui-primary)_8%,transparent)]',
        },
      ],
    },
    header: {
      slots: {
        root: 'border-b border-default/50 backdrop-blur-lg bg-default/60',
      },
    },
    footer: {
      slots: {
        container: 'border-t border-default/30',
      },
    },
  },
})
