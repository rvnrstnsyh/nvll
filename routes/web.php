<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

Route::get('/', function () {
    return Inertia::render('About', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('about.create');

Route::middleware(['auth:web', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard.create');

    Route::get('account-settings', [App\Http\Controllers\AccountSettingsController::class, 'create'])
        ->name('account-settings.create');

    Route::patch('account-settings', [App\Http\Controllers\AccountSettingsController::class, 'update'])
        ->name('account-settings.update');

    Route::delete('account-settings', [App\Http\Controllers\AccountSettingsController::class, 'destroy'])
        ->name('account-settings.destroy');

    Route::middleware(['developer', App\Http\Middleware\ZeroTrustMiddleware::class])->group(function () {
        Route::get('lab', [App\Http\Controllers\Developer\LabController::class, 'create'])
            ->name('lab.create');

        Route::post('lab', [App\Http\Controllers\Developer\LabController::class, 'store'])
            ->name('lab.store');
    });
});

require __DIR__ . '/partials/auth.php';
