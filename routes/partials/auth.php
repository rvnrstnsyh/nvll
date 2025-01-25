<?php

use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('sign-up', [App\Http\Controllers\Auth\SignUpUserController::class, 'create'])
        ->name('sign-up.create');

    Route::post('sign-up', [App\Http\Controllers\Auth\SignUpUserController::class, 'store'])
        ->middleware('zerotrust')
        ->name('sign-up.store');

    Route::get('sign-in', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'create'])
        ->name('sign-in.create');

    Route::post('sign-in', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store'])
        ->middleware('zerotrust')
        ->name('sign-in.store');

    Route::get('forgot-password', [App\Http\Controllers\Auth\PasswordResetLinkController::class, 'create'])
        ->name('forgot-password.create');

    Route::post('forgot-password', [App\Http\Controllers\Auth\PasswordResetLinkController::class, 'store'])
        ->middleware(['throttle:4,3', 'zerotrust'])
        ->name('forgot-password.store');

    Route::get('reset-password/{token}', [App\Http\Controllers\Auth\NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [App\Http\Controllers\Auth\NewPasswordController::class, 'store'])
        ->middleware('zerotrust')
        ->name('reset-password.store');
});

Route::middleware('auth:web')->group(function () {
    Route::get('choose-username', [App\Http\Controllers\Auth\ChooseUsernameController::class, 'create'])
        ->name('choose-username.create');

    Route::post('choose-username', [App\Http\Controllers\Auth\ChooseUsernameController::class, 'store'])
        ->middleware('zerotrust')
        ->name('choose-username.store');

    Route::get('verify-email', [App\Http\Controllers\Auth\EmailVerificationPromptController::class, 'create'])
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', [App\Http\Controllers\Auth\VerifyEmailController::class, 'store'])
        ->middleware(['signed', 'throttle:4,3'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [App\Http\Controllers\Auth\EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:4,3')
        ->name('verification.send');

    Route::get('confirm-password', [App\Http\Controllers\Auth\ConfirmablePasswordController::class, 'show'])
        ->name('confirm-password.show');

    Route::post('confirm-password', [App\Http\Controllers\Auth\ConfirmablePasswordController::class, 'store'])
        ->name('confirm-password.store');

    Route::put('password', [App\Http\Controllers\Auth\PasswordController::class, 'update'])
        ->middleware('zerotrust')
        ->name('password.update');

    Route::post('sign-out', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])
        ->name('sign-out.destroy');
});
