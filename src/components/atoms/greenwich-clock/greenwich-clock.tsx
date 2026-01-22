'use client'

import { useState, useEffect } from 'react'

import type { ReactNode } from 'react'

import { greenwichClockStyles, clockTimeStyles, clockLabelStyles } from './greenwich-clock.styles'

import type { GreenwichClockProps } from './greenwich-clock.types'

export function GreenwichClock({ variant, size, showLabel = true, label = 'Greenwich', updateInterval = 1000, onTimeChange, className, ...props }: GreenwichClockProps): ReactNode {
  const [time, setTime] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
    const update = (): void => {
      const formattedTime: string = formatter.format(new Date())
      setTime(formattedTime)
      setIsLoading(false)
      onTimeChange?.(formattedTime)
    }
    update() // initial render
    const interval: NodeJS.Timeout = setInterval(update, updateInterval)
    return (): void => clearInterval(interval)
  }, [updateInterval, onTimeChange])

  return (
    <span nvll-ui="greenwich-clock" className={greenwichClockStyles({ size, variant, loading: isLoading, className })} {...props}>
      <span className={clockTimeStyles()}>{time || '00:00:00'}</span>
      {showLabel && <span className={clockLabelStyles()}>{label}</span>}
    </span>
  )
}
