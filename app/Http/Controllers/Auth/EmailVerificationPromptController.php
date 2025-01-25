<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function create(Request $request): RedirectResponse|Response
    {
        $user = $request->user();
        $preferences = $user->preferences();

        if ($user->hasVerifiedEmail()) {
            if ($preferences->exists()) {
                return redirect(route('dashboard.create', absolute: false));
            }
            return abort(403);
        }
        if (!$preferences->exists()) {
            return redirect(route('choose-username.create', absolute: false));
        }
        return Inertia::render('Auth/VerifyEmail', [
            'status' => session('status'),
            'canChangeUsername' => !$preferences->first()->freeze
        ]);
    }
}
