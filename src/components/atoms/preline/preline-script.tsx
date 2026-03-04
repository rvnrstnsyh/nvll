'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Preline UI
async function loadPreline() {
  return import('preline')
}

export default function PrelineScript() {
  const path: string = usePathname()

  useEffect((): void => {
    const initPreline = async (): Promise<void> => {
      await loadPreline()
    }
    initPreline()
  }, [])

  useEffect((): void => {
    setTimeout((): void => {
      if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
        window.HSStaticMethods.autoInit()
      }
    }, 100)
  }, [path])

  return null
}
