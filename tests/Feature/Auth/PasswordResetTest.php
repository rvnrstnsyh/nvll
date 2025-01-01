<?php

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Notification;

test('reset password link screen can be rendered', function () {
    $response = $this->get(route('forgot-password.create'));
    $response->assertStatus(200);
});

test('reset password link can be requested', function () {
    Notification::fake();

    $user = User::factory()->create();

    $this->post(route('forgot-password.store'), ['email' => $user->email]);
    Notification::assertSentTo($user, ResetPassword::class);
});

test('reset password screen can be rendered', function () {
    Notification::fake();

    $user = User::factory()->create();

    $this->post(route('forgot-password.store'), ['email' => $user->email]);
    Notification::assertSentTo($user, ResetPassword::class, function ($notification) {
        $response = $this->get('/reset-password/' . $notification->token);
        $response->assertStatus(200);
        return true;
    });
});

test('password can be reset with valid token', function () {
    Notification::fake();

    $user = User::factory()->create();

    $this->post(route('forgot-password.store'), ['email' => $user->email]);
    Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
        $response = $this->post(route('reset-password.store'), [
            'token' => $notification->token,
            'email' => $user->email,
            'password' => 'Password-000!',
            'password_confirmation' => 'Password-000!',
        ]);
        $response->assertSessionHasNoErrors()->assertRedirect(route('sign-in.create'));
        return true;
    });
});
