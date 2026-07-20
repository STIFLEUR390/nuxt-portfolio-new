<script setup lang="ts">
definePageMeta({
  middleware: 'portfolio-auth',
  layout: 'portfolio'
})

const directus = useDirectus()
const toast = useAppToast()

const CAT_FIELDS = ['id', 'label', 'description', 'sort'] as const
const ITEM_FIELDS = ['id', 'name', 'icon', 'category_id', 'sort'] as const

const { data: categories, status, refresh } = useAsyncData('admin-stack', async () => {
  try {
    const [cats, stackItems] = await Promise.all([
      (directus.request as any)((readItems as any)('stack_categories', { sort: ['sort'], fields: [...CAT_FIELDS] })),
      (directus.request as any)((readItems as any)('stack_items', { sort: ['sort'], fields: [...ITEM_FIELDS] }))
    ])
    const itemsByCat: Record<number, any[]> = {}
    for (const item of (stackItems || []) as any[]) {
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

// Category modal
const catModalOpen = ref(false)
const editingCat = ref<any>(null)
const savingCat = ref(false)

const catForm = reactive({
  label: '',
  description: '',
  sort: 0
})

function resetCatForm() {
  editingCat.value = null
  catForm.label = ''
  catForm.description = ''
  catForm.sort = 0
}

async function saveCat() {
  savingCat.value = true
  try {
    const payload = { label: catForm.label, description: catForm.description || null, sort: Number(catForm.sort) }
    const opts = { fields: [...CAT_FIELDS] } as any
    if (editingCat.value) {
      await (directus.request as any)((updateItem as any)('stack_categories', editingCat.value.id, payload as any, opts))
      toast.success('Catégorie mise à jour')
    } else {
      await (directus.request as any)((createItem as any)('stack_categories', payload as any, opts))
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

async function deleteCat(id: number) {
  try {
    await (directus.request as any)((deleteItem as any)('stack_categories', id))
    toast.success('Catégorie supprimée')
    await refresh()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  }
}

// Item modal
const itemModalOpen = ref(false)
const editingItem = ref<any>(null)
const savingItem = ref(false)
const currentCatId = ref<number | null>(null)

const itemForm = reactive({
  name: '',
  icon: '',
  sort: 0
})

function openItemModal(catId: number, item?: any) {
  currentCatId.value = catId
  if (item) {
    editingItem.value = item
    itemForm.name = item.name
    itemForm.icon = item.icon
    itemForm.sort = item.sort
  } else {
    editingItem.value = null
    itemForm.name = ''
    itemForm.icon = ''
    itemForm.sort = 0
  }
  itemModalOpen.value = true
}

async function saveItem() {
  savingItem.value = true
  try {
    const payload = { name: itemForm.name, icon: itemForm.icon || null, category_id: currentCatId.value, sort: Number(itemForm.sort) }
    const opts = { fields: [...ITEM_FIELDS] } as any
    if (editingItem.value) {
      await (directus.request as any)((updateItem as any)('stack_items', editingItem.value.id, payload as any, opts))
      toast.success('Technologie mise à jour')
    } else {
      await (directus.request as any)((createItem as any)('stack_items', payload as any, opts))
      toast.success('Technologie ajoutée')
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

async function deleteStackItem(id: number) {
  try {
    await (directus.request as any)((deleteItem as any)('stack_items', id))
    toast.success('Technologie supprimée')
    await refresh()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Stack technique</h1>
        <p class="text-sm text-muted mt-1">Gérez les catégories et technologies</p>
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
        <UIcon name="i-lucide-layers" class="size-10 text-muted mx-auto" />
        <p class="text-sm text-muted">Aucune catégorie pour le moment</p>
        <UButton label="Créer une catégorie" color="primary" size="sm" @click="resetCatForm(); catModalOpen = true" />
      </div>
    </UCard>

    <div v-else class="space-y-3">
      <UCard v-for="cat in categories" :key="cat.id">
        <div class="flex items-center justify-between cursor-pointer select-none" @click="toggleExpand(cat.id)">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-layers" class="size-4 text-primary" />
            <div>
              <p class="font-medium text-highlighted">{{ cat.label }}</p>
              <p v-if="cat.description" class="text-xs text-muted">{{ cat.description }}</p>
            </div>
            <UBadge size="sm" color="neutral" variant="subtle">{{ cat.items?.length || 0 }}</UBadge>
          </div>
          <div class="flex items-center gap-2 shrink-0" @click.stop>
            <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-plus" label="Techno" @click="openItemModal(cat.id)" />
            <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-pencil"
              @click="editingCat = cat; Object.assign(catForm, { label: cat.label, description: cat.description, sort: cat.sort }); catModalOpen = true" />
            <UButton size="xs" color="error" variant="ghost" icon="i-lucide-trash-2" @click="deleteCat(cat.id)" />
            <UIcon :name="expandedId === cat.id ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="size-4 text-muted ml-1" />
          </div>
        </div>

        <div v-if="expandedId === cat.id" class="mt-4 pt-4 border-t border-default">
          <div v-if="cat.items?.length" class="space-y-2">
            <div v-for="item in cat.items" :key="item.id" class="flex items-center justify-between group">
              <div class="flex items-center gap-3">
                <UIcon v-if="item.icon" :name="item.icon" class="size-4 text-primary" />
                <div v-else class="size-4" />
                <span class="text-sm text-highlighted">{{ item.name }}</span>
              </div>
              <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-pencil" @click="openItemModal(cat.id, item)" />
                <UButton size="xs" color="error" variant="ghost" icon="i-lucide-x" @click="deleteStackItem(item.id)" />
              </div>
            </div>
          </div>
          <p v-else class="text-xs text-muted text-center py-4">Aucune technologie dans cette catégorie</p>
        </div>
      </UCard>
    </div>

    <UModal v-model:open="catModalOpen" :title="editingCat ? 'Modifier la catégorie' : 'Nouvelle catégorie'">
      <template #body>
        <UForm :state="catForm" class="space-y-5" @submit="saveCat">
          <UFormField label="Nom" name="label" required>
            <UInput v-model="catForm.label" placeholder="Nom de la catégorie" class="w-full" />
          </UFormField>
          <UFormField label="Description" name="description">
            <UTextarea v-model="catForm.description" :rows="2" placeholder="Description optionnelle" class="w-full" />
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

    <UModal v-model:open="itemModalOpen" :title="editingItem ? 'Modifier la technologie' : 'Nouvelle technologie'">
      <template #body>
        <UForm :state="itemForm" class="space-y-5" @submit="saveItem">
          <UFormField label="Nom" name="name" required>
            <UInput v-model="itemForm.name" placeholder="Vue.js" class="w-full" />
          </UFormField>
          <UFormField label="Icône" name="icon" description="Nom de l'icône Lucide (ex: i-lucide-vue)">
            <UInput v-model="itemForm.icon" placeholder="i-lucide-code" class="w-full" />
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
  </div>
</template>
