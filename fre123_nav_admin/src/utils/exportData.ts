export const downloadDataJson = (data: any, fileName: string) => {
  const jsonData = JSON.stringify(data, null, 2)

  const blob = new Blob([jsonData], { type: 'application/json' })

  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = URL.createObjectURL(blob)
  link.download = fileName

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
}
