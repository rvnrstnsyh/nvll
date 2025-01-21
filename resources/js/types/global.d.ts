import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { AxiosInstance } from 'axios'
import { IStaticMethods } from 'preline/preline'
import { route as ziggyRoute } from 'ziggy-js'
import { PageProps as AppPageProps } from './'

declare global {
  interface Window {
    axios: AxiosInstance
    HSStaticMethods: IStaticMethods
  }

  /* eslint-disable no-var */
  var route: typeof ziggyRoute

  /**
   * Interface representing the encrypted payload structure
   */
  interface Aes256GcmPayload {
    /**
     * Base64 encoded Initialization Vector
     */
    iv: string

    /**
     * Base64 encoded Authentication Tag
     */
    tag: string

    /**
     * Base64 encoded Encrypted Value
     */
    value: string

    /**
     * Sender's Base64 public key
     */
    public_key: string

    /**
     * Timestamp when the payload was issued
     */
    issued_at: number

    /**
     * Base64 encoded Message Authentication Code (HMAC)
     */
    mac: string
  }
}

declare module '@inertiajs/core' {
  interface PageProps extends InertiaPageProps, AppPageProps {}
}
