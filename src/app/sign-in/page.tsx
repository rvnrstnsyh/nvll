import type { ReactNode } from 'react'

import { SignInFeature } from '@/features/sign-in-feature'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Non-Violable Liberty Layers',
  description: 'Privacy-oriented public service designed with user security and privacy in mind'
}

export default function SignInPage(): ReactNode {
  return <SignInFeature />
}
