<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class AccountSettingsUpdateRequest extends FormRequest
{
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
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id)
            ],
        ];
    }
}
