export function useAppToast() {
  const toast = useToast()

  function success(title: string, description?: string) {
    toast.add({ title, description, icon: 'i-lucide-check-circle', color: 'success' })
  }

  function error(title: string, description?: string, onRetry?: () => void) {
    const actions = onRetry
      ? [{
          icon: 'i-lucide-refresh-cw',
          label: 'Réessayer' as const,
          color: 'neutral' as const,
          variant: 'outline' as const,
          onClick: () => {
            onRetry()
          }
        }]
      : undefined

    toast.add({ title, description, icon: 'i-lucide-circle-x', color: 'error', actions })
  }

  function warning(title: string, description?: string) {
    toast.add({ title, description, icon: 'i-lucide-alert-triangle', color: 'warning' })
  }

  function info(title: string, description?: string) {
    toast.add({ title, description, icon: 'i-lucide-info', color: 'info' })
  }

  return { success, error, warning, info, ...toast }
}
