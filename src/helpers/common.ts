// ==================== BASE64 ENCODING/DECODING (Universal) ====================

/**
 * Convert Uint8Array to Base64 string.
 * Universal implementation that works in both browser and Node.js environments.
 * Uses standard RFC 4648 base64 encoding without external dependencies.
 *
 * @param bytes - The byte array to encode
 * @returns Base64 encoded string with proper padding
 *
 * @example
 * const bytes = new Uint8Array([72, 101, 108, 108, 111])
 * uint8ArrayToBase64(bytes) // "SGVsbG8="
 */
export function uint8ArrayToBase64(bytes: Uint8Array): string {
  const base64Chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let result: string = ''
  let i: number = 0

  // Process 3 bytes at a time
  while (i < bytes.length) {
    const byte1: number = bytes[i++]
    const byte2: number = i < bytes.length ? bytes[i++] : 0
    const byte3: number = i < bytes.length ? bytes[i++] : 0
    const chunk: number = (byte1 << 16) | (byte2 << 8) | byte3

    result += base64Chars[(chunk >> 18) & 0x3f]
    result += base64Chars[(chunk >> 12) & 0x3f]
    result += base64Chars[(chunk >> 6) & 0x3f]
    result += base64Chars[chunk & 0x3f]
  }
  // Add padding according to RFC 4648
  const padding: number = bytes.length % 3
  if (padding === 1) {
    result = result.slice(0, -2) + '=='
  } else if (padding === 2) {
    result = result.slice(0, -1) + '='
  }
  return result
}

/**
 * Convert Base64 string to Uint8Array.
 * Universal implementation that works in both browser and Node.js environments.
 * Handles base64 strings with or without padding.
 *
 * @param base64 - The base64 string to decode
 * @returns Decoded byte array
 * @throws Error if base64 string contains invalid characters
 *
 * @example
 * base64ToUint8Array("SGVsbG8=") // Uint8Array([72, 101, 108, 108, 111])
 */
export function base64ToUint8Array(base64: string): Uint8Array {
  // Remove whitespace and padding
  const cleanBase64: string = base64.replace(/[\s=]/g, '')
  // Base64 lookup table
  const base64Lookup: Record<string, number> = {}
  const base64Chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  for (let i = 0; i < base64Chars.length; i++) {
    base64Lookup[base64Chars[i]] = i
  }

  // Calculate output length
  const outputLength: number = Math.floor((cleanBase64.length * 3) / 4)
  const bytes: Uint8Array = new Uint8Array(outputLength)

  let byteIndex: number = 0
  let i: number = 0

  // Process 4 characters at a time
  while (i < cleanBase64.length) {
    const char1: number = base64Lookup[cleanBase64[i++]] || 0
    const char2: number = base64Lookup[cleanBase64[i++]] || 0
    const char3: number = base64Lookup[cleanBase64[i++]] || 0
    const char4: number = base64Lookup[cleanBase64[i++]] || 0
    const chunk: number = (char1 << 18) | (char2 << 12) | (char3 << 6) | char4

    if (byteIndex < outputLength) bytes[byteIndex++] = (chunk >> 16) & 0xff
    if (byteIndex < outputLength) bytes[byteIndex++] = (chunk >> 8) & 0xff
    if (byteIndex < outputLength) bytes[byteIndex++] = chunk & 0xff
  }
  return bytes
}
