import type { ReactNode } from 'react'

import { Button } from '@/components/atoms/button'
import { ThemeSwitcher } from '@/components/atoms/theme-switcher'

import { homeCTAStyles } from './home-cta.styles'

import type { HomeCTAProps } from './home-cta.types'

export function HomeCTA({ className, ...props }: HomeCTAProps): ReactNode {
  return (
    <div nvll-ui="home-cta" className={homeCTAStyles({ className })} {...props}>
      <a href="/sign-in">
        <Button type="button" variant="primary" state="hover">
          Clientzone
        </Button>
      </a>
      <a href="/sign-up">
        <Button type="button" variant="outlinePrimary" state="hover">
          Sign Up
        </Button>
      </a>
      <ThemeSwitcher size="sm" />
    </div>
  )
}
