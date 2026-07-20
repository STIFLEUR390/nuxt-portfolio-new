<script setup lang="ts">
definePageMeta({
  middleware: 'portfolio-auth',
  layout: 'portfolio'
})

const directus = useDirectus()
const toast = useAppToast()

const SETTINGS_FIELDS = ['id', 'picture', 'meeting_link', 'email', 'cv_url', 'available', 'footer_credits', 'locale'] as const
const SOCIAL_FIELDS = ['id', 'label', 'icon', 'url', 'sort', 'status'] as const

// Global settings (singleton)
const { data: settingsData, refresh: refreshSettings } = useAsyncData('admin-settings', async () => {
  try {
    const result = await (directus.request as any)(readItems('global_settings' as const, {
      fields: [...SETTINGS_FIELDS]
    }))
    return (result?.[0] || null) as any
  } catch {
    return null as any
  }
})

const savingSettings = ref(false)
const uploading = ref(false)
const settingsForm = reactive({
  picture: '',
  meeting_link: '',
  email: '',
  cv_url: '',
  available: false,
  footer_credits: '',
  locale: 'fr'
})

watch(settingsData, (val) => {
  if (val) {
    settingsForm.picture = val.picture || ''
    settingsForm.meeting_link = val.meeting_link || ''
    settingsForm.email = val.email || ''
    settingsForm.cv_url = val.cv_url || ''
    settingsForm.available = val.available ?? false
    settingsForm.footer_credits = val.footer_credits || ''
    settingsForm.locale = val.locale || 'fr'
  }
}, { immediate: true })

function pictureUrl(fileId: string) {
  if (!fileId) return ''
  return getDirectusFileUrl(fileId, { width: 120, height: 120, fit: 'cover', format: 'webp' })
}

async function handlePictureUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  uploading.value = true
  try {
    const uploaded = await uploadDirectusFile({ file })
    settingsForm.picture = uploaded.id
    toast.success('Photo uploadée')
  } catch (err: any) {
    toast.error('Erreur upload', err?.message || 'Impossible d\'uploader la photo')
  } finally {
    uploading.value = false
  }
}

async function saveSettings() {
  savingSettings.value = true
  try {
    const payload = {
      picture: settingsForm.picture || null,
      meeting_link: settingsForm.meeting_link || null,
      email: settingsForm.email || null,
      cv_url: settingsForm.cv_url || null,
      available: settingsForm.available,
      footer_credits: settingsForm.footer_credits || null,
      locale: settingsForm.locale
    }
    if (settingsData.value?.id) {
      await (directus.request as any)(updateItem('global_settings' as const, settingsData.value.id, payload as any, { fields: [...SETTINGS_FIELDS] } as any))
    } else {
      await (directus.request as any)(createItem('global_settings' as const, payload as any, { fields: [...SETTINGS_FIELDS] } as any))
    }
    toast.success('Paramètres enregistrés')
    await refreshSettings()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  } finally {
    savingSettings.value = false
  }
}

// Social links
const { data: socialLinks, refresh: refreshSocial } = useAsyncData('admin-social', async () => {
  try {
    const result = await directus.request(readItems('social_links' as const, {
      sort: ['sort'],
      fields: [...SOCIAL_FIELDS]
    }))
    return (result || []) as any[]
  } catch {
    return [] as any[]
  }
})

const socialModalOpen = ref(false)
const editingSocial = ref<any>(null)
const savingSocial = ref(false)
const deletingSocial = ref<number | null>(null)

const socialForm = reactive({
  label: '',
  icon: '',
  url: '',
  status: 'published',
  sort: 0
})

function resetSocialForm() {
  editingSocial.value = null
  socialForm.label = ''
  socialForm.icon = ''
  socialForm.url = ''
  socialForm.status = 'published'
  socialForm.sort = 0
}

async function saveSocial() {
  savingSocial.value = true
  try {
    const payload = {
      label: socialForm.label,
      icon: socialForm.icon || null,
      url: socialForm.url,
      status: socialForm.status,
      sort: Number(socialForm.sort)
    }
    if (editingSocial.value) {
      await directus.request(updateItem('social_links' as const, editingSocial.value.id, payload as any, { fields: [...SOCIAL_FIELDS] } as any))
      toast.success('Lien mis à jour')
    } else {
      await directus.request(createItem('social_links' as const, payload as any, { fields: [...SOCIAL_FIELDS] } as any))
      toast.success('Lien créé')
    }
    socialModalOpen.value = false
    await refreshSocial()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  } finally {
    savingSocial.value = false
  }
}

async function deleteSocial(id: number) {
  deletingSocial.value = id
  try {
    await (directus.request as any)(deleteItem('social_links' as const, id))
    toast.success('Lien supprimé')
    await refreshSocial()
  } catch (err: any) {
    const msg = err?.response?.data?.errors?.[0]?.message || err?.message || 'Erreur'
    toast.error('Erreur', msg)
  } finally {
    deletingSocial.value = null
  }
}
</script>

<template>
  <div class="space-y-10">
    <div>
      <h1 class="text-2xl font-bold text-highlighted">Paramètres</h1>
      <p class="text-sm text-muted mt-1">Configuration globale du portfolio</p>
    </div>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">Informations générales</h2>
      </template>
      <UForm :state="settingsForm" class="space-y-5" @submit="saveSettings">
        <UFormField label="Photo de profil" name="picture">
          <div class="flex items-center gap-4">
            <img v-if="settingsForm.picture" :src="pictureUrl(settingsForm.picture)" alt="" class="size-20 rounded-full object-cover bg-elevated border border-default shrink-0">
            <div v-else class="size-20 rounded-full bg-elevated flex items-center justify-center border border-default shrink-0">
              <UIcon name="i-lucide-user" class="size-6 text-muted" />
            </div>
            <div class="space-y-2">
              <UInput type="file" accept="image/*" @change="handlePictureUpload" />
              <div v-if="uploading" class="text-sm text-muted">Upload en cours...</div>
              <UInput v-if="!uploading" v-model="settingsForm.picture" placeholder="uuid-du-fichier" class="w-full" />
            </div>
          </div>
        </UFormField>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UFormField label="Email" name="email" required>
            <UInput v-model="settingsForm.email" type="email" placeholder="contact@example.com" class="w-full" />
          </UFormField>
          <UFormField label="Locale" name="locale">
            <USelect v-model="settingsForm.locale" :items="[{ label: 'Français', value: 'fr' }, { label: 'English', value: 'en' }]" class="w-full" />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UFormField label="Lien Cal.com" name="meeting_link">
            <UInput v-model="settingsForm.meeting_link" placeholder="https://cal.com/..." class="w-full" />
          </UFormField>
          <UFormField label="Lien CV" name="cv_url">
            <UInput v-model="settingsForm.cv_url" placeholder="https://..." class="w-full" />
          </UFormField>
        </div>

        <UFormField label="Disponible" name="available">
          <USelect v-model="settingsForm.available" :items="[{ label: 'Oui', value: true }, { label: 'Non', value: false }]" class="w-full sm:w-40" />
        </UFormField>

        <UFormField label="Texte footer" name="footer_credits">
          <UInput v-model="settingsForm.footer_credits" placeholder="© 2026 — Portfolio" class="w-full" />
        </UFormField>

        <div class="flex justify-end">
          <UButton label="Enregistrer" color="primary" :loading="savingSettings" @click="saveSettings" />
        </div>
      </UForm>
    </UCard>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-highlighted">Réseaux sociaux</h2>
          <UButton label="Ajouter" color="primary" size="sm" icon="i-lucide-plus" @click="resetSocialForm(); socialModalOpen = true" />
        </div>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left py-3 px-4 text-muted font-medium">Icône</th>
              <th class="text-left py-3 px-4 text-muted font-medium">Label</th>
              <th class="text-left py-3 px-4 text-muted font-medium">URL</th>
              <th class="text-left py-3 px-4 text-muted font-medium w-20">Statut</th>
              <th class="text-left py-3 px-4 text-muted font-medium w-16">Ordre</th>
              <th class="text-right py-3 px-4 text-muted font-medium w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="link in socialLinks" :key="link.id" class="border-b border-default hover:bg-elevated/50 transition-colors">
              <td class="py-3 px-4">
                <UIcon v-if="link.icon" :name="link.icon" class="size-4 text-primary" />
                <span v-else class="text-xs text-muted">—</span>
              </td>
              <td class="py-3 px-4 font-medium text-highlighted">{{ link.label }}</td>
              <td class="py-3 px-4 text-muted truncate max-w-xs">{{ link.url }}</td>
              <td class="py-3 px-4">
                <UBadge :color="link.status === 'published' ? 'success' : 'neutral'" variant="subtle" size="sm">
                  {{ link.status === 'published' ? 'Publié' : 'Brouillon' }}
                </UBadge>
              </td>
              <td class="py-3 px-4 text-muted">{{ link.sort }}</td>
              <td class="py-3 px-4 text-right whitespace-nowrap">
                <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-pencil"
                  @click="editingSocial = link; Object.assign(socialForm, { label: link.label, icon: link.icon, url: link.url, status: link.status, sort: link.sort }); socialModalOpen = true" />
                <UButton color="error" variant="ghost" size="sm" icon="i-lucide-trash-2" :loading="deletingSocial === link.id"
                  @click="deleteSocial(link.id)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <UModal v-model:open="socialModalOpen" :title="editingSocial ? 'Modifier le lien' : 'Nouveau lien'">
      <template #body>
        <UForm :state="socialForm" class="space-y-5" @submit="saveSocial">
          <UFormField label="Label" name="label" required>
            <UInput v-model="socialForm.label" placeholder="GitHub" class="w-full" />
          </UFormField>
          <UFormField label="URL" name="url" required>
            <UInput v-model="socialForm.url" placeholder="https://github.com/..." class="w-full" />
          </UFormField>
          <UFormField label="Icône" name="icon" description="Nom de l'icône Lucide">
            <UInput v-model="socialForm.icon" placeholder="i-lucide-github" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Statut" name="status">
              <USelect v-model="socialForm.status" :items="[{ label: 'Publié', value: 'published' }, { label: 'Brouillon', value: 'draft' }]" class="w-full" />
            </UFormField>
            <UFormField label="Ordre" name="sort">
              <UInput v-model="socialForm.sort" type="number" placeholder="0" class="w-full" />
            </UFormField>
          </div>
        </UForm>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton label="Annuler" color="neutral" variant="outline" @click="socialModalOpen = false" />
          <UButton label="Enregistrer" color="primary" :loading="savingSocial" @click="saveSocial" />
        </div>
      </template>
    </UModal>
  </div>
</template>
