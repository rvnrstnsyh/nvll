<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function store(EmailVerificationRequest $request): RedirectResponse
    {
        $user = $request->user();
        if ($user->hasVerifiedEmail()) return redirect()->intended(route('dashboard.create', absolute: false) . '?verified=1');
        if ($user->markEmailAsVerified()) {
            $preferences = $user->preferences();
            if ($preferences->exists() && !$preferences->first()->freeze) {
                $preferences->update(['freeze' => true]);
            }
            event(new Verified($user));
        }
        return redirect()->intended(route('dashboard.create', absolute: false) . '?verified=1');
    }
}
