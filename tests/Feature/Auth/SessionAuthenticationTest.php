<?php

use App\Models\User;

test('sign-in screen can be rendered', function () {
    $response = $this->get(route('sign-in.create'));
    $response->assertStatus(200);
});

test('users can authenticate using the sign-in screen', function () {
    $user = User::factory()->create();
    $response = $this->post(route('sign-in.create'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();

    // $response->assertRedirect(route('dashboard.create', absolute: false));
    $response->assertStatus(200);
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post(route('sign-in.create'), [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);
    $this->assertGuest();
});

test('users can sign-out', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->post(route('sign-out.destroy'));

    $this->assertGuest();

    $response->assertRedirect(route('about.create', absolute: false));
});
