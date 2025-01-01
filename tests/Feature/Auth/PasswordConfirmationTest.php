<?php

use App\Models\User;

test('confirm password screen can be rendered', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get(route('confirm-password.show'));
    $response->assertStatus(200);
});

test('password can be confirmed', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->post(route('confirm-password.store'), [
        'password' => 'password',
    ]);
    $response->assertRedirect();
    $response->assertSessionHasNoErrors();
});

test('password is not confirmed with invalid password', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->post(route('confirm-password.store'), [
        'password' => 'wrong-password',
    ]);
    $response->assertSessionHasErrors();
});
