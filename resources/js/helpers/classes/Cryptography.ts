import sodium from 'libsodium-wrappers'

import { gcm } from '@noble/ciphers/webcrypto'
import { x25519 } from '@noble/curves/ed25519'
import { hmac } from '@noble/hashes/hmac'
import { sha512 } from '@noble/hashes/sha512'

interface ParamValidationCheck {
  condition: boolean | undefined
  message: string
}

/**
 * Enhanced Cryptography class for secure key exchange, encryption, and authentication
 * Implements X25519 key exchange, AES-256-GCM encryption, and HMAC-SHA-512 authentication
 */
export default class Cryptography {
  // Immutable configuration for cryptographic parameters
  private static readonly CONFIG: { [key: string]: number } = Object.freeze({
    KEY_LENGTH: 32, // 256-bit key
    IV_LENGTH: 12, // Standard GCM IV length
    TAG_LENGTH: 16, // GCM authentication tag length
    DEFAULT_MAX_AGE: 3600, // 1-hour payload expiration
    BASE64_VARIANT: sodium.base64_variants.ORIGINAL
  })

  private readonly serverPublicKey: Uint8Array
  private clientPrivateKey: Uint8Array | null = null

  /**
   * Securely initializes the cryptography instance by decoding the server public key from the
   * `VITE_APP_PUBLIC_KEY` environment variable. The key is expected to be a Base64-encoded string
   * prefixed with "base64:". If the key is not provided or is invalid, an error is thrown.
   */
  constructor() {
    try {
      // Securely decode server public key from environment variable
      this.serverPublicKey = new Uint8Array(
        atob((import.meta.env.VITE_APP_PUBLIC_KEY as string).substring(7))
          .split('')
          .map((char) => char.charCodeAt(0))
      )
    } catch (error) {
      throw new Error(`Server public key initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Validates the parameters for the {@link encrypt} method.
   * @param value The value to be encrypted, which must be a non-empty Uint8Array.
   * @param publicKey The public key to use for encryption, which must be a Uint8Array of length {@link CONFIG.KEY_LENGTH}.
   * @param hmacKey The HMAC key to use for authentication, which must be a Uint8Array of length at least {@link CONFIG.KEY_LENGTH}.
   * @throws {Error} If any of the parameters are invalid.
   */
  private validateEncryptionParams(value: Uint8Array, publicKey?: Uint8Array, hmacKey?: Uint8Array): void {
    const checks: ParamValidationCheck[] = [
      {
        condition: !value || !(value instanceof Uint8Array) || value.length === 0,
        message: 'Invalid value: Must be a non-empty Uint8Array'
      },
      {
        condition: publicKey && (!(publicKey instanceof Uint8Array) || publicKey.length !== Cryptography.CONFIG.KEY_LENGTH),
        message: 'Invalid public key'
      },
      {
        condition: hmacKey && (!(hmacKey instanceof Uint8Array) || hmacKey.length < Cryptography.CONFIG.KEY_LENGTH),
        message: 'Invalid HMAC key'
      },
      {
        condition: !this.clientPrivateKey,
        message: 'Cryptographic keys are not initialized'
      }
    ]
    const failed: ParamValidationCheck | undefined = checks.find((check) => check.condition)
    if (failed) throw new Error(failed.message)
  }

  /**
   * Validates the parameters for the {@link decrypt} method.
   * @throws {Error} If any of the parameters are invalid.
   * @param encryptedPayload The encrypted payload to be decrypted, which must be a non-empty string.
   * @param publicKey The public key to use for decryption, which must be a Uint8Array of length {@link CONFIG.KEY_LENGTH}.
   * @param hmacKey The HMAC key to use for authentication, which must be a Uint8Array of length at least {@link CONFIG.KEY_LENGTH}.
   * @param maxAge The maximum age of the payload in seconds, which must be a non-negative number.
   */
  private validateDecryptionParams(encryptedPayload: string, publicKey?: Uint8Array, hmacKey?: Uint8Array, maxAge?: number): void {
    const checks: ParamValidationCheck[] = [
      {
        condition: !encryptedPayload || typeof encryptedPayload !== 'string' || encryptedPayload.trim() === '',
        message: 'Invalid encrypted payload'
      },
      {
        condition: publicKey && (!(publicKey instanceof Uint8Array) || publicKey.length !== Cryptography.CONFIG.KEY_LENGTH),
        message: 'Invalid public key'
      },
      {
        condition: hmacKey && (!(hmacKey instanceof Uint8Array) || hmacKey.length < Cryptography.CONFIG.KEY_LENGTH),
        message: 'Invalid HMAC key'
      },
      {
        condition: maxAge !== undefined && (typeof maxAge !== 'number' || maxAge < 0),
        message: 'Invalid max age'
      },
      {
        condition: !this.clientPrivateKey,
        message: 'Cryptographic keys are not initialized'
      }
    ]
    const failed: ParamValidationCheck | undefined = checks.find((check) => check.condition)
    if (failed) throw new Error(failed.message)
  }

  /**
   * Validates the payload of a decrypted message.
   * @throws {Error} If any of the required keys are missing or empty.
   * @param payload The decrypted payload to be validated.
   */
  private validatePayload(payload: CryptographyPayload): void {
    const requiredKeys: (keyof CryptographyPayload)[] = ['iv', 'tag', 'value', 'public_key', 'issued_at', 'mac']
    // Check for missing or empty keys
    const missingKeys: (keyof CryptographyPayload)[] = requiredKeys.filter(
      (key) => !payload[key] || (typeof payload[key] === 'string' && payload[key].length === 0)
    )

    if (missingKeys.length > 0) throw new Error(`Invalid payload: missing keys - ${missingKeys.join(', ')}`)
  }

  /**
   * Determines if the client private key is initialized.
   * @returns {boolean} `true` if the key is initialized, `false` otherwise.
   */
  public isInitialized(): boolean {
    return this.clientPrivateKey !== null
  }

  /**
   * Imports a client private key.
   * @param {Uint8Array} buffer The private key to be imported, which must be a Uint8Array of length
   * {@link CONFIG.KEY_LENGTH}.
   * @throws {Error} If the buffer is invalid.
   */
  public importPrivateKey(buffer: Uint8Array): void {
    if (!buffer || !(buffer instanceof Uint8Array) || buffer.length !== Cryptography.CONFIG.KEY_LENGTH) {
      throw new Error('Invalid private key')
    }
    this.clientPrivateKey = buffer
  }

  /**
   * Exports the client private key as a Uint8Array.
   * @returns {Uint8Array} The client private key as a Uint8Array.
   * @throws {Error} If the client private key is not initialized.
   */
  public exportPrivateKey(): Uint8Array {
    if (!this.clientPrivateKey) {
      throw new Error('Private key not initialized')
    }
    return new Uint8Array(this.clientPrivateKey)
  }

  /**
   * Rotates the client private key by generating a new one.
   * @throws {Error} If the key rotation fails.
   */
  public rotateKeys(): void {
    try {
      this.clientPrivateKey = sodium.randombytes_buf(Cryptography.CONFIG.KEY_LENGTH)
    } catch (error) {
      throw new Error(`Key rotation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Encrypts a value with AES-256-GCM and authenticates it with HMAC-SHA-512.
   * @param value The value to be encrypted, which must be a Uint8Array.
   * @param publicKey The public key to use for encryption, which must be a Uint8Array of length {@link CONFIG.KEY_LENGTH}.
   * @param hmacKey The HMAC key to use for authentication, which must be a Uint8Array of length at least {@link CONFIG.KEY_LENGTH}.
   * @returns {Promise<string>} A promise that resolves to a Base64-encoded string containing the encrypted value and authentication tag.
   * @throws {Error} If the encryption or authentication fails.
   */
  public async encrypt(value: Uint8Array, publicKey?: Uint8Array, hmacKey?: Uint8Array): Promise<string> {
    // Validate parameters first
    this.validateEncryptionParams(value, publicKey, hmacKey)
    try {
      await sodium.ready // Ensure sodium is fully initialized

      const recipientPublicKey: string = publicKey ? sodium.to_hex(publicKey) : sodium.to_hex(this.serverPublicKey)
      // Compute shared key with enhanced type conversion
      const sharedKey: Uint8Array = x25519.scalarMult(sodium.to_hex(this.clientPrivateKey!), recipientPublicKey)
      // Enhanced key derivation (BLAKE2b)
      const finalKey: Uint8Array = sodium.crypto_generichash(Cryptography.CONFIG.KEY_LENGTH, sharedKey)
      // Generate cryptographically secure IV
      const iv: Uint8Array = sodium.randombytes_buf(Cryptography.CONFIG.IV_LENGTH)
      // Encrypt with AES-256-GCM
      const encryptedContent: Uint8Array = await gcm(finalKey, iv).encrypt(value)
      // Prepare payload
      const payload: CryptographyPayload = {
        iv: sodium.to_base64(iv, Cryptography.CONFIG.BASE64_VARIANT),
        tag: sodium.to_base64(encryptedContent.subarray(-Cryptography.CONFIG.TAG_LENGTH), Cryptography.CONFIG.BASE64_VARIANT),
        value: sodium.to_base64(encryptedContent.subarray(0, -Cryptography.CONFIG.TAG_LENGTH), Cryptography.CONFIG.BASE64_VARIANT),
        public_key: sodium.to_base64(x25519.scalarMultBase(sodium.to_hex(this.clientPrivateKey!)), Cryptography.CONFIG.BASE64_VARIANT),
        issued_at: Math.trunc(Date.now() / 1000),
        mac: ''
      }
      // Compute HMAC with secure JSON serialization
      const payloadForHmac: Omit<CryptographyPayload, 'mac'> = {
        iv: payload.iv,
        tag: payload.tag,
        value: payload.value,
        public_key: payload.public_key,
        issued_at: payload.issued_at
      }
      const hmacValue: Uint8Array = hmac(sha512, hmacKey || finalKey, sodium.from_string(JSON.stringify(payloadForHmac)))
      // Set MAC
      payload.mac = sodium.to_base64(hmacValue, Cryptography.CONFIG.BASE64_VARIANT)
      // Return encrypted payload as Base64-encoded string
      return btoa(JSON.stringify(payload))
    } catch (error) {
      throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Decrypts a value with AES-256-GCM and verifies its authenticity with HMAC-SHA-512.
   * @param encryptedPayload The encrypted value to be decrypted, which must be a Base64-encoded string.
   * @param publicKey The public key to use for decryption, which must be a Uint8Array of length {@link CONFIG.KEY_LENGTH}.
   * @param hmacKey The HMAC key to use for authentication, which must be a Uint8Array of length at least {@link CONFIG.KEY_LENGTH}.
   * @param maxAge The maximum age of the payload in seconds, which must be a non-negative number.
   * @returns {Promise<Uint8Array>} A promise that resolves to the decrypted value as a Uint8Array.
   * @throws {Error} If the decryption or authentication fails.
   */
  public async decrypt(encryptedPayload: string, publicKey?: Uint8Array, hmacKey?: Uint8Array, maxAge?: number): Promise<Uint8Array> {
    // Validate parameters first
    this.validateDecryptionParams(encryptedPayload, publicKey, hmacKey, maxAge)
    try {
      await sodium.ready // Ensure sodium is fully initialized

      // Decode payload with error handling
      const decodedPayload: CryptographyPayload = JSON.parse(atob(encryptedPayload))
      // Validate payload structure
      this.validatePayload(decodedPayload)
      // Check payload age with configurable max age
      const currentTime: number = Math.trunc(Date.now() / 1000)
      const maxAgeLimit: number = maxAge || Cryptography.CONFIG.DEFAULT_MAX_AGE

      if (currentTime - decodedPayload.issued_at > maxAgeLimit) throw new Error('Encrypted payload has expired')

      // Compute shared key
      const senderPublicKey: string = publicKey ? sodium.to_hex(publicKey) : sodium.to_hex(this.serverPublicKey)
      // Compute shared key with enhanced type conversion
      const sharedKey: Uint8Array = x25519.scalarMult(sodium.to_hex(this.clientPrivateKey!), senderPublicKey)
      // Enhanced key derivation (BLAKE2b)
      const finalKey: Uint8Array = sodium.crypto_generichash(Cryptography.CONFIG.KEY_LENGTH, sharedKey)
      // Verify HMAC with payload components
      const payloadForHmac: Omit<CryptographyPayload, 'mac'> = {
        iv: decodedPayload.iv,
        tag: decodedPayload.tag,
        value: decodedPayload.value,
        public_key: decodedPayload.public_key,
        issued_at: decodedPayload.issued_at
      }
      const computedHmac: Uint8Array = hmac(sha512, hmacKey || finalKey, sodium.from_string(JSON.stringify(payloadForHmac)))
      // Decode MAC and perform timing-safe comparison
      const providedMac: Uint8Array = sodium.from_base64(decodedPayload.mac, Cryptography.CONFIG.BASE64_VARIANT)

      if (sodium.compare(computedHmac, providedMac) !== 0) throw new Error('Authentication failed')

      // Decode and combine components
      const iv: Uint8Array = sodium.from_base64(decodedPayload.iv, Cryptography.CONFIG.BASE64_VARIANT)
      const tag: Uint8Array = sodium.from_base64(decodedPayload.tag, Cryptography.CONFIG.BASE64_VARIANT)
      const cipherText: Uint8Array = sodium.from_base64(decodedPayload.value, Cryptography.CONFIG.BASE64_VARIANT)
      // Combine cipher text and authentication tag
      const encryptedContent: Uint8Array = new Uint8Array([...cipherText, ...tag])
      // Decrypt the payload
      return await gcm(finalKey, iv).decrypt(encryptedContent)
    } catch (error) {
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
