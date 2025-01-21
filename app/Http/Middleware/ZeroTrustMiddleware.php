<?php

namespace App\Http\Middleware;

use Closure;
use Throwable;
use Illuminate\Http\Request;
use App\Helpers\Classes\Aes256Gcm;
use Symfony\Component\HttpFoundation\Response;

class ZeroTrustMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->has('seal')) return $next($request);

        try {
            $encryptedData = $request->seal;
            // Validate base64 format
            if (!preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $encryptedData)) return response(null, 422);
            // Validate and decode base64
            $base64DecodedData = base64_decode($encryptedData, true);
            if ($base64DecodedData === false || base64_encode($base64DecodedData) !== $encryptedData) return response(null, 422);
            // Decrypt and parse payload
            $decryptedData = Aes256Gcm::decrypt($encryptedData);
            $requestPayload = json_decode($decryptedData, true);
            // Get and validate public key from metadata
            $requestMetadata = json_decode($base64DecodedData, true);
            if (!isset($requestMetadata['public_key'])) return response(null, 422);
            // Add public key to payload
            $requestPayload['client_public_key'] = $requestMetadata['public_key'];
            // Validate final payload
            if (json_last_error() !== JSON_ERROR_NONE || !is_array($requestPayload)) return response(null, 422);

            $request->merge($requestPayload);

            return $next($request);
        } catch (Throwable $error) {
            return response($error->getMessage(), 500);
        }
    }
}
