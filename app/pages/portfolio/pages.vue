<script setup lang="ts">
definePageMeta({
  middleware: 'portfolio-auth',
  layout: 'portfolio'
})

const directus = useDirectus()
const toast = useAppToast()

const FIELDS = ['id', 'slug', 'title', 'description', 'seo_title', 'seo_description'] as const

const { data: pages, status, refresh } = useAsyncData('admin-pages', async () => {
  try {
    const result = await directus.request(readItems('pages' as const, {
      sort: ['slug'],
      fields: [...FIELDS]
    }))
    return (result || []) as any[]
  } catch {
    return [] as any[]
  }
})

const modalOpen = ref(false)
const editingPage = ref<any>(null)
const saving = ref(false)

const form = reactive({
  title: '',
  description: '',
  seo_title: '',
  seo_description: ''
})

function openModal(page: any) {
  editingPage.value = page
  form.title = page.title || ''
  form.description = page.description || ''
  form.seo_title = page.seo_title || ''
  form.seo_description = page.seo_description || ''
  modalOpen.value = true
}

async function save() {
  saving.value = true
  try {
    const payload = {
      title: form.title,
      description: form.description || null,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null
    }
    await directus.request(updateItem('pages' as const, editingPage.value.id, payload as any, { fields: [...FIELDS] } as any))
    toast.success('Page mise à jour')
    modalOpen.value = false
    await refresh()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-highlighted">Pages SEO</h1>
      <p class="text-sm text-muted mt-1">Modifiez les métadonnées SEO des pages du portfolio</p>
    </div>

    <UCard v-if="status === 'pending'" :ui="{ body: 'p-8' }">
      <div class="space-y-3">
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
      </div>
    </UCard>

    <UCard v-else-if="!pages?.length">
      <div class="text-center py-12 space-y-3">
        <UIcon name="i-lucide-search" class="size-10 text-muted mx-auto" />
        <p class="text-sm text-muted">Aucune page trouvée</p>
      </div>
    </UCard>

    <UCard v-else>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left py-3 px-4 text-muted font-medium">Slug</th>
              <th class="text-left py-3 px-4 text-muted font-medium">Titre</th>
              <th class="text-left py-3 px-4 text-muted font-medium">SEO Title</th>
              <th class="text-left py-3 px-4 text-muted font-medium">SEO Description</th>
              <th class="text-right py-3 px-4 text-muted font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="page in pages" :key="page.id" class="border-b border-default hover:bg-elevated/50 transition-colors">
              <td class="py-3 px-4">
                <UBadge color="neutral" variant="subtle" size="sm">{{ page.slug }}</UBadge>
              </td>
              <td class="py-3 px-4 font-medium text-highlighted truncate max-w-xs">{{ page.title }}</td>
              <td class="py-3 px-4 text-muted truncate max-w-xs">{{ page.seo_title || '—' }}</td>
              <td class="py-3 px-4 text-muted truncate max-w-sm">{{ page.seo_description || '—' }}</td>
              <td class="py-3 px-4 text-right">
                <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-pencil" @click="openModal(page)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <UModal v-model:open="modalOpen" :title="'SEO — /' + editingPage?.slug">
      <template #body>
        <UForm :state="form" class="space-y-5" @submit="save">
          <UFormField label="Titre de la page" name="title" required>
            <UInput v-model="form.title" placeholder="Titre affiché" class="w-full" />
          </UFormField>
          <UFormField label="Description" name="description">
            <UTextarea v-model="form.description" :rows="3" placeholder="Description de la page" class="w-full" />
          </UFormField>
          <hr class="border-default">
          <p class="text-xs text-muted font-medium">Métadonnées SEO</p>
          <UFormField label="SEO Title" name="seo_title" description="Balise title pour les moteurs de recherche">
            <UInput v-model="form.seo_title" placeholder="Titre SEO (optionnel)" class="w-full" />
          </UFormField>
          <UFormField label="SEO Description" name="seo_description" description="Meta description">
            <UTextarea v-model="form.seo_description" :rows="2" placeholder="Description SEO (optionnelle)" class="w-full" />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="neutral" variant="outline" @click="modalOpen = false" />
          <UButton label="Enregistrer" color="primary" :loading="saving" @click="save" />
        </div>
      </template>
    </UModal>
  </div>
</template>
