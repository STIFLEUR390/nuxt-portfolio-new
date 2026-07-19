export const useAppUIStore = defineStore('appUI', () => {
  const mobileMenuOpen = ref(false)
  const activeModal = ref<string | null>(null)

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }
  function closeMobileMenu() {
    mobileMenuOpen.value = false
  }
  function openModal(id: string) {
    activeModal.value = id
  }
  function closeModal() {
    activeModal.value = null
  }

  return { mobileMenuOpen, activeModal, toggleMobileMenu, closeMobileMenu, openModal, closeModal }
})
