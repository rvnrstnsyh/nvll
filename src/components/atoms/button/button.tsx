import type { ReactNode } from 'react'

import { buttonStyles, buttonTextStyles, buttonLoaderStyles, loaderBarStyles } from './button.styles'

import type { ButtonProps } from './button.types'

export function Button({ variant, size, fullWidth, state, text, processing = false, className, ...props }: ButtonProps): ReactNode {
  return (
    <button nvll-ui="button" className={buttonStyles({ variant, size, fullWidth, state, processing, className })} disabled={processing || props.disabled} {...props}>
      <span className={buttonTextStyles({ processing })}>{text ?? props.children}</span>
      <div className={buttonLoaderStyles({ processing })}>
        <span className={loaderBarStyles()} />
        <span className={loaderBarStyles()} style={{ animationDelay: '0.2s' }} />
        <span className={loaderBarStyles()} style={{ animationDelay: '0.4s' }} />
      </div>
    </button>
  )
}
