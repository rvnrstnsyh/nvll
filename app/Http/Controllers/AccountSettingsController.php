<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\DeleteAccountRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\AccountSettingsUpdateRequest;

class AccountSettingsController extends Controller
{
    /**
     * Display the user's account settings form.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Account/Settings/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status')
        ]);
    }

    /**
     * Update the user's settings information.
     */
    public function update(AccountSettingsUpdateRequest $request)
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) $request->user()->email_verified_at = null;

        $request->user()->save();

        return response(null, 202);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(DeleteAccountRequest $request)
    {
        $user = $request->user();

        Auth::logout();

        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response(null, 202);
    }
}
