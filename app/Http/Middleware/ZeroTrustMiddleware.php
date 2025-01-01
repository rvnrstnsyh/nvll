<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Helpers\Classes\Aes256Gcm;
use Symfony\Component\HttpFoundation\Response;

class ZeroTrustMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if($request->has('envelope')){
            $decodedPayload = base64_decode($request->envelope, true);
            $payload = json_decode($decodedPayload, true, 512, JSON_THROW_ON_ERROR);

            // $iv = base64_decode($payload->iv, true);
            // $tag = base64_decode($payload->tag, true);
            // $value = base64_decode($payload->value, true);

            // $dec = openssl_decrypt($value, 'aes-256-gcm', $sharedKey, OPENSSL_RAW_DATA, $iv, $tag);
            return response()->json(['server' => Aes256Gcm::encrypt(Aes256Gcm::decrypt($request->envelope), $payload['public_key'])]);
            // $request->merge([
            //     'input_alpha' => Aes256Gcm::decrypt($request->envelope, $sharedKey),
            // ]);
        }
        return $next($request);
    }
}
