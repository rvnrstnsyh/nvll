const APP_CLIENT_SCRIPTS: Readonly<boolean> = JSON.parse(Deno.env.get('APP_CLIENT_SCRIPTS') || 'false')

export const anchorRel: Readonly<string> = 'noreferrer nofollow noopener'
export const anchorTarget: Readonly<string | undefined> = APP_CLIENT_SCRIPTS ? '_blank' : undefined
