<script setup lang="ts">
definePageMeta({
  middleware: 'portfolio-auth',
  layout: 'portfolio'
})

const directus = useDirectus()
const toast = useAppToast()

async function fetchCount(collection: string, filter?: any) {
  const query: any = { aggregate: { count: '*' } }
  if (filter) query.filter = filter
  return (directus.request as any)((readItems as any)(collection, query)).catch(() => null)
}

const { data: counts, error } = await useAsyncData('admin-stats', async () => {
  const [projects, posts, services, testimonials] = await Promise.all([
    fetchCount('projects'),
    fetchCount('blog_posts', { status: { _eq: 'published' } }),
    fetchCount('services'),
    fetchCount('testimonials')
  ])

  function extractCount(agg: any): number {
    if (!agg?.[0]?.count) return 0
    const c = agg[0].count
    if (typeof c === 'object' && c !== null) return Number(c.id) || 0
    return Number(c) || 0
  }

  return {
    projects: extractCount(projects),
    blog: extractCount(posts),
    services: extractCount(services),
    testimonials: extractCount(testimonials)
  }
})

if (error.value) {
  toast.error('Erreur', 'Impossible de charger les statistiques')
}

const cards = computed(() => [
  { label: 'Projets', value: counts.value?.projects ?? '—', icon: 'i-lucide-folder', to: '/portfolio/projects', color: 'primary' as const },
  { label: 'Articles blog', value: counts.value?.blog ?? '—', icon: 'i-lucide-file-text', to: '/portfolio/blog', color: 'info' as const },
  { label: 'Services', value: counts.value?.services ?? '—', icon: 'i-lucide-code', to: '/portfolio/services', color: 'success' as const },
  { label: 'Témoignages', value: counts.value?.testimonials ?? '—', icon: 'i-lucide-message-square-quote', to: '/portfolio/testimonials', color: 'warning' as const }
])

const sectionLinks = [
  { label: 'Stack technique', icon: 'i-lucide-layers', to: '/portfolio/stack', description: 'Catégories et technologies' },
  { label: 'Expériences', icon: 'i-lucide-briefcase', to: '/portfolio/experience', description: 'Parcours professionnel' },
  { label: 'FAQ', icon: 'i-lucide-circle-help', to: '/portfolio/faq', description: 'Questions fréquentes' },
  { label: 'Pages SEO', icon: 'i-lucide-search', to: '/portfolio/pages', description: 'Métadonnées des pages' },
  { label: 'Paramètres', icon: 'i-lucide-settings', to: '/portfolio/settings', description: 'Configuration globale' }
]
</script>

<template>
  <div class="space-y-10">
    <div>
      <h1 class="text-2xl font-bold text-highlighted">
        Tableau de bord
      </h1>
      <p class="text-sm text-muted mt-1">
        Gérez le contenu de votre portfolio
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <UCard
        v-for="card in cards"
        :key="card.label"
        :ui="{ header: 'p-4', body: 'px-4 pb-4' } as any"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-muted">
              {{ card.label }}
            </span>
            <UIcon
              :name="card.icon"
              class="size-4"
              :class="`text-${card.color}`"
            />
          </div>
        </template>
        <div class="text-3xl font-bold text-highlighted">
          {{ card.value }}
        </div>
      </UCard>
    </div>

    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-highlighted">
        Gestion du contenu
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        <UCard
          v-for="link in sectionLinks"
          :key="link.to"
          :to="link.to"
          :ui="{ body: 'p-4' } as any"
          class="hover:bg-elevated/50 transition-colors cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <div class="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <UIcon
                :name="link.icon"
                class="size-4 text-primary"
              />
            </div>
            <div class="min-w-0">
              <p class="text-sm font-medium text-highlighted truncate">
                {{ link.label }}
              </p>
              <p class="text-xs text-muted truncate">
                {{ link.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
