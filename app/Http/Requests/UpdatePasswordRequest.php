<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('web')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_public_key' => [
                'string',
                'size:44',
                function ($attribute, $value, $fail) {
                    if (!preg_match('/^[A-Za-z0-9+\/=]{44}$/', $value)) {
                        $fail("The {$attribute} must be a valid Base64-encoded string.");
                        return;
                    }

                    $decodedKey = base64_decode($value, true);
                    if ($decodedKey === false || strlen($decodedKey) !== 32) {
                        $fail("The {$attribute} must be a valid X25519 public key (32 bytes).");
                    }
                },
            ],
            'current_password' => 'required|current_password',
            'password' => ['required', 'confirmed', Password::min(8)->letters()->mixedCase()->numbers()->symbols()]
        ];
    }
}
