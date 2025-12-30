'use client'

import dynamic from 'next/dynamic'

import { JSX } from 'react'

const PrelineScript = dynamic(() => import('@/components/csr/preline/preline-script'), {
  ssr: false
})

export default function PrelineScriptWrapper(): JSX.Element {
  return <PrelineScript />
}
