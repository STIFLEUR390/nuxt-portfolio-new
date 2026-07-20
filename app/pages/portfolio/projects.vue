<script setup lang="ts">
definePageMeta({
  middleware: 'portfolio-auth',
  layout: 'portfolio'
})

const directus = useDirectus()
const toast = useAppToast()

const FIELDS = ['id', 'title', 'description', 'image', 'url', 'demo', 'date', 'sort', 'status'] as const

const { data: projects, status, refresh } = useAsyncData('admin-projects', async () => {
  try {
    const result = await directus.request(readItems('projects' as const, {
      sort: ['-date'],
      fields: [...FIELDS]
    }))
    return (result || []) as any[]
  } catch {
    return [] as any[]
  }
})

const modalOpen = ref(false)
const editingProject = ref<any>(null)
const saving = ref(false)
const deleting = ref<string | null>(null)
const uploading = ref(false)

const form = reactive({
  title: '',
  description: '',
  image: '',
  url: '',
  demo: '',
  date: '',
  status: 'published' as string,
  sort: 0
})

function resetForm() {
  editingProject.value = null
  form.title = ''
  form.description = ''
  form.image = ''
  form.url = ''
  form.demo = ''
  form.date = ''
  form.status = 'published'
  form.sort = 0
}

async function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  uploading.value = true
  try {
    const uploaded = await uploadDirectusFile({ file })
    form.image = uploaded.id
    toast.success('Image uploadée')
  } catch (err: any) {
    toast.error('Erreur upload', err?.message || 'Impossible d\'uploader l\'image')
  } finally {
    uploading.value = false
  }
}

async function save() {
  saving.value = true
  try {
    const payload = {
      title: form.title,
      description: form.description,
      image: form.image || null,
      url: form.url,
      demo: form.demo || null,
      date: form.date,
      status: form.status,
      sort: form.sort
    }

    if (editingProject.value) {
      await directus.request(updateItem('projects' as const, editingProject.value.id, payload as any, { fields: [...FIELDS] } as any))
      toast.success('Projet mis à jour')
    } else {
      await directus.request(createItem('projects' as const, payload as any, { fields: [...FIELDS] } as any))
      toast.success('Projet créé')
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

async function confirmDelete(id: string) {
  deleting.value = id
  try {
    await directus.request(deleteItem('projects' as const, id))
    toast.success('Projet supprimé')
    await refresh()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  } finally {
    deleting.value = null
  }
}

function imageUrl(fileId: string) {
  if (!fileId) return ''
  return getDirectusFileUrl(fileId, { width: 80, height: 60, fit: 'cover', format: 'webp' })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">
          Projets
        </h1>
        <p class="text-sm text-muted mt-1">
          Gérez les projets du portfolio
        </p>
      </div>
      <UButton
        label="Nouveau projet"
        color="primary"
        icon="i-lucide-plus"
        @click="resetForm(); modalOpen = true"
      />
    </div>

    <UCard v-if="status === 'pending'" :ui="{ body: 'p-8' }">
      <div class="space-y-3">
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
      </div>
    </UCard>

    <UCard v-else-if="!projects?.length">
      <div class="text-center py-12 space-y-3">
        <UIcon name="i-lucide-folder-open" class="size-10 text-muted mx-auto" />
        <p class="text-sm text-muted">Aucun projet pour le moment</p>
        <UButton label="Créer un projet" color="primary" size="sm" @click="resetForm(); modalOpen = true" />
      </div>
    </UCard>

    <UCard v-else>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left py-3 px-4 text-muted font-medium w-20">Image</th>
              <th class="text-left py-3 px-4 text-muted font-medium">Titre</th>
              <th class="text-left py-3 px-4 text-muted font-medium w-24">Date</th>
              <th class="text-left py-3 px-4 text-muted font-medium w-24">Statut</th>
              <th class="text-right py-3 px-4 text-muted font-medium w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id" class="border-b border-default hover:bg-elevated/50 transition-colors">
              <td class="py-3 px-4">
                <img v-if="project.image" :src="imageUrl(project.image)" :alt="project.title" class="size-12 rounded-lg object-cover bg-elevated">
                <div v-else class="size-12 rounded-lg bg-elevated flex items-center justify-center">
                  <UIcon name="i-lucide-image" class="size-4 text-muted" />
                </div>
              </td>
              <td class="py-3 px-4">
                <p class="font-medium text-highlighted truncate max-w-xs">{{ project.title }}</p>
              </td>
              <td class="py-3 px-4 text-muted whitespace-nowrap">{{ project.date }}</td>
              <td class="py-3 px-4">
                <UBadge :color="project.status === 'published' ? 'success' : 'neutral'" variant="subtle" size="sm">
                  {{ project.status === 'published' ? 'Publié' : 'Brouillon' }}
                </UBadge>
              </td>
              <td class="py-3 px-4 text-right whitespace-nowrap">
                <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-pencil"
                  @click="editingProject = project; Object.assign(form, { title: project.title, description: project.description, image: project.image, url: project.url, demo: project.demo, date: project.date, status: project.status, sort: project.sort }); modalOpen = true" />
                <UButton color="error" variant="ghost" size="sm" icon="i-lucide-trash-2" :loading="deleting === project.id"
                  @click="confirmDelete(project.id)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <UModal v-model:open="modalOpen" :title="editingProject ? 'Modifier le projet' : 'Nouveau projet'">
      <template #body>
        <UForm :state="form" class="space-y-5" @submit="save">
          <UFormField label="Titre" name="title" required>
            <UInput v-model="form.title" placeholder="Nom du projet" class="w-full" />
          </UFormField>
          <UFormField label="Description" name="description">
            <UTextarea v-model="form.description" :rows="3" placeholder="Description du projet" class="w-full" />
          </UFormField>
          <UFormField label="Image" name="image" description="Uploadez une image ou entrez un ID Directus">
            <div class="flex items-center gap-3">
              <img v-if="form.image" :src="imageUrl(form.image)" alt="" class="size-14 rounded-lg object-cover bg-elevated shrink-0 border border-default">
              <UInput type="file" accept="image/*" class="w-full" @change="handleImageUpload" />
            </div>
            <UInput v-if="!uploading" v-model="form.image" placeholder="uuid-du-fichier" class="w-full mt-2" />
            <div v-else class="text-sm text-muted mt-2">Upload en cours...</div>
          </UFormField>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="URL (GitHub)" name="url">
              <UInput v-model="form.url" placeholder="https://github.com/..." class="w-full" />
            </UFormField>
            <UFormField label="Démo" name="demo">
              <UInput v-model="form.demo" placeholder="https://demo.example.com" class="w-full" />
            </UFormField>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <UFormField label="Date" name="date" required>
              <UInput v-model="form.date" placeholder="2026" class="w-full" />
            </UFormField>
            <UFormField label="Statut" name="status">
              <USelect v-model="form.status" :items="[{ label: 'Publié', value: 'published' }, { label: 'Brouillon', value: 'draft' }]" class="w-full" />
            </UFormField>
            <UFormField label="Ordre" name="sort">
              <UInput v-model="form.sort" type="number" placeholder="0" class="w-full" />
            </UFormField>
          </div>
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
