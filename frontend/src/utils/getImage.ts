export const getImageTeamUrl = (path?: string) => {
  if (!path) {
    return "/img/default-team.jpg"
  }

  return `${import.meta.env.VITE_ASSETS_URL}${path}`
}

export const getImagePlayerUrl = (path?: string) => {
  if (!path) {
    return "/img/default-player.jpg"
  }

  return `${import.meta.env.VITE_ASSETS_URL}${path}`
}

export function objectToFormData(
  obj: Record<string, any>,
  files?: Record<string, File | null>
) {
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value))
    }
  })

  if (files) {
    Object.entries(files).forEach(([field, file]) => {
      if (file) {
        formData.append(field, file)
      }
    })
  }

  return formData
}

export function formatDateForInput(date: string) {
  return date.split('T')[0]
}