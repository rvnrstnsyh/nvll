<?php

use App\Models\User;

test('account settings page is displayed', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get(route('account-settings.create'));
    $response->assertOk();
});

test('account settings information can be updated', function () {
    $user = User::factory()->create();
    $response = $this
        ->actingAs($user)
        ->patch(route('account-settings.update'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    // $response->assertSessionHasNoErrors()->assertRedirect(route('account-settings.create'));
    $response->assertSessionHasNoErrors()->assertStatus(202);
    $user->refresh();

    $this->assertSame('Test User', $user->name);
    $this->assertSame('test@example.com', $user->email);
    $this->assertNull($user->email_verified_at);
});

test('email verification status is unchanged when the email address is unchanged', function () {
    $user = User::factory()->create();
    $response = $this
        ->actingAs($user)
        ->patch(route('account-settings.update'), [
            'name' => 'Test User',
            'email' => $user->email,
        ]);
    // $response->assertSessionHasNoErrors()->assertRedirect(route('account-settings.create'));
    $response->assertSessionHasNoErrors()->assertStatus(202);

    $this->assertNotNull($user->refresh()->email_verified_at);
});

test('user can delete their account', function () {
    $user = User::factory()->create();
    $response = $this
        ->actingAs($user)
        ->delete(route('account-settings.destroy'), [
            'password' => 'password',
        ]);
    // $response->assertSessionHasNoErrors()->assertRedirect(route('about.create'));
    $response->assertSessionHasNoErrors()->assertStatus(202);

    $this->assertGuest();
    $this->assertNull($user->fresh());
});

test('correct password must be provided to delete account', function () {
    $user = User::factory()->create();
    $response = $this
        ->actingAs($user)
        ->from(route('account-settings.create'))
        ->delete(route('account-settings.destroy'), [
            'password' => 'wrong-password',
        ]);
    $response->assertSessionHasErrors('password')->assertRedirect(route('account-settings.create'));

    $this->assertNotNull($user->fresh());
});
