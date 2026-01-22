import type { ReactNode } from 'react'

import { EpochInfo } from '@/components/atoms/epoch-info'
import { GreenwichClock } from '@/components/atoms/greenwich-clock'

import { homeInfoStyles, homeInfoItemStyles } from './home-info.styles'

import type { HomeInfoProps } from './home-info.types'

export function HomeInfo({ epochValue, showClock = true, className, ...props }: HomeInfoProps): ReactNode {
  return (
    <div nvll-ui="home-info" className={homeInfoStyles({ className })} {...props}>
      <EpochInfo value={epochValue} size="sm" />
      {showClock && (
        <span className={homeInfoItemStyles()}>
          <GreenwichClock size="sm" />
        </span>
      )}
    </div>
  )
}
