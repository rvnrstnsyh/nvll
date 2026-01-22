'use client'

import { useState, useEffect } from 'react'

import type { ReactNode } from 'react'

import { themeSwitcherStyles, sunMoonWrapperStyles, sunMoonBeforeStyles, sunMoonAfterStyles } from './theme-switcher.styles'

import type { ThemeSwitcherProps } from './theme-switcher.types'

export function ThemeSwitcher({ size, onThemeChange, className, ...props }: ThemeSwitcherProps): ReactNode {
  const [mounted, setMounted] = useState<boolean>(false)
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    const id: NodeJS.Timeout = setTimeout((): void => {
      setMounted(true)
      // Check localStorage first
      const storedTheme: string | null = localStorage.getItem('hs_theme')
      // If exists in localStorage, use that value
      if (storedTheme) {
        setIsDark(storedTheme === 'dark')
      } else {
        // If not in localStorage, check if HTML already has 'dark' class
        // (which was set by the script in layout.tsx based on prefers-color-scheme)
        const htmlHasDarkClass: boolean = document.documentElement.classList.contains('dark')
        setIsDark(htmlHasDarkClass)
        // Save to localStorage for consistency
        if (htmlHasDarkClass) {
          localStorage.setItem('hs_theme', 'dark')
        } else {
          localStorage.setItem('hs_theme', 'default')
        }
      }
    }, 0)

    const handleStorageChange = (): void => {
      const storedTheme: string | null = localStorage.getItem('hs_theme')
      if (storedTheme) {
        setIsDark(storedTheme === 'dark')
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return (): void => {
      clearTimeout(id)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const toggleTheme = (): void => {
    const next: boolean = !isDark
    setIsDark(next)
    const value: 'dark' | 'default' = next ? 'dark' : 'default'
    localStorage.setItem('hs_theme', value)
    document.documentElement.classList.toggle('dark', next)
    window.dispatchEvent(new CustomEvent('hs:theme-change', { detail: { theme: value } }))
    onThemeChange?.(next)
  }

  const theme: 'dark' | 'light' = isDark ? 'dark' : 'light'

  if (!mounted) {
    return (
      <button nvll-ui="theme-switcher" type="button" aria-label="Toggle theme" className={themeSwitcherStyles({ size, className })} {...props}>
        <div className={sunMoonWrapperStyles({ theme: 'light' })}>
          <div className={sunMoonBeforeStyles({ theme: 'light' })} />
          <div className={sunMoonAfterStyles({ theme: 'light' })} />
        </div>
      </button>
    )
  }

  return (
    <button nvll-ui="theme-switcher" type="button" onClick={toggleTheme} aria-label="Toggle theme" className={themeSwitcherStyles({ size, className })} {...props}>
      <div className={sunMoonWrapperStyles({ theme })}>
        <div className={sunMoonBeforeStyles({ theme })} />
        <div className={sunMoonAfterStyles({ theme })} />
      </div>
    </button>
  )
}
