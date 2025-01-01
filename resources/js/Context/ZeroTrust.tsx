import Cryptography from '@/helpers/classes/Cryptography'

import { createContext, useContext, useEffect, useMemo } from 'react'

interface contextType {
  cryptography: Cryptography
}

const ZeroTrustContext: React.Context<contextType | undefined> = createContext<contextType | undefined>(undefined)

/**
 * ZeroTrustProvider is a React context provider that initializes and provides a
 * Cryptography instance to its children. The Cryptography instance manages the
 * encryption keys and rotates them on initialization to ensure security.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child components that will have access
 * to the Cryptography instance via the ZeroTrustContext.
 * @returns {JSX.Element} A context provider wrapping the children components.
 */
export const ZeroTrustProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const cryptography: Cryptography = useMemo(() => new Cryptography(), [])
  useEffect(() => {
    /**
     * Initializes the Cryptography instance by rotating its keys.
     * Logs a warning if key rotation fails.
     * @returns {Promise<void>} A promise that resolves when the keys are rotated.
     */
    const initialize = async (): Promise<void> => {
      try {
        await cryptography.rotateKeys()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('ZeroTrust failed to rotate cryptography keys:', (error as Error).message)
      }
    }
    initialize()
  }, [cryptography])
  return <ZeroTrustContext.Provider value={{ cryptography }}>{children}</ZeroTrustContext.Provider>
}

/**
 * useZeroTrust is a React hook that provides access to the Cryptography instance
 * provided by the ZeroTrustProvider context. The Cryptography instance is used
 * to encrypt and decrypt sensitive data.
 *
 * @returns {contextType} The contextType object containing the Cryptography instance.
 * @throws {Error} If useZeroTrust is called outside of a ZeroTrustProvider.
 */
export const useZeroTrust = (): contextType => {
  const context: contextType | undefined = useContext(ZeroTrustContext)
  if (context === undefined) {
    throw new Error('useZeroTrust() hook must be used within a ZeroTrustProvider')
  }
  return context
}
