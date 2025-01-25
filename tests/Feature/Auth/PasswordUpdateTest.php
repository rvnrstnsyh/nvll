<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('password can be updated', function () {
    $user = User::factory()->create();
    $response = $this
        ->actingAs($user)
        ->from(route('account-settings.create'))
        ->put(route('password.update'), [
            'current_password' => 'password',
            'password' => 'New-password-000!',
            'password_confirmation' => 'New-password-000!',
        ]);
    $response
        ->assertSessionHasNoErrors()
        // ->assertRedirect(route('account-settings.create'));
        ->assertStatus(202);

    $this->assertTrue(Hash::check('New-password-000!', $user->refresh()->password));
});

test('correct password must be provided to update password', function () {
    $user = User::factory()->create();
    $response = $this
        ->actingAs($user)
        ->from(route('account-settings.create'))
        ->put(route('password.update'), [
            'current_password' => 'wrong-password',
            'password' => 'New-password-000!',
            'password_confirmation' => 'New-password-000!',
        ]);
    $response
        ->assertSessionHasErrors('current_password')
        ->assertRedirect(route('account-settings.create'));
});
