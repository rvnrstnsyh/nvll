<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\Auth\ChooseUsernameRequest;

class ChooseUsernameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = $request->user();
        $preferences = $user->preferences();

        if ($user->hasVerifiedEmail()) {
            if ($preferences->exists()) {
                return redirect(route('dashboard.create', absolute: false));
            };
            return abort(403);
        }
        return Inertia::render('Auth/ChooseUsername', [
            'username' => $preferences->exists() ? $user->preferences->username : null
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ChooseUsernameRequest $request)
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) return abort(403);

        $preferences = $user->preferences();

        if ($preferences->exists()) {
            if ($preferences->value('username') === $request->username) {
                return response(null, 201);
            }
            $request->validate(['username' => 'unique:preferences,username']);
            $preferences->update(['username' => $request->username]);
        } else {
            $request->validate(['username' => 'unique:preferences,username']);
            $preferences->create(['username' => $request->username]);
            event(new Registered($user));
        }
        return response(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
