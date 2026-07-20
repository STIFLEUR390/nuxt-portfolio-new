<script setup lang="ts">
definePageMeta({
  middleware: 'portfolio-auth',
  layout: 'portfolio'
})

const directus = useDirectus()
const toast = useAppToast()

const FIELDS = ['id', 'quote', 'author_name', 'author_description', 'author_avatar', 'sort'] as const

const { data: testimonials, status, refresh } = useAsyncData('admin-testimonials', async () => {
  try {
    const result = await directus.request(readItems('testimonials' as const, {
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
const deleting = ref<number | null>(null)
const uploading = ref(false)

const form = reactive({
  quote: '',
  author_name: '',
  author_description: '',
  author_avatar: '',
  sort: 0
})

function resetForm() {
  editingItem.value = null
  form.quote = ''
  form.author_name = ''
  form.author_description = ''
  form.author_avatar = ''
  form.sort = 0
}

function avatarUrl(fileId: string) {
  if (!fileId) return ''
  return getDirectusFileUrl(fileId, { width: 80, height: 80, fit: 'cover', format: 'webp' })
}

async function handleAvatarUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  uploading.value = true
  try {
    const uploaded = await uploadDirectusFile({ file })
    form.author_avatar = uploaded.id
    toast.success('Avatar uploadé')
  } catch (err: any) {
    toast.error('Erreur upload', err?.message || 'Impossible d\'uploader l\'avatar')
  } finally {
    uploading.value = false
  }
}

async function save() {
  saving.value = true
  try {
    const payload = { quote: form.quote, author_name: form.author_name, author_description: form.author_description || null, author_avatar: form.author_avatar || null, sort: Number(form.sort) }
    if (editingItem.value) {
      await directus.request(updateItem('testimonials' as const, editingItem.value.id, payload as any, { fields: [...FIELDS] } as any))
      toast.success('Témoignage mis à jour')
    } else {
      await directus.request(createItem('testimonials' as const, payload as any, { fields: [...FIELDS] } as any))
      toast.success('Témoignage créé')
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

async function confirmDelete(id: number) {
  deleting.value = id
  try {
    await directus.request(deleteItem('testimonials' as const, id))
    toast.success('Témoignage supprimé')
    await refresh()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  } finally {
    deleting.value = null
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Témoignages</h1>
        <p class="text-sm text-muted mt-1">Gérez les témoignages clients</p>
      </div>
      <UButton label="Nouveau témoignage" color="primary" icon="i-lucide-plus" @click="resetForm(); modalOpen = true" />
    </div>

    <UCard v-if="status === 'pending'" :ui="{ body: 'p-8' }">
      <div class="space-y-3">
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
      </div>
    </UCard>

    <UCard v-else-if="!testimonials?.length">
      <div class="text-center py-12 space-y-3">
        <UIcon name="i-lucide-message-square-quote" class="size-10 text-muted mx-auto" />
        <p class="text-sm text-muted">Aucun témoignage pour le moment</p>
        <UButton label="Ajouter un témoignage" color="primary" size="sm" @click="resetForm(); modalOpen = true" />
      </div>
    </UCard>

    <UCard v-else>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left py-3 px-4 text-muted font-medium w-16">Avatar</th>
              <th class="text-left py-3 px-4 text-muted font-medium">Auteur</th>
              <th class="text-left py-3 px-4 text-muted font-medium">Citation</th>
              <th class="text-left py-3 px-4 text-muted font-medium w-20">Ordre</th>
              <th class="text-right py-3 px-4 text-muted font-medium w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in testimonials" :key="t.id" class="border-b border-default hover:bg-elevated/50 transition-colors">
              <td class="py-3 px-4">
                <img v-if="t.author_avatar" :src="avatarUrl(t.author_avatar)" :alt="t.author_name" class="size-10 rounded-full object-cover bg-elevated">
                <div v-else class="size-10 rounded-full bg-elevated flex items-center justify-center">
                  <UIcon name="i-lucide-user" class="size-4 text-muted" />
                </div>
              </td>
              <td class="py-3 px-4">
                <p class="font-medium text-highlighted">{{ t.author_name }}</p>
                <p v-if="t.author_description" class="text-xs text-muted">{{ t.author_description }}</p>
              </td>
              <td class="py-3 px-4 text-muted italic truncate max-w-xs">"{{ t.quote }}"</td>
              <td class="py-3 px-4 text-muted">{{ t.sort }}</td>
              <td class="py-3 px-4 text-right whitespace-nowrap">
                <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-pencil"
                  @click="editingItem = t; Object.assign(form, { quote: t.quote, author_name: t.author_name, author_description: t.author_description, author_avatar: t.author_avatar, sort: t.sort }); modalOpen = true" />
                <UButton color="error" variant="ghost" size="sm" icon="i-lucide-trash-2" :loading="deleting === t.id"
                  @click="confirmDelete(t.id)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <UModal v-model:open="modalOpen" :title="editingItem ? 'Modifier le témoignage' : 'Nouveau témoignage'">
      <template #body>
        <UForm :state="form" class="space-y-5" @submit="save">
          <UFormField label="Auteur" name="author_name" required>
            <UInput v-model="form.author_name" placeholder="Nom du client" class="w-full" />
          </UFormField>
          <UFormField label="Description" name="author_description">
            <UInput v-model="form.author_description" placeholder="Poste ou entreprise" class="w-full" />
          </UFormField>
          <UFormField label="Citation" name="quote" required>
            <UTextarea v-model="form.quote" :rows="4" placeholder="Texte du témoignage" class="w-full" />
          </UFormField>
          <UFormField label="Avatar" name="author_avatar">
            <div class="flex items-center gap-3">
              <img v-if="form.author_avatar" :src="avatarUrl(form.author_avatar)" alt="" class="size-14 rounded-full object-cover bg-elevated shrink-0 border border-default">
              <UInput type="file" accept="image/*" class="w-full" @change="handleAvatarUpload" />
            </div>
            <UInput v-if="!uploading" v-model="form.author_avatar" placeholder="uuid-du-fichier" class="w-full mt-2" />
            <div v-else class="text-sm text-muted mt-2">Upload en cours...</div>
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
  </div>
</template>
