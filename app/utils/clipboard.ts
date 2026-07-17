export function copyToClipboard(toCopy: string, message = 'Copié dans le presse-papier') {
  const toast = useAppToast()
  navigator.clipboard.writeText(toCopy)
    .then(() => toast.success(message))
    .catch(() => toast.error('Erreur', 'Impossible de copier dans le presse-papier'))
}
