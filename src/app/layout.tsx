import '@/styles/index.css'

import PrelineScriptWrapper from '@/components/csr/preline/preline-script-wrapper'

import type { Metadata } from 'next'

import { JSX } from 'react'
import { Montserrat } from 'next/font/google'
import { NextFontWithVariable } from 'next/dist/compiled/@next/font'

const montserrat: NextFontWithVariable = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Non-Violable Liberty Layers',
  description: 'Privacy-oriented public service designed with user security and privacy in mind'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html lang="EN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
                const theme = localStorage.getItem('hs_theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = theme ? theme === 'dark' || (theme === 'auto' && prefersDark) : prefersDark;
                if (isDark) {
                  document.documentElement.classList.add('dark');
                }
              })()`
          }}
        />
      </head>
      <body className={`${montserrat.className} antialiased`}>{children}</body>
      <PrelineScriptWrapper />
    </html>
  )
}
