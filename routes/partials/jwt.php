<?php

use Illuminate\Support\Facades\Route;

Route::post('jwt/sign-in', [App\Http\Controllers\Auth\AuthenticatedJWTController::class, 'store'])
  ->name('jwt-sign-in.store');

Route::middleware(['auth:jwt'])->group(function () {
  Route::post('jwt/me', [App\Http\Controllers\Auth\AuthenticatedJWTController::class, 'index'])
    ->name('jwt-me.index');

  Route::post('jwt/refresh', [App\Http\Controllers\Auth\AuthenticatedJWTController::class, 'update'])
    ->name('jwt-refresh.update');

  Route::post('jwt/sign-out', [App\Http\Controllers\Auth\AuthenticatedJWTController::class, 'destroy'])
    ->name('jwt-sign-out.destroy');
});
