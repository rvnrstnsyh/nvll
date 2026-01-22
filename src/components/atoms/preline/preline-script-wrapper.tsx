'use client'

import type { ReactNode } from 'react'

import dynamic from 'next/dynamic'

const PrelineScript = dynamic(() => import('@/components/atoms/preline/preline-script'), {
  ssr: false
})

export default function PrelineScriptWrapper(): ReactNode {
  return <PrelineScript />
}
