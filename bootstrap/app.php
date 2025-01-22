<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/health'
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class
        ]);
        $middleware->validateCsrfTokens(except: ['api/*']);
        $middleware->trimStrings(except: ['password', 'password_confirmation', 'current_password']);
        $middleware->alias([
            'zerotrust' => App\Http\Middleware\ZeroTrustMiddleware::class,
            'developer' => App\Http\Middleware\DeveloperMiddleware::class,
            'abilities' => Laravel\Sanctum\Http\Middleware\CheckAbilities::class,
            'ability' => Laravel\Sanctum\Http\Middleware\CheckForAnyAbility::class
        ]);
        $middleware->redirectGuestsTo('sign-in');
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
