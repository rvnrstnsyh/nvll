<?php

use App\Models\User;

test('choose username screen can be rendered', function () {
  $user = User::factory()->unverified()->create();
  $response = $this->actingAs($user)->get(route('choose-username.create'));
  $response->assertStatus(200);
});

test('users cannot see the email verification and dashboard page before specifying a username', function () {
  $user = User::factory()->unverified()->create();
  $response = $this->actingAs($user)->get(route('verification.notice'));
  $response->assertRedirect(route('choose-username.create'));
  $response = $this->actingAs($user)->get(route('dashboard.create'));
  $response->assertRedirect(route('verification.notice'));
});

test('users can specify a username', function () {
  $user = User::factory()->unverified()->create();
  $response = $this
    ->actingAs($user)
    ->from(route('choose-username.create'))
    ->post(route('choose-username.store'), ['username' => 'flyingcat000']);
  $response
    ->assertSessionHasNoErrors()
    ->assertRedirect(route('verification.notice', absolute: false));

  $this->assertDatabaseHas('preferences', [
    'user_id' => $user->id,
    'username' => 'flyingcat000',
  ]);
});

test('users can change username before verification email is done', function () {
  $user = User::factory()->unverified()->create();
  $user->preferences()->create(['username' => 'flyingcat000']);
  $response = $this
    ->actingAs($user)
    ->from(route('verification.notice'))
    ->get(route('choose-username.create'));
  $response
    ->assertSessionHasNoErrors()
    ->assertStatus(200);
  $response = $this
    ->from((route('choose-username.create')))
    ->post(route('choose-username.store'), ['username' => 'flyingcat001']);
  $response
    ->assertSessionHasNoErrors()
    ->assertRedirect(route('verification.notice', absolute: false));

  $this->assertDatabaseMissing('preferences', [
    'user_id' => $user->id,
    'username' => 'flyingcat000',
  ]);
  $this->assertDatabaseHas('preferences', [
    'user_id' => $user->id,
    'username' => 'flyingcat001',
  ]);
});

test('users cannot change their username after email verification has been done.', function () {
  $user = User::factory()->create();
  $user->preferences()->create(['username' => 'flyingcat000']);
  $response = $this->actingAs($user)->get(route('choose-username.create'));
  $response->assertRedirect(route('dashboard.create', absolute: false));
  $user->preferences()->delete();
  $response = $this->actingAs($user)->post(route('choose-username.store'), ['username' => 'flyingcat000']);
  $response->assertStatus(403);
});
