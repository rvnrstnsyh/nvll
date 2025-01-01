<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title inertia>{{ config('app.name', 'Non-Violable Liberty Layers') }}</title>
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon" sizes="64x64">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
    <style>
        .noscript-notice {
            user-select: none;
            position: fixed;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3em;
            background: #f3f4f6;
            color: #1f2937;
            font-family: Arial, Helvetica, sans-serif;
        }
    </style>
</head>

<body class="font-sans antialiased">
    @inertia
    <noscript class="noscript-notice">
        {{ config('app.name', 'Non-Violable Liberty Layers') }}
        requires JavaScript. Enable JavaScript and reload this page to continue.
    </noscript>
</body>

</html>
