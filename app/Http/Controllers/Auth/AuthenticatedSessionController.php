<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\Auth\SignInRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the sign in view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/SignIn', [
            'canResetPassword' => Route::has('forgot-password.create'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(SignInRequest $request)
    {
        $request->authenticate();
        $request->session()->regenerate();

        return response(null, 200);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
