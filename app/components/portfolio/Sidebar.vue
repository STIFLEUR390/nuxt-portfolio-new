<script setup lang="ts">
const { loggedIn, user, logout } = useDirectusAuth()
const route = useRoute()
const toast = useAppToast()

const props = defineProps<{
  mobileOpen: boolean
}>()

const emit = defineEmits<{
  closeMobile: []
}>()

const links = [
  { label: 'Tableau de bord', icon: 'i-lucide-layout-dashboard', to: '/portfolio' },
  { label: 'Projets', icon: 'i-lucide-folder', to: '/portfolio/projects' },
  { label: 'Blog', icon: 'i-lucide-file-text', to: '/portfolio/blog' },
  { label: 'Services', icon: 'i-lucide-code', to: '/portfolio/services' },
  { label: 'Stack', icon: 'i-lucide-layer-stack', to: '/portfolio/stack' },
  { label: 'Expériences', icon: 'i-lucide-briefcase', to: '/portfolio/experience' },
  { label: 'Témoignages', icon: 'i-lucide-message-square-quote', to: '/portfolio/testimonials' },
  { label: 'FAQ', icon: 'i-lucide-circle-help', to: '/portfolio/faq' },
  { label: 'Pages SEO', icon: 'i-lucide-search', to: '/portfolio/pages' },
  { label: 'Paramètres', icon: 'i-lucide-settings', to: '/portfolio/settings' }
]

function isActive(link: string) {
  if (link === '/portfolio') return route.path === '/portfolio'
  return route.path.startsWith(link)
}

async function handleLogout() {
  await logout()
  toast.success('Déconnecté')
}

function closeMobile() {
  emit('closeMobile')
}
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-elevated border-r border-default transition-transform duration-200"
    :class="mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <div class="flex items-center gap-2 px-6 h-16 border-b border-default shrink-0">
      <UIcon
        name="i-lucide-user-cog"
        class="size-5 text-primary"
      />
      <span class="font-semibold text-sm text-highlighted">Portfolio</span>
    </div>

    <nav class="flex-1 overflow-y-auto p-3 space-y-1">
      <ULink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
        :class="isActive(link.to)
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted hover:text-highlighted hover:bg-elevated'"
        @click="closeMobile"
      >
        <UIcon
          :name="link.icon"
          class="size-4 shrink-0"
        />
        {{ link.label }}
      </ULink>
    </nav>

    <div class="p-3 border-t border-default shrink-0 space-y-2">
      <div class="px-3 py-2 text-xs text-muted truncate">
        {{ (user as any)?.email }}
      </div>
      <UButton
        label="Déconnexion"
        color="neutral"
        variant="soft"
        block
        size="sm"
        icon="i-lucide-log-out"
        @click="handleLogout"
      />
    </div>
  </aside>

  <div
    v-if="mobileOpen"
    class="fixed inset-0 z-40 bg-neutral-900/50 lg:hidden"
    @click="closeMobile"
  />
</template>
