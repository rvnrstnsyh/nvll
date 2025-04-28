import { getEnv } from '../lib/environment.ts'

const APP_CLIENT_SCRIPTS: Readonly<boolean> = getEnv.boolean('/app/client_scripts')

export const anchorRel: Readonly<string> = 'noreferrer nofollow noopener'
export const anchorTarget: Readonly<string | undefined> = APP_CLIENT_SCRIPTS ? '_blank' : undefined
