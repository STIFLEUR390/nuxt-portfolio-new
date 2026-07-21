<script setup lang="ts">
definePageMeta({
  middleware: 'portfolio-auth',
  layout: 'portfolio'
})

const directus = useDirectus()
const toast = useAppToast()

const FIELDS = ['id', 'title', 'description', 'icon', 'sort'] as const

const { data: services, status, refresh } = useAsyncData('admin-services', async () => {
  try {
    const result = await directus.request(readItems('services' as const, {
      sort: ['sort'],
      fields: [...FIELDS]
    }))
    return (result || []) as any[]
  } catch {
    return [] as any[]
  }
})

const modalOpen = ref(false)
const editingItem = ref<any>(null)
const saving = ref(false)

const form = reactive({
  title: '',
  description: '',
  icon: '',
  sort: 0
})

const deleteConfirm = reactive({
  open: false,
  label: '',
  loading: false,
  run: null as (() => Promise<void>) | null,
})

function askDelete(label: string, fn: () => Promise<void>) {
  deleteConfirm.label = label
  deleteConfirm.loading = false
  deleteConfirm.run = fn
  deleteConfirm.open = true
}

async function execDelete() {
  if (!deleteConfirm.run) return
  deleteConfirm.loading = true
  try {
    await deleteConfirm.run()
    deleteConfirm.open = false
  } finally {
    deleteConfirm.loading = false
  }
}

function resetForm() {
  editingItem.value = null
  form.title = ''
  form.description = ''
  form.icon = ''
  form.sort = 0
}

async function save() {
  saving.value = true
  try {
    const payload = { title: form.title, description: form.description || null, icon: form.icon || null, sort: Number(form.sort) }
    if (editingItem.value) {
      await directus.request(updateItem('services' as const, editingItem.value.id, payload as any, { fields: [...FIELDS] } as any))
      toast.success('Service mis à jour')
    } else {
      await directus.request(createItem('services' as const, payload as any, { fields: [...FIELDS] } as any))
      toast.success('Service créé')
    }
    modalOpen.value = false
    await refresh()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  } finally {
    saving.value = false
  }
}

async function doDelete(id: number) {
  await directus.request(deleteItem('services' as const, id))
  toast.success('Service supprimé')
  await refresh()
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Services</h1>
        <p class="text-sm text-muted mt-1">Gérez les services du portfolio</p>
      </div>
      <UButton label="Nouveau service" color="primary" icon="i-lucide-plus" @click="resetForm(); modalOpen = true" />
    </div>

    <UCard v-if="status === 'pending'" :ui="{ body: 'p-8' }">
      <div class="space-y-3">
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
      </div>
    </UCard>

    <UCard v-else-if="!services?.length">
      <div class="text-center py-12 space-y-3">
        <UIcon name="i-lucide-code" class="size-10 text-muted mx-auto" />
        <p class="text-sm text-muted">Aucun service pour le moment</p>
        <UButton label="Créer un service" color="primary" size="sm" @click="resetForm(); modalOpen = true" />
      </div>
    </UCard>

    <UCard v-else>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left py-3 px-4 text-muted font-medium w-16">Icône</th>
              <th class="text-left py-3 px-4 text-muted font-medium">Titre</th>
              <th class="text-left py-3 px-4 text-muted font-medium">Description</th>
              <th class="text-left py-3 px-4 text-muted font-medium w-20">Ordre</th>
              <th class="text-right py-3 px-4 text-muted font-medium w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="svc in services" :key="svc.id" class="border-b border-default hover:bg-elevated/50 transition-colors">
              <td class="py-3 px-4">
                <UIcon v-if="svc.icon" :name="svc.icon" class="size-5 text-primary" />
                <span v-else class="text-xs text-muted">—</span>
              </td>
              <td class="py-3 px-4 font-medium text-highlighted">{{ svc.title }}</td>
              <td class="py-3 px-4 text-muted truncate max-w-xs">{{ svc.description }}</td>
              <td class="py-3 px-4 text-muted">{{ svc.sort }}</td>
              <td class="py-3 px-4 text-right whitespace-nowrap">
                <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-pencil"
                  @click="editingItem = svc; Object.assign(form, { title: svc.title, description: svc.description, icon: svc.icon, sort: svc.sort }); modalOpen = true" />
                <UButton color="error" variant="ghost" size="sm" icon="i-lucide-trash-2"
                  @click="askDelete('le service &laquo; ' + svc.title + ' &raquo;', () => doDelete(svc.id))" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <UModal v-model:open="modalOpen" :title="editingItem ? 'Modifier le service' : 'Nouveau service'">
      <template #body>
        <UForm :state="form" class="space-y-5" @submit="save">
          <UFormField label="Titre" name="title" required>
            <UInput v-model="form.title" placeholder="Nom du service" class="w-full" />
          </UFormField>
          <UFormField label="Description" name="description">
            <UTextarea v-model="form.description" :rows="3" placeholder="Description du service" class="w-full" />
          </UFormField>
          <UFormField label="Icône" name="icon" description="Nom de l'icône Lucide (ex: i-lucide-code)">
            <UInput v-model="form.icon" placeholder="i-lucide-code" class="w-full" />
          </UFormField>
          <UFormField label="Ordre" name="sort">
            <UInput v-model="form.sort" type="number" placeholder="0" class="w-full" />
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

    <UModal v-model:open="deleteConfirm.open" title="Confirmer la suppression">
      <template #body>
        <p class="text-sm text-muted">Êtes-vous sûr de vouloir supprimer {{ deleteConfirm.label }} ? Cette action est irréversible.</p>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="neutral" variant="outline" @click="deleteConfirm.open = false" />
          <UButton label="Supprimer" color="error" :loading="deleteConfirm.loading" @click="execDelete" />
        </div>
      </template>
    </UModal>
  </div>
</template>
