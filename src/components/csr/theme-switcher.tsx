'use client'

import { JSX, useState } from 'react'

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('hs_theme') === 'dark'
}

export default function ThemeSwitcher(): JSX.Element {
  const [isDark, setIsDark] = useState<boolean>(getInitialTheme)

  const toggleTheme = (): void => {
    const next: boolean = !isDark
    setIsDark(next)
    const value: 'dark' | 'default' = next ? 'dark' : 'default'
    localStorage.setItem('hs_theme', value)
    document.documentElement.classList.toggle('dark', next)
    // Preline / HS Dark Mode sync
    window.dispatchEvent(
      new CustomEvent('hs:theme-change', {
        detail: { theme: value }
      })
    )
  }

  return (
    <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="hs-dark-mode flex items-center justify-center text-gray-600 hover:text-blue-600 transition">
      {/* Moon */}
      <svg className={`${isDark ? 'hidden' : 'block'} size-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      {/* Sun */}
      <svg className={`${isDark ? 'block' : 'hidden'} size-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    </button>
  )
}
