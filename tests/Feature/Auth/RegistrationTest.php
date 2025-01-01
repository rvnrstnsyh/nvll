<?php

test('registration screen can be rendered', function () {
    $response = $this->get(route('sign-up.create'));
    $response->assertStatus(200);
});

test('new users can sign-up', function () {
    $response = $this->post(route('sign-up.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => '@Secret000!',
        'password_confirmation' => '@Secret000!'
    ]);

    $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    $this->assertAuthenticated();

    $response->assertRedirect(route('dashboard.create', absolute: false));
});
