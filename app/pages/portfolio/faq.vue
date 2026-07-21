<script setup lang="ts">
definePageMeta({
  middleware: 'portfolio-auth',
  layout: 'portfolio'
})

const directus = useDirectus()
const toast = useAppToast()

const CAT_FIELDS = ['id', 'title', 'sort'] as const
const ITEM_FIELDS = ['id', 'label', 'content', 'category_id', 'sort'] as const

const { data: categories, status, refresh } = useAsyncData('admin-faq', async () => {
  try {
    const [cats, faqItems] = await Promise.all([
      (directus.request as any)((readItems as any)('faq_categories', { sort: ['sort'], fields: [...CAT_FIELDS] })),
      (directus.request as any)((readItems as any)('faq_items', { sort: ['sort'], fields: [...ITEM_FIELDS] }))
    ])
    const itemsByCat: Record<number, any[]> = {}
    for (const item of (faqItems || []) as any[]) {
      const catId = item.category_id
      if (!itemsByCat[catId]) itemsByCat[catId] = []
      itemsByCat[catId].push(item)
    }
    return ((cats || []) as any[]).map((cat: any) => ({ ...cat, items: itemsByCat[cat.id] || [] }))
  } catch {
    return [] as any[]
  }
})

const expandedId = ref<number | null>(null)

function toggleExpand(id: number) {
  expandedId.value = expandedId.value === id ? null : id
}

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

// Category modal
const catModalOpen = ref(false)
const editingCat = ref<any>(null)
const savingCat = ref(false)

const catForm = reactive({
  title: '',
  sort: 0
})

function resetCatForm() {
  editingCat.value = null
  catForm.title = ''
  catForm.sort = 0
}

async function saveCat() {
  savingCat.value = true
  try {
    const payload = { title: catForm.title, sort: Number(catForm.sort) }
    const opts = { fields: [...CAT_FIELDS] } as any
    if (editingCat.value) {
      await (directus.request as any)((updateItem as any)('faq_categories', editingCat.value.id, payload as any, opts))
      toast.success('Catégorie mise à jour')
    } else {
      await (directus.request as any)((createItem as any)('faq_categories', payload as any, opts))
      toast.success('Catégorie créée')
    }
    catModalOpen.value = false
    await refresh()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  } finally {
    savingCat.value = false
  }
}

async function doDeleteCat(id: number) {
  await (directus.request as any)((deleteItem as any)('faq_categories', id))
  toast.success('Catégorie supprimée')
  await refresh()
}

// Item modal
const itemModalOpen = ref(false)
const editingItem = ref<any>(null)
const savingItem = ref(false)
const currentCatId = ref<number | null>(null)

const itemForm = reactive({
  label: '',
  content: '',
  sort: 0
})

function openItemModal(catId: number, item?: any) {
  currentCatId.value = catId
  if (item) {
    editingItem.value = item
    itemForm.label = item.label
    itemForm.content = item.content
    itemForm.sort = item.sort
  } else {
    editingItem.value = null
    itemForm.label = ''
    itemForm.content = ''
    itemForm.sort = 0
  }
  itemModalOpen.value = true
}

async function saveItem() {
  savingItem.value = true
  try {
    const payload = { label: itemForm.label, content: itemForm.content || null, category_id: currentCatId.value, sort: Number(itemForm.sort) }
    const opts = { fields: [...ITEM_FIELDS] } as any
    if (editingItem.value) {
      await (directus.request as any)((updateItem as any)('faq_items', editingItem.value.id, payload as any, opts))
      toast.success('Question mise à jour')
    } else {
      await (directus.request as any)((createItem as any)('faq_items', payload as any, opts))
      toast.success('Question ajoutée')
    }
    itemModalOpen.value = false
    await refresh()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  } finally {
    savingItem.value = false
  }
}

async function doDeleteFaqItem(id: number) {
  await (directus.request as any)((deleteItem as any)('faq_items', id))
  toast.success('Question supprimée')
  await refresh()
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">FAQ</h1>
        <p class="text-sm text-muted mt-1">Gérez les questions fréquentes</p>
      </div>
      <UButton label="Nouvelle catégorie" color="primary" icon="i-lucide-plus" @click="resetCatForm(); catModalOpen = true" />
    </div>

    <UCard v-if="status === 'pending'" :ui="{ body: 'p-8' }">
      <div class="space-y-3">
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
      </div>
    </UCard>

    <UCard v-else-if="!categories?.length">
      <div class="text-center py-12 space-y-3">
        <UIcon name="i-lucide-circle-help" class="size-10 text-muted mx-auto" />
        <p class="text-sm text-muted">Aucune catégorie FAQ pour le moment</p>
        <UButton label="Créer une catégorie" color="primary" size="sm" @click="resetCatForm(); catModalOpen = true" />
      </div>
    </UCard>

    <div v-else class="space-y-3">
      <UCard v-for="cat in categories" :key="cat.id">
        <div class="flex items-center justify-between cursor-pointer select-none" @click="toggleExpand(cat.id)">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-folder" class="size-4 text-primary" />
            <p class="font-medium text-highlighted">{{ cat.title }}</p>
            <UBadge size="sm" color="neutral" variant="subtle">{{ cat.items?.length || 0 }}</UBadge>
          </div>
          <div class="flex items-center gap-2 shrink-0" @click.stop>
            <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-plus" label="Question" @click="openItemModal(cat.id)" />
            <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-pencil"
              @click="editingCat = cat; Object.assign(catForm, { title: cat.title, sort: cat.sort }); catModalOpen = true" />
            <UButton size="xs" color="error" variant="ghost" icon="i-lucide-trash-2"
              @click="askDelete('la catégorie &laquo; ' + cat.title + ' &raquo;', () => doDeleteCat(cat.id))" />
            <UIcon :name="expandedId === cat.id ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="size-4 text-muted ml-1" />
          </div>
        </div>

        <div v-if="expandedId === cat.id" class="mt-4 pt-4 border-t border-default">
          <div v-if="cat.items?.length" class="space-y-3">
            <div v-for="item in cat.items" :key="item.id" class="group">
              <div class="flex items-start gap-3">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-highlighted">{{ item.label }}</p>
                  <p v-if="item.content" class="text-xs text-muted mt-1 line-clamp-2">{{ item.content }}</p>
                </div>
                <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-pencil" @click="openItemModal(cat.id, item)" />
                  <UButton size="xs" color="error" variant="ghost" icon="i-lucide-x"
                    @click="askDelete('la question &laquo; ' + item.label.slice(0, 40) + '... &raquo;', () => doDeleteFaqItem(item.id))" />
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-xs text-muted text-center py-4">Aucune question dans cette catégorie</p>
        </div>
      </UCard>
    </div>

    <UModal v-model:open="catModalOpen" :title="editingCat ? 'Modifier la catégorie' : 'Nouvelle catégorie'">
      <template #body>
        <UForm :state="catForm" class="space-y-5" @submit="saveCat">
          <UFormField label="Titre" name="title" required>
            <UInput v-model="catForm.title" placeholder="Nom de la catégorie" class="w-full" />
          </UFormField>
          <UFormField label="Ordre" name="sort">
            <UInput v-model="catForm.sort" type="number" placeholder="0" class="w-full" />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="neutral" variant="outline" @click="catModalOpen = false" />
          <UButton label="Enregistrer" color="primary" :loading="savingCat" @click="saveCat" />
        </div>
      </template>
    </UModal>

    <UModal v-model:open="itemModalOpen" :title="editingItem ? 'Modifier la question' : 'Nouvelle question'">
      <template #body>
        <UForm :state="itemForm" class="space-y-5" @submit="saveItem">
          <UFormField label="Question" name="label" required>
            <UTextarea v-model="itemForm.label" :rows="2" placeholder="La question" class="w-full" />
          </UFormField>
          <UFormField label="Réponse" name="content" description="Markdown supporté">
            <UTextarea v-model="itemForm.content" :rows="5" placeholder="La réponse (markdown)" class="w-full font-mono text-sm" />
          </UFormField>
          <UFormField label="Ordre" name="sort">
            <UInput v-model="itemForm.sort" type="number" placeholder="0" class="w-full" />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="neutral" variant="outline" @click="itemModalOpen = false" />
          <UButton label="Enregistrer" color="primary" :loading="savingItem" @click="saveItem" />
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
