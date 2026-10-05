import { useEffect, useState } from 'react'

export function useLanguageMenu(onLanguageChange) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = (event) => {
      if (!event.target.closest('.language-switch')) setIsOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [isOpen])

  function toggle() {
    setIsOpen((open) => !open)
  }

  function select(language) {
    onLanguageChange(language)
    setIsOpen(false)
  }

  return { isOpen, toggle, select }
}
