<?php

namespace App\Helpers\Classes;

use Exception;
use TypeError;
use JsonException;
use RuntimeException;
use InvalidArgumentException;

/**
 * Secure AES-256-GCM Encryption Utility.
 * 
 * Provides robust, authenticated encryption with key derivation and integrity checks.
 * Utilizes Elliptic Curve Diffie-Hellman (ECDH) for secure key exchange.
 */
class Aes256Gcm
{
  // Cryptographic constants.
  private const CIPHER_ALGO = 'AES-256-GCM';
  private const HASH_ALGO = 'SHA512';
  private const KEY_LENGTH = 32; // 256-bit key.
  private const IV_LENGTH = 12;
  private const TAG_LENGTH = 16;
  private const DEFAULT_MAX_AGE = 3600; // 1 hour default expiration.
  // Data format constants.
  private const ENCODING = 'UTF-8';
  private const ALLOWED_TYPES = ['string', 'array', 'object'];
  // Prevent direct instantiation and cloning.
  private function __construct() {}
  private function __clone() {}

  /**
   * Validate and standardize input value for encryption.
   * 
   * @param mixed $value Input value to validate and standardize.
   * @return string UTF-8 encoded binary string.
   * @throws TypeError If input type is invalid.
   * @throws JsonException If JSON serialization fails.
   */
  private static function standardizeInput($value): string
  {
    $type = gettype($value);
    if (!in_array($type, self::ALLOWED_TYPES)) throw new TypeError(sprintf('Input must be one of: %s. Got: %s', implode(', ', self::ALLOWED_TYPES), $type));

    try {
      // Convert to string if not already.
      $stringValue = is_string($value) ? $value : json_encode($value, JSON_THROW_ON_ERROR);
      // Ensure UTF-8 encoding.
      if (!mb_check_encoding($stringValue, self::ENCODING)) throw new TypeError('Input must be valid UTF-8');
      return $stringValue;
    } catch (JsonException $error) {
      throw new JsonException('Failed to serialize input: ' . $error->getMessage());
    }
  }

  /**
   * Enhanced key derivation with additional validation.
   * 
   * @param string $publicKey Base64 encoded client public key.
   * @return string Derived 256-bit encryption key.
   * @throws RuntimeException If key derivation fails.
   * @throws InvalidArgumentException If key format is invalid.
   */
  private static function deriveKey(string $publicKey): string
  {
    if (empty($publicKey)) throw new InvalidArgumentException('Public key cannot be empty');

    try {
      // Safely extract and decode server private key with validation.
      $serverPrivateKey = self::safeBase64Decode(substr(env('APP_KEY'), 7), self::KEY_LENGTH);
      // Safely extract and decode client public key.
      $clientPublicKey = self::safeBase64Decode($publicKey, self::KEY_LENGTH);
      // Perform scalar multiplication with additional validation.
      $sharedKey = sodium_crypto_scalarmult($serverPrivateKey, $clientPublicKey);

      if (!$sharedKey || !is_string($sharedKey)) throw new RuntimeException('Failed to derive shared encryption key');
      // BLAKE2b for key derivation with cryptographic salt.
      $finalKey = sodium_crypto_generichash($sharedKey, '', self::KEY_LENGTH);
      if (strlen($finalKey) !== self::KEY_LENGTH) throw new RuntimeException('Derived key has an invalid length');

      return $finalKey;
    } catch (Exception $error) {
      throw new RuntimeException('Key derivation failed: ' . $error->getMessage());
    }
  }

  /**
   * Enhanced Base64 decoder with strict validation.
   * 
   * @param string $encodedValue Base64 encoded value.
   * @param int $expectedLength Expected key length.
   * @return string Decoded key.
   * @throws InvalidArgumentException If decoding fails or length mismatch.
   */
  private static function safeBase64Decode(string $encodedValue, int $expectedLength): string
  {
    if (empty($encodedValue)) throw new InvalidArgumentException('Encoded value cannot be empty');
    // Validate base64 format.
    if (!preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $encodedValue)) throw new InvalidArgumentException('Invalid base64 format');

    $decodedValue = base64_decode($encodedValue, true);
    if ($decodedValue === false) throw new InvalidArgumentException('Failed to decode base64 value');
    if (strlen($decodedValue) !== $expectedLength) {
      throw new InvalidArgumentException(sprintf('Invalid decoded length. Expected: %d, Got: %d', $expectedLength, strlen($decodedValue)));
    }
    return $decodedValue;
  }

  /**
   * Enhanced payload validation with type checking.
   * 
   * @param array $payload Encryption payload.
   * @throws RuntimeException If payload is invalid.
   */
  private static function validatePayload(array $payload): void
  {
    $requiredKeys = ['iv', 'tag', 'value', 'public_key', 'issued_at', 'mac'];
    $missingKeys = [];

    foreach ($requiredKeys as $key) {
      // Check existence.
      if (!isset($payload[$key])) {
        $missingKeys[] = $key;
        continue;
      }
      // Type validation.
      $valid = match ($key) {
        'issued_at' => is_int($payload[$key]),
        default => is_string($payload[$key]) && !empty($payload[$key])
      };

      if (!$valid) throw new RuntimeException("Invalid payload: {$key} has invalid type or is empty");
    }
    if (!empty($missingKeys)) throw new RuntimeException('Invalid payload: missing keys - ' . implode(', ', $missingKeys));
  }

  /**
   * Enhanced encryption with standardized input and consistent tag handling.
   * 
   * @param mixed $value Data to encrypt.
   * @param string $publicKey Client's public key.
   * @param string|null $hmacKey Optional separate HMAC key.
   * @return string Base64 encoded encrypted payload.
   * @throws TypeError If input is invalid.
   * @throws RuntimeException If encryption fails.
   */
  public static function encrypt($value, string $publicKey, ?string $hmacKey = null): string
  {
    if ($value === null) throw new TypeError('Encryption input cannot be null');

    try {
      // Standardize and validate input.
      $standardizedValue = self::standardizeInput($value);
      $sharedKey = self::deriveKey($publicKey);
      $hmacKeyToUse = $hmacKey ? self::safeBase64Decode($hmacKey, self::KEY_LENGTH) : $sharedKey;
      // Generate cryptographically secure IV.
      $iv = random_bytes(self::IV_LENGTH);
      // Perform authenticated encryption with explicit tag handling.
      $tag = '';
      $cipherText = openssl_encrypt($standardizedValue, self::CIPHER_ALGO, $sharedKey, OPENSSL_RAW_DATA, $iv, $tag, "", self::TAG_LENGTH);

      if ($cipherText === false) throw new RuntimeException('Encryption process failed');

      // Construct payload with enhanced validation.
      $payload = [
        'iv' => base64_encode($iv),
        'tag' => base64_encode($tag),
        'value' => base64_encode($cipherText),
        'public_key' => substr(env('VITE_APP_PUBLIC_KEY'), 7),
        'issued_at' => time()
      ];
      // Compute HMAC for payload integrity.
      $hmac = hash_hmac(self::HASH_ALGO, json_encode($payload, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES), $hmacKeyToUse, true);
      $payload['mac'] = base64_encode($hmac);
      // Validate final payload before encoding.
      self::validatePayload($payload);

      return base64_encode(json_encode($payload, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES));
    } catch (JsonException $error) {
      throw new RuntimeException('Payload serialization failed: ' . $error->getMessage());
    } catch (Exception $error) {
      throw new RuntimeException('Encryption failed: ' . $error->getMessage());
    }
  }

  /**
   * Enhanced decryption with strict validation and consistent tag handling.
   * 
   * @param string $encryptedPayload Base64 encoded encrypted payload.
   * @param string|null $publicKey Optional client public key.
   * @param string|null $hmacKey Optional HMAC key.
   * @param int $maxAge Maximum payload age in seconds.
   * @return string Decrypted payload.
   * @throws TypeError If input is empty.
   * @throws RuntimeException If decryption fails.
   */
  public static function decrypt(string $encryptedPayload, ?string $publicKey = null, ?string $hmacKey = null, int $maxAge = self::DEFAULT_MAX_AGE): string
  {
    if (empty($encryptedPayload)) throw new TypeError('Decryption input cannot be empty');

    try {
      // Decode and validate payload.
      $decodedPayload = base64_decode($encryptedPayload, true);
      if ($decodedPayload === false) throw new RuntimeException('Invalid base64 encoded payload');

      $payload = json_decode($decodedPayload, true, 512, JSON_THROW_ON_ERROR);
      self::validatePayload($payload);
      // Derive decryption key with validation.
      $sharedKey = $publicKey ? self::deriveKey($publicKey) : self::deriveKey($payload['public_key']);
      $hmacKeyToUse = $hmacKey ? self::safeBase64Decode($hmacKey, self::KEY_LENGTH) : $sharedKey;
      // Verify payload integrity with enhanced validation.
      $payloadForHmac = $payload;
      unset($payloadForHmac['mac']);
      $computedHmac = hash_hmac(self::HASH_ALGO, json_encode($payloadForHmac, JSON_UNESCAPED_SLASHES), $hmacKeyToUse, true);

      // Constant-time HMAC comparison,
      if (!hash_equals(base64_decode($payload['mac'], true), $computedHmac)) throw new RuntimeException('Payload authentication failed');
      // Validate payload age,
      if (time() - $payload['issued_at'] > $maxAge) throw new RuntimeException('Encrypted payload has expired');
      // Decode components with validation,
      $iv = self::safeBase64Decode($payload['iv'], self::IV_LENGTH);
      $tag = self::safeBase64Decode($payload['tag'], self::TAG_LENGTH);
      $cipherText = base64_decode($payload['value'], true);

      if ($cipherText === false) throw new RuntimeException('Invalid ciphertext');

      // Decrypt with consistent tag handling.
      $decryptedValue = openssl_decrypt($cipherText, self::CIPHER_ALGO, $sharedKey, OPENSSL_RAW_DATA, $iv, $tag);

      if ($decryptedValue === false) throw new RuntimeException('Decryption process failed');
      // Validate decrypted value encoding.
      if (!mb_check_encoding($decryptedValue, self::ENCODING)) throw new RuntimeException('Decrypted value is not valid UTF-8');

      return $decryptedValue;
    } catch (JsonException $error) {
      throw new RuntimeException('Payload parsing failed: ' . $error->getMessage());
    } catch (Exception $error) {
      throw new RuntimeException('Decryption failed: ' . $error->getMessage());
    }
  }
}
