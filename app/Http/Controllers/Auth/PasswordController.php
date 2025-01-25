<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePasswordRequest;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(UpdatePasswordRequest $request)
    {
        $request->user()->update(['password' => Hash::make($request->password)]);
        return response(null, 202);
    }
}
