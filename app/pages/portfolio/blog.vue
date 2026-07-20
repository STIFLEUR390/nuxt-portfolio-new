<script setup lang="ts">
definePageMeta({
  middleware: 'portfolio-auth',
  layout: 'portfolio'
})

const directus = useDirectus()
const toast = useAppToast()

const { data: posts, status, refresh } = useAsyncData('admin-blog', async () => {
  try {
    const result = await directus.request(readItems('blog_posts' as const, {
      sort: ['-date'],
      fields: ['id', 'title', 'description', 'slug', 'image', 'body', 'date', 'min_read', 'featured', 'status']
    }))
    return (result || []) as any[]
  } catch {
    return [] as any[]
  }
})

const modalOpen = ref(false)
const editingPost = ref<any>(null)
const saving = ref(false)
const deleting = ref<string | null>(null)
const uploading = ref(false)

const form = reactive({
  title: '',
  description: '',
  slug: '',
  body: '',
  image: '',
  date: '',
  min_read: 5,
  featured: false,
  status: 'published'
})

function resetForm() {
  editingPost.value = null
  form.title = ''
  form.description = ''
  form.slug = ''
  form.body = ''
  form.image = ''
  form.date = ''
  form.min_read = 5
  form.featured = false
  form.status = 'published'
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
      slug: form.slug,
      body: form.body,
      image: form.image || null,
      date: form.date,
      min_read: Number(form.min_read),
      featured: form.featured,
      status: form.status
    }

    if (editingPost.value) {
      await directus.request(updateItem('blog_posts' as const, editingPost.value.id, payload))
      toast.success('Article mis à jour')
    } else {
      await directus.request(createItem('blog_posts' as const, payload))
      toast.success('Article créé')
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
    await directus.request(deleteItem('blog_posts' as const, id))
    toast.success('Article supprimé')
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

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">
          Blog
        </h1>
        <p class="text-sm text-muted mt-1">
          Gérez les articles du blog
        </p>
      </div>
      <UButton
        label="Nouvel article"
        color="primary"
        icon="i-lucide-plus"
        @click="resetForm(); modalOpen = true"
      />
    </div>

    <UCard
      v-if="status === 'pending'"
      :ui="{ body: 'p-8' }"
    >
      <div class="space-y-3">
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
      </div>
    </UCard>

    <UCard v-else-if="!posts?.length">
      <div class="text-center py-12 space-y-3">
        <UIcon
          name="i-lucide-file-text"
          class="size-10 text-muted mx-auto"
        />
        <p class="text-sm text-muted">
          Aucun article pour le moment
        </p>
        <UButton
          label="Créer un article"
          color="primary"
          size="sm"
          @click="resetForm(); modalOpen = true"
        />
      </div>
    </UCard>

    <UCard v-else>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left py-3 px-4 text-muted font-medium w-20">
                Image
              </th>
              <th class="text-left py-3 px-4 text-muted font-medium">
                Titre
              </th>
              <th class="text-left py-3 px-4 text-muted font-medium w-20">
                Lecture
              </th>
              <th class="text-left py-3 px-4 text-muted font-medium w-24">
                Date
              </th>
              <th class="text-left py-3 px-4 text-muted font-medium w-20">
                Statut
              </th>
              <th class="text-right py-3 px-4 text-muted font-medium w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="post in posts"
              :key="post.id"
              class="border-b border-default hover:bg-elevated/50 transition-colors"
            >
              <td class="py-3 px-4">
                <img
                  v-if="post.image"
                  :src="imageUrl(post.image)"
                  :alt="post.title"
                  class="size-12 rounded-lg object-cover bg-elevated"
                >
                <div
                  v-else
                  class="size-12 rounded-lg bg-elevated flex items-center justify-center"
                >
                  <UIcon
                    name="i-lucide-image"
                    class="size-4 text-muted"
                  />
                </div>
              </td>
              <td class="py-3 px-4">
                <p class="font-medium text-highlighted truncate max-w-xs">
                  {{ post.title }}
                </p>
                <p class="text-xs text-muted truncate max-w-xs">
                  /blog/{{ post.slug }}
                </p>
              </td>
              <td class="py-3 px-4 text-muted whitespace-nowrap">
                {{ post.min_read }} min
              </td>
              <td class="py-3 px-4 text-muted whitespace-nowrap">
                {{ post.date }}
              </td>
              <td class="py-3 px-4">
                <UBadge
                  :color="post.status === 'published' ? 'success' : 'neutral'"
                  variant="subtle"
                  size="sm"
                >
                  {{ post.status === 'published' ? 'Publié' : 'Brouillon' }}
                </UBadge>
              </td>
              <td class="py-3 px-4 text-right whitespace-nowrap">
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  icon="i-lucide-pencil"
                  @click="editingPost = post; Object.assign(form, { title: post.title, description: post.description, slug: post.slug, body: post.body, image: post.image, date: post.date, min_read: post.min_read, featured: post.featured, status: post.status }); modalOpen = true"
                />
                <UButton
                  color="error"
                  variant="ghost"
                  size="sm"
                  icon="i-lucide-trash-2"
                  :loading="deleting === post.id"
                  @click="confirmDelete(post.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <UModal v-model:open="modalOpen" :title="editingPost ? 'Modifier l\'article' : 'Nouvel article'" class="max-w-2xl">
      <template #body>
        <UForm :state="form" class="space-y-5" @submit="save">
          <UFormField label="Titre" name="title" required>
            <UInput v-model="form.title" placeholder="Titre de l'article" class="w-full" @blur="form.slug = form.slug || slugify(form.title)" />
          </UFormField>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Slug" name="slug" required description="URL de l'article">
              <UInput v-model="form.slug" placeholder="mon-article" class="w-full" />
            </UFormField>
            <UFormField label="Temps de lecture" name="min_read">
              <UInput v-model="form.min_read" type="number" min="1" placeholder="5" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="Résumé" name="description">
            <UTextarea v-model="form.description" :rows="2" placeholder="Brève description" class="w-full" />
          </UFormField>

          <UFormField label="Contenu (Markdown)" name="body">
            <UTextarea v-model="form.body" :rows="12" placeholder="Écrivez votre article en markdown..." class="w-full font-mono text-sm" />
          </UFormField>

          <UFormField label="Image à la une" name="image">
            <div class="flex items-center gap-3">
              <img v-if="form.image" :src="imageUrl(form.image)" alt="" class="size-14 rounded-lg object-cover bg-elevated shrink-0 border border-default">
              <UInput type="file" accept="image/*" class="w-full" @change="handleImageUpload" />
            </div>
            <UInput v-if="!uploading" v-model="form.image" placeholder="uuid-du-fichier" class="w-full mt-2" />
            <div v-else class="text-sm text-muted mt-2">Upload en cours...</div>
          </UFormField>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <UFormField label="Date" name="date" required>
              <UInput v-model="form.date" type="date" class="w-full" />
            </UFormField>
            <UFormField label="Statut" name="status">
              <USelect v-model="form.status" :items="[{ label: 'Publié', value: 'published' }, { label: 'Brouillon', value: 'draft' }]" class="w-full" />
            </UFormField>
            <UFormField label="À la une" name="featured">
              <USelect v-model="form.featured" :items="[{ label: 'Non', value: false }, { label: 'Oui', value: true }]" class="w-full" />
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
