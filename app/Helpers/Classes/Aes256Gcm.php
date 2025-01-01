<?php

namespace App\Helpers\Classes;

use TypeError;
use JsonException;
use RuntimeException;
use InvalidArgumentException;

/**
 * Secure AES-256-GCM Encryption Utility
 * 
 * Provides robust, authenticated encryption with key derivation and integrity checks.
 * Utilizes Elliptic Curve Diffie-Hellman (ECDH) for secure key exchange.
 */
class Aes256Gcm
{
  // Cryptographic constants
  private const CIPHER_ALGO = 'AES-256-GCM';
  private const HASH_ALGO = 'SHA512';
  private const KEY_LENGTH = 32; // 256-bit key
  private const IV_LENGTH = 12;
  private const TAG_LENGTH = 16;
  private const DEFAULT_MAX_AGE = 3600; // 1 hour default expiration

  // Prevent direct instantiation and cloning
  private function __construct() {}
  private function __clone() {}

  /**
   * Derive a secure shared encryption key using ECDH and key derivation function
   * 
   * @param string $publicKey Base64 encoded client public key
   * @return string Derived 256-bit encryption key
   * @throws RuntimeException If key derivation fails
   */
  private static function deriveKey(string $publicKey): string
  {
    // Safely extract and decode server private key
    $serverPrivateKey = self::safeBase64Decode(substr(env('APP_KEY'), 7), SODIUM_CRYPTO_BOX_SECRETKEYBYTES);
    // Safely extract and decode client public key
    $clientPublicKey = self::safeBase64Decode($publicKey, SODIUM_CRYPTO_BOX_PUBLICKEYBYTES);
    // Perform scalar multiplication for shared secret
    $sharedKey = sodium_crypto_scalarmult($serverPrivateKey, $clientPublicKey);
    // Ensure shared key is not empty
    if (!$sharedKey || !is_string($sharedKey)) throw new RuntimeException('Failed to derive shared encryption key');
    // BLAKE2b for key derivation with cryptographic salt
    $finalKey = sodium_crypto_generichash($sharedKey, '', self::KEY_LENGTH);
    // Ensure derived key has the correct length
    if (strlen($finalKey) !== self::KEY_LENGTH) throw new RuntimeException('Derived key has an invalid length');

    return $finalKey;
  }

  /**
   * Safely decode base64 encoded keys with length validation
   * 
   * @param string $encodedValue Base64 encoded value
   * @param int $expectedLength Expected key length
   * @return string Decoded key
   * @throws InvalidArgumentException If decoding fails
   */
  private static function safeBase64Decode(string $encodedValue, int $expectedLength): string
  {
    $decodedValue = base64_decode($encodedValue, true);
    if (!$decodedValue || strlen($decodedValue) !== $expectedLength) {
      throw new InvalidArgumentException('Invalid or malformed key');
    }
    return $decodedValue;
  }

  /**
   * Validate encryption payload structure
   * 
   * @param array $payload Encryption payload
   * @throws RuntimeException If payload is invalid
   */
  private static function validatePayload(array $payload): void
  {
    $requiredKeys = ['iv', 'tag', 'value', 'public_key', 'issued_at', 'mac'];
    foreach ($requiredKeys as $key) {
      if (!isset($payload[$key]) || empty($payload[$key])) {
        throw new RuntimeException("Invalid payload: missing or empty $key");
      }
    }
  }

  /**
   * Encrypt data using AES-256-GCM with authenticated encryption
   * 
   * @param mixed $value Data to encrypt
   * @param string $publicKey Client's public key
   * @param string|null $hmacKey Optional separate HMAC key
   * @return string Base64 encoded encrypted payload
   * @throws TypeError If input is invalid
   * @throws RuntimeException If encryption fails
   */
  public static function encrypt($value, string $publicKey, ?string $hmacKey = null): string
  {
    // Prevent encryption of null values
    if ($value === null) throw new TypeError('Encryption input cannot be null');
    try {
      // Serialize input value
      $serializedValue = is_string($value) ? $value : json_encode($value, JSON_THROW_ON_ERROR);
      $sharedKey = self::deriveKey($publicKey);
      $hmacKeyToUse = $hmacKey ? self::safeBase64Decode($hmacKey, self::KEY_LENGTH) : $sharedKey;
      // Generate cryptographically secure initialization vector
      $iv = random_bytes(self::IV_LENGTH);
      // Authenticated encryption
      $tag = '';
      $cipherText = openssl_encrypt($serializedValue, self::CIPHER_ALGO, $sharedKey, OPENSSL_RAW_DATA, $iv, $tag, '', self::TAG_LENGTH);

      if ($cipherText === false) throw new RuntimeException('Encryption process failed');

      // Construct payload
      $payload = [
        'iv' => base64_encode($iv),
        'tag' => base64_encode($tag),
        'value' => base64_encode($cipherText),
        'public_key' => substr(env('VITE_APP_PUBLIC_KEY'), 7),
        'issued_at' => time()
      ];
      // Compute HMAC for payload integrity
      $hmac = hash_hmac(self::HASH_ALGO, json_encode($payload, JSON_UNESCAPED_SLASHES), $hmacKeyToUse, true);
      $payload['mac'] = base64_encode($hmac);
      // Final base64 encoded JSON payload
      return base64_encode(json_encode($payload, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES));
    } catch (JsonException $error) {
      throw new RuntimeException('Payload serialization failed: ' . $error->getMessage());
    }
  }

  /**
   * Decrypt authenticated payload with optional age verification
   * 
   * @param string $encryptedPayload Base64 encoded encrypted payload
   * @param string|null $publicKey Optional client public key
   * @param string|null $hmacKey Optional HMAC key
   * @param int $maxAge Maximum payload age in seconds
   * @return string Decrypted payload
   * @throws TypeError If input is empty
   * @throws RuntimeException If decryption fails
   */
  public static function decrypt(string $encryptedPayload, ?string $publicKey = null, ?string $hmacKey = null, int $maxAge = self::DEFAULT_MAX_AGE): string
  {
    if (empty($encryptedPayload)) throw new TypeError('Decryption input cannot be empty');
    try {
      // Decode and parse payload
      $decodedPayload = base64_decode($encryptedPayload, true);
      $payload = json_decode($decodedPayload, true, 512, JSON_THROW_ON_ERROR);
      // Validate payload structure
      self::validatePayload($payload);
      // Derive decryption key
      $sharedKey = $publicKey ? self::deriveKey($publicKey) : self::deriveKey($payload['public_key']);
      // Prepare HMAC key
      $hmacKeyToUse = $hmacKey ? self::safeBase64Decode($hmacKey, self::KEY_LENGTH) : $sharedKey;
      // Verify payload integrity
      $payloadForHmac = $payload;
      unset($payloadForHmac['mac']);
      $computedHmac = hash_hmac(self::HASH_ALGO, json_encode($payloadForHmac, JSON_UNESCAPED_SLASHES), $hmacKeyToUse, true);

      // Constant-time HMAC comparison
      if (!hash_equals(base64_decode($payload['mac'], true), $computedHmac)) throw new RuntimeException('Payload authentication failed');
      // Check payload age
      if (time() - $payload['issued_at'] > $maxAge) throw new RuntimeException('Encrypted payload has expired');

      // Decode and decrypt payload
      $iv = self::safeBase64Decode($payload['iv'], self::IV_LENGTH);
      $tag = self::safeBase64Decode($payload['tag'], self::TAG_LENGTH);
      $cipherText = base64_decode($payload['value'], true);
      // Decrypt payload
      $decryptedValue = openssl_decrypt($cipherText, self::CIPHER_ALGO, $sharedKey, OPENSSL_RAW_DATA, $iv, $tag);

      if ($decryptedValue === false) throw new RuntimeException('Decryption process failed');

      return $decryptedValue;
    } catch (JsonException $error) {
      throw new RuntimeException('Payload parsing failed: ' . $error->getMessage());
    }
  }
}
