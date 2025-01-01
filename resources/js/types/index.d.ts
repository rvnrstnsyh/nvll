import { Config } from 'ziggy-js'

export interface User {
  id: string
  name: string
  email: string
  role: string
  email_verified_at?: string
  created_at?: string
  updated_at?: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User
  }
  ziggy: Config & { location: string }
}
