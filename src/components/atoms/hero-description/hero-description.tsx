import type { ReactNode } from 'react'

import { heroDescriptionStyles } from './hero-description.styles'

import type { HeroDescriptionProps } from './hero-description.types'

export function HeroDescription({ children, className, ...props }: HeroDescriptionProps): ReactNode {
  const defaultText: ReactNode = (
    <>
      <span className="font-bold">Non-Violable Liberty Layers</span> is a privacy-oriented public service designed with user security and privacy in mind—misuse may result in consequences.
    </>
  )

  return (
    <p nvll-ui="hero-description" className={heroDescriptionStyles({ className })} {...props}>
      {children || defaultText}
    </p>
  )
}
