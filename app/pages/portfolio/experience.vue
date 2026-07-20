<script setup lang="ts">
definePageMeta({
  middleware: 'portfolio-auth',
  layout: 'portfolio'
})

const directus = useDirectus()
const toast = useAppToast()

const EXP_FIELDS = ['id', 'position', 'date_range', 'company_name', 'company_logo', 'company_url', 'company_color', 'sort'] as const
const HL_FIELDS = ['id', 'text', 'experience_id', 'sort'] as const

const { data: experiences, status, refresh } = useAsyncData('admin-experience', async () => {
  try {
    const [exps, hls] = await Promise.all([
      (directus.request as any)((readItems as any)('experience', { sort: ['sort'], fields: [...EXP_FIELDS] })),
      (directus.request as any)((readItems as any)('experience_highlights', { sort: ['sort'], fields: [...HL_FIELDS] }))
    ])
    const hlsByExp: Record<number, any[]> = {}
    for (const hl of (hls || []) as any[]) {
      const expId = hl.experience_id
      if (!hlsByExp[expId]) hlsByExp[expId] = []
      hlsByExp[expId].push(hl)
    }
    return ((exps || []) as any[]).map((exp: any) => ({ ...exp, highlights: hlsByExp[exp.id] || [] }))
  } catch {
    return [] as any[]
  }
})

const expandedId = ref<number | null>(null)

function toggleExpand(id: number) {
  expandedId.value = expandedId.value === id ? null : id
}

// Experience modal
const expModalOpen = ref(false)
const editingExp = ref<any>(null)
const savingExp = ref(false)

const expForm = reactive({
  position: '',
  date_range: '',
  company_name: '',
  company_logo: '',
  company_url: '',
  company_color: '#6366F1',
  sort: 0
})

function resetExpForm() {
  editingExp.value = null
  expForm.position = ''
  expForm.date_range = ''
  expForm.company_name = ''
  expForm.company_logo = ''
  expForm.company_url = ''
  expForm.company_color = '#6366F1'
  expForm.sort = 0
}

async function saveExp() {
  savingExp.value = true
  try {
    const payload = {
      position: expForm.position,
      date_range: expForm.date_range || null,
      company_name: expForm.company_name,
      company_logo: expForm.company_logo || null,
      company_url: expForm.company_url || null,
      company_color: expForm.company_color || null,
      sort: Number(expForm.sort)
    }
    const opts = { fields: [...EXP_FIELDS] } as any
    if (editingExp.value) {
      await (directus.request as any)((updateItem as any)('experience', editingExp.value.id, payload as any, opts))
      toast.success('Expérience mise à jour')
    } else {
      await (directus.request as any)((createItem as any)('experience', payload as any, opts))
      toast.success('Expérience créée')
    }
    expModalOpen.value = false
    await refresh()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  } finally {
    savingExp.value = false
  }
}

async function deleteExp(id: number) {
  try {
    await (directus.request as any)((deleteItem as any)('experience', id))
    toast.success('Expérience supprimée')
    await refresh()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  }
}

// Highlight modal
const hlModalOpen = ref(false)
const editingHl = ref<any>(null)
const savingHl = ref(false)
const currentExpId = ref<number | null>(null)

const hlForm = reactive({
  text: '',
  sort: 0
})

function openHlModal(expId: number, hl?: any) {
  currentExpId.value = expId
  if (hl) {
    editingHl.value = hl
    hlForm.text = hl.text
    hlForm.sort = hl.sort
  } else {
    editingHl.value = null
    hlForm.text = ''
    hlForm.sort = 0
  }
  hlModalOpen.value = true
}

async function saveHl() {
  savingHl.value = true
  try {
    const payload = { text: hlForm.text, experience_id: currentExpId.value, sort: Number(hlForm.sort) }
    const opts = { fields: [...HL_FIELDS] } as any
    if (editingHl.value) {
      await (directus.request as any)((updateItem as any)('experience_highlights', editingHl.value.id, payload as any, opts))
      toast.success('Point clé mis à jour')
    } else {
      await (directus.request as any)((createItem as any)('experience_highlights', payload as any, opts))
      toast.success('Point clé ajouté')
    }
    hlModalOpen.value = false
    await refresh()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  } finally {
    savingHl.value = false
  }
}

async function deleteHl(id: number) {
  try {
    await (directus.request as any)((deleteItem as any)('experience_highlights', id))
    toast.success('Point clé supprimé')
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
        <h1 class="text-2xl font-bold text-highlighted">Expériences</h1>
        <p class="text-sm text-muted mt-1">Gérez le parcours professionnel</p>
      </div>
      <UButton label="Nouvelle expérience" color="primary" icon="i-lucide-plus" @click="resetExpForm(); expModalOpen = true" />
    </div>

    <UCard v-if="status === 'pending'" :ui="{ body: 'p-8' }">
      <div class="space-y-3">
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
      </div>
    </UCard>

    <UCard v-else-if="!experiences?.length">
      <div class="text-center py-12 space-y-3">
        <UIcon name="i-lucide-briefcase" class="size-10 text-muted mx-auto" />
        <p class="text-sm text-muted">Aucune expérience pour le moment</p>
        <UButton label="Ajouter une expérience" color="primary" size="sm" @click="resetExpForm(); expModalOpen = true" />
      </div>
    </UCard>

    <div v-else class="space-y-3">
      <UCard v-for="exp in experiences" :key="exp.id">
        <div class="flex items-center justify-between cursor-pointer select-none" @click="toggleExpand(exp.id)">
          <div class="flex items-center gap-4">
            <div class="size-10 rounded-lg flex items-center justify-center text-lg shrink-0 border border-default" :style="{ backgroundColor: exp.company_color || '#f0f0f0' }">
              {{ exp.company_name?.charAt(0) || '?' }}
            </div>
            <div>
              <p class="font-medium text-highlighted">{{ exp.position }}</p>
              <p class="text-xs text-muted">{{ exp.company_name }} · {{ exp.date_range }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0" @click.stop>
            <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-plus" label="Point clé" @click="openHlModal(exp.id)" />
            <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-pencil"
              @click="editingExp = exp; Object.assign(expForm, { position: exp.position, date_range: exp.date_range, company_name: exp.company_name, company_logo: exp.company_logo, company_url: exp.company_url, company_color: exp.company_color, sort: exp.sort }); expModalOpen = true" />
            <UButton size="xs" color="error" variant="ghost" icon="i-lucide-trash-2" @click="deleteExp(exp.id)" />
            <UIcon :name="expandedId === exp.id ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="size-4 text-muted ml-1" />
          </div>
        </div>

        <div v-if="expandedId === exp.id && exp.highlights?.length" class="mt-4 pt-4 border-t border-default space-y-2">
          <div v-for="hl in exp.highlights" :key="hl.id" class="flex items-start gap-3 group">
            <UIcon name="i-lucide-check-circle-2" class="size-4 text-primary mt-0.5 shrink-0" />
            <p class="text-sm text-muted flex-1">{{ hl.text }}</p>
            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-pencil" @click="openHlModal(exp.id, hl)" />
              <UButton size="xs" color="error" variant="ghost" icon="i-lucide-x" @click="deleteHl(hl.id)" />
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <UModal v-model:open="expModalOpen" :title="editingExp ? 'Modifier l\'expérience' : 'Nouvelle expérience'">
      <template #body>
        <UForm :state="expForm" class="space-y-5" @submit="saveExp">
          <UFormField label="Poste" name="position" required>
            <UInput v-model="expForm.position" placeholder="Développeur Full-Stack" class="w-full" />
          </UFormField>
          <UFormField label="Entreprise" name="company_name" required>
            <UInput v-model="expForm.company_name" placeholder="Nom de l'entreprise" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Période" name="date_range">
              <UInput v-model="expForm.date_range" placeholder="2022 - Présent" class="w-full" />
            </UFormField>
            <UFormField label="Couleur" name="company_color">
              <div class="flex items-center gap-3">
                <input type="color" v-model="expForm.company_color" class="size-9 rounded-lg cursor-pointer border-0 p-0.5 bg-transparent" />
                <span class="text-xs text-muted font-mono">{{ expForm.company_color }}</span>
              </div>
            </UFormField>
          </div>
          <UFormField label="URL entreprise" name="company_url">
            <UInput v-model="expForm.company_url" placeholder="https://..." class="w-full" />
          </UFormField>
          <UFormField label="Logo" name="company_logo" description="Icône ou emoji (optionnel)">
            <UInput v-model="expForm.company_logo" placeholder="ex: i-lucide-building" class="w-full" />
          </UFormField>
          <UFormField label="Ordre" name="sort">
            <UInput v-model="expForm.sort" type="number" placeholder="0" class="w-full" />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="neutral" variant="outline" @click="expModalOpen = false" />
          <UButton label="Enregistrer" color="primary" :loading="savingExp" @click="saveExp" />
        </div>
      </template>
    </UModal>

    <UModal v-model:open="hlModalOpen" :title="editingHl ? 'Modifier le point clé' : 'Ajouter un point clé'">
      <template #body>
        <UForm :state="hlForm" class="space-y-5" @submit="saveHl">
          <UFormField label="Texte" name="text" required>
            <UTextarea v-model="hlForm.text" :rows="3" placeholder="Description du point clé" class="w-full" />
          </UFormField>
          <UFormField label="Ordre" name="sort">
            <UInput v-model="hlForm.sort" type="number" placeholder="0" class="w-full" />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="neutral" variant="outline" @click="hlModalOpen = false" />
          <UButton label="Enregistrer" color="primary" :loading="savingHl" @click="saveHl" />
        </div>
      </template>
    </UModal>
  </div>
</template>
