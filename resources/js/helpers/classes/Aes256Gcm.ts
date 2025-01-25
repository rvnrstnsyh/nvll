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
 * Enhanced Aes256Gcm class for secure key exchange, encryption, and authentication
 * Implements X25519 key exchange, AES-256-GCM encryption, and HMAC-SHA-512 authentication.
 */
export default class Aes256Gcm {
  // Enhanced configuration with input validation constants.
  private static readonly CONFIG = Object.freeze({
    KEY_LENGTH: 32, // 256-bit key.
    IV_LENGTH: 12, // Standard GCM IV length.
    TAG_LENGTH: 16, // GCM authentication tag length.
    DEFAULT_MAX_AGE: 3600, // 1-hour payload expiration.
    BASE64_VARIANT: sodium.base64_variants.ORIGINAL,
    ENCODING: 'UTF-8',
    MAX_PAYLOAD_SIZE: 1024 * 1024 // 1MB max payload size.
  } as const)
  private readonly serverPublicKey: Uint8Array
  private clientPrivateKey: Uint8Array | null = null

  /**
   * Enhanced constructor with additional validation.
   *
   * @throws Error if server public key is invalid.
   */
  constructor() {
    try {
      const rawKey: string = import.meta.env.VITE_APP_PUBLIC_KEY as string
      if (!rawKey || !rawKey.startsWith('base64:')) throw new Error('Invalid server public key format')
      // Enhanced key decoding with validation.
      const decodedKey: Uint8Array<ArrayBuffer> = new Uint8Array(
        atob(rawKey.substring(7))
          .split('')
          .map((char: string): number => char.charCodeAt(0))
      )

      if (decodedKey.length !== Aes256Gcm.CONFIG.KEY_LENGTH) throw new Error('Invalid server public key length')

      this.serverPublicKey = decodedKey
    } catch (error) {
      throw new Error(`Server public key initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Enhanced input validation for encryption.
   *
   * @param value Input data to validate.
   * @param publicKey Optional public key.
   * @param hmacKey Optional HMAC key.
   */
  private validateEncryptionInput(value: Uint8Array, publicKey?: Uint8Array, hmacKey?: Uint8Array): void {
    const checks: ParamValidationCheck[] = [
      {
        condition: !value || !(value instanceof Uint8Array),
        message: 'Input must be a Uint8Array'
      },
      {
        condition: value.length === 0,
        message: 'Input cannot be empty'
      },
      {
        condition: value.length > Aes256Gcm.CONFIG.MAX_PAYLOAD_SIZE,
        message: `Input exceeds maximum size of ${Aes256Gcm.CONFIG.MAX_PAYLOAD_SIZE} bytes`
      },
      {
        condition: publicKey && (!(publicKey instanceof Uint8Array) || publicKey.length !== Aes256Gcm.CONFIG.KEY_LENGTH),
        message: 'Invalid public key'
      },
      {
        condition: hmacKey && (!(hmacKey instanceof Uint8Array) || hmacKey.length < Aes256Gcm.CONFIG.KEY_LENGTH),
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
   * Validate parameters for decryption.
   *
   * @param encryptedPayload Encrypted payload to validate.
   * @param publicKey Optional public key.
   * @param hmacKey Optional HMAC key.
   * @param maxAge Optional max age.
   * @throws {Error} If any of the parameters are invalid.
   */
  private validateDecryptionParams(encryptedPayload: string, publicKey?: Uint8Array, hmacKey?: Uint8Array, maxAge?: number): void {
    const checks: ParamValidationCheck[] = [
      {
        condition: !encryptedPayload || typeof encryptedPayload !== 'string',
        message: 'Invalid encrypted payload type'
      },
      {
        condition: encryptedPayload.trim() === '',
        message: 'Encrypted payload cannot be empty'
      },
      {
        condition: publicKey && (!(publicKey instanceof Uint8Array) || publicKey.length !== Aes256Gcm.CONFIG.KEY_LENGTH),
        message: 'Invalid public key'
      },
      {
        condition: hmacKey && (!(hmacKey instanceof Uint8Array) || hmacKey.length < Aes256Gcm.CONFIG.KEY_LENGTH),
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
   * Validates the given payload for decryption.
   *
   * @param payload Decrypted payload to validate.
   * @throws {Error} If any of the payload fields are invalid.
   */
  private validatePayload(payload: Aes256GcmPayload): void {
    const requiredKeys: (keyof Aes256GcmPayload)[] = ['iv', 'tag', 'value', 'public_key', 'issued_at', 'mac']

    // Check for missing or invalid keys.
    const invalidKeys = requiredKeys.filter((key: keyof Aes256GcmPayload) => {
      const value: string | number = payload[key]
      if (key === 'issued_at') {
        return typeof value !== 'number' || value <= 0
      }
      return !value || typeof value !== 'string' || value.trim() === ''
    })

    if (invalidKeys.length > 0) throw new Error(`Invalid payload: invalid or missing keys - ${invalidKeys.join(', ')}`)

    // Validate base64 encoded fields
    const base64Fields: (keyof Aes256GcmPayload)[] = ['iv', 'tag', 'value', 'public_key', 'mac']
    base64Fields.forEach(async (field: keyof Aes256GcmPayload) => {
      try {
        await sodium.ready
        const decoded: Uint8Array = sodium.from_base64(String(payload[field]), Aes256Gcm.CONFIG.BASE64_VARIANT)
        if (!decoded || !(decoded instanceof Uint8Array)) {
          throw new Error(`Invalid base64 encoding for ${field}`)
        }
      } catch (error) {
        throw new Error(`Invalid base64 encoding for ${field}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    })
  }

  /**
   * Enhanced key pair management methods
   */
  public isInitialized(): boolean {
    return this.clientPrivateKey !== null
  }

  /**
   * Imports a client private key from a given buffer.
   *
   * @param {Uint8Array} buffer Private key buffer.
   * @throws {Error} If the buffer is invalid.
   */
  public importPrivateKey(buffer: Uint8Array): void {
    if (!buffer || !(buffer instanceof Uint8Array) || buffer.length !== Aes256Gcm.CONFIG.KEY_LENGTH) {
      throw new Error('Invalid private key')
    }
    this.clientPrivateKey = new Uint8Array(buffer)
  }

  /**
   * Exports the client private key as a Uint8Array.
   *
   * @returns {Uint8Array} Client private key as a Uint8Array.
   * @throws {Error} If the private key is not initialized.
   */
  public exportPrivateKey(): Uint8Array {
    if (!this.clientPrivateKey) {
      throw new Error('Private key not initialized')
    }
    return new Uint8Array(this.clientPrivateKey)
  }

  /**
   * Rotate the client private key by generating a new one.
   * Use this method to periodically rotate the client private key.
   * This method will throw an error if the private key generation fails.
   */
  public async rotateKeys(): Promise<void> {
    try {
      await sodium.ready
      this.clientPrivateKey = sodium.randombytes_buf(Aes256Gcm.CONFIG.KEY_LENGTH)
    } catch (error) {
      throw new Error(`Key rotation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Encrypts the given Uint8Array value using the X25519 key exchange.
   *
   * @param value The Uint8Array to encrypt.
   * @param publicKey The public key to encrypt to. If not provided, the server public key is used.
   * @param hmacKey The HMAC key to use for the integrity check. If not provided, the shared key is used.
   * @returns A base64 encoded string containing the encrypted payload.
   * @throws {Error} If the encryption fails.
   */
  public async encrypt(value: Uint8Array, publicKey?: Uint8Array, hmacKey?: Uint8Array): Promise<string> {
    this.validateEncryptionInput(value, publicKey, hmacKey)
    try {
      await sodium.ready

      const recipientPublicKey: string = publicKey ? sodium.to_hex(publicKey) : sodium.to_hex(this.serverPublicKey)
      // Enhanced key derivation.
      const sharedKey: Uint8Array<ArrayBufferLike> = x25519.scalarMult(sodium.to_hex(this.clientPrivateKey!), recipientPublicKey)
      const finalKey: Uint8Array<ArrayBufferLike> = sodium.crypto_generichash(Aes256Gcm.CONFIG.KEY_LENGTH, sharedKey)
      // Generate secure IV.
      const iv: Uint8Array<ArrayBufferLike> = sodium.randombytes_buf(Aes256Gcm.CONFIG.IV_LENGTH)
      // Enhanced encryption with explicit tag handling.
      const encryptedContent: Uint8Array<ArrayBufferLike> = await gcm(finalKey, iv).encrypt(value)
      const cipherText: Uint8Array<ArrayBufferLike> = encryptedContent.subarray(0, -Aes256Gcm.CONFIG.TAG_LENGTH)
      const tag: Uint8Array<ArrayBufferLike> = encryptedContent.subarray(-Aes256Gcm.CONFIG.TAG_LENGTH)
      // Enhanced payload construction.
      const payload: Aes256GcmPayload = {
        iv: sodium.to_base64(iv, Aes256Gcm.CONFIG.BASE64_VARIANT),
        tag: sodium.to_base64(tag, Aes256Gcm.CONFIG.BASE64_VARIANT),
        value: sodium.to_base64(cipherText, Aes256Gcm.CONFIG.BASE64_VARIANT),
        public_key: sodium.to_base64(x25519.scalarMultBase(sodium.to_hex(this.clientPrivateKey!)), Aes256Gcm.CONFIG.BASE64_VARIANT),
        issued_at: Math.trunc(Date.now() / 1000),
        mac: ''
      }
      // Enhanced HMAC computation.
      const hmacValue: Uint8Array<ArrayBufferLike> = hmac(
        sha512,
        hmacKey || finalKey,
        sodium.from_string(
          JSON.stringify({
            iv: payload.iv,
            tag: payload.tag,
            value: payload.value,
            public_key: payload.public_key,
            issued_at: payload.issued_at
          })
        )
      )

      payload.mac = sodium.to_base64(hmacValue, Aes256Gcm.CONFIG.BASE64_VARIANT)
      // Validate final payload
      this.validatePayload(payload)

      return btoa(JSON.stringify(payload))
    } catch (error) {
      throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Decrypts the given encrypted payload using the X25519 key exchange.
   *
   * @param encryptedPayload The base64 encoded string containing the encrypted payload.
   * @param publicKey The public key to decrypt to. If not provided, the server public key is used.
   * @param hmacKey The HMAC key to use for the integrity check. If not provided, the shared key is used.
   * @param maxAge The maximum age of the payload in seconds. If not provided, the default max age is used.
   * @returns A Uint8Array containing the decrypted payload.
   * @throws {Error} If the decryption fails.
   */
  public async decrypt(encryptedPayload: string, publicKey?: Uint8Array, hmacKey?: Uint8Array, maxAge?: number): Promise<Uint8Array> {
    this.validateDecryptionParams(encryptedPayload, publicKey, hmacKey, maxAge)
    try {
      await sodium.ready

      // Enhanced payload parsing and validation.
      const payload: Aes256GcmPayload = JSON.parse(atob(encryptedPayload))
      this.validatePayload(payload)
      // Enhanced age verification.
      const currentTime: number = Math.trunc(Date.now() / 1000)
      const maxAgeLimit: number = maxAge ?? Aes256Gcm.CONFIG.DEFAULT_MAX_AGE

      if (currentTime - payload.issued_at > maxAgeLimit) throw new Error('Encrypted payload has expired')

      // Enhanced key derivation.
      const senderPublicKey: string = publicKey ? sodium.to_hex(publicKey) : sodium.to_hex(this.serverPublicKey)
      const sharedKey: Uint8Array<ArrayBufferLike> = x25519.scalarMult(sodium.to_hex(this.clientPrivateKey!), senderPublicKey)
      const finalKey: Uint8Array<ArrayBufferLike> = sodium.crypto_generichash(Aes256Gcm.CONFIG.KEY_LENGTH, sharedKey)
      // Enhanced HMAC verification.
      const hmacPayload: Omit<Aes256GcmPayload, 'mac'> = {
        iv: payload.iv,
        tag: payload.tag,
        value: payload.value,
        public_key: payload.public_key,
        issued_at: payload.issued_at
      }
      const computedHmac: Uint8Array<ArrayBufferLike> = hmac(sha512, hmacKey || finalKey, sodium.from_string(JSON.stringify(hmacPayload)))
      const providedMac: Uint8Array<ArrayBufferLike> = sodium.from_base64(payload.mac, Aes256Gcm.CONFIG.BASE64_VARIANT)

      if (sodium.compare(computedHmac, providedMac) !== 0) throw new Error('Authentication failed')
      // Enhanced decryption with explicit tag handling.
      const iv: Uint8Array<ArrayBufferLike> = sodium.from_base64(payload.iv, Aes256Gcm.CONFIG.BASE64_VARIANT)
      const tag: Uint8Array<ArrayBufferLike> = sodium.from_base64(payload.tag, Aes256Gcm.CONFIG.BASE64_VARIANT)
      const cipherText: Uint8Array<ArrayBufferLike> = sodium.from_base64(payload.value, Aes256Gcm.CONFIG.BASE64_VARIANT)
      // Combine ciphertext and tag consistently with server implementation.
      const encryptedContent: Uint8Array<ArrayBufferLike> = new Uint8Array([...cipherText, ...tag])
      // Perform decryption.
      return await gcm(finalKey, iv).decrypt(encryptedContent)
    } catch (error) {
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
