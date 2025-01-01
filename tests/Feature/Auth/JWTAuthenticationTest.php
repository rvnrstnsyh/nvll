<?php

use App\Models\User;

test('users can authenticate using the jwt token', function () {
  $user = User::factory()->create();
  $response = $this->post(route('jwt-sign-in.store'), ['email' => $user->email, 'password' => 'password',]);
  $response->assertStatus(200)->assertJsonStructure(['access_token', 'token_type', 'expires_in',]);
  $data = $response->json();

  $this->assertIsString($data['access_token']);
  $this->assertIsString($data['token_type']);
  $this->assertIsInt($data['expires_in']);
  $this->assertTrue(auth('jwt')->check());
});

test('users can not authenticate with invalid password', function () {
  $user = User::factory()->create();

  $this->post(route('jwt-sign-in.store'), ['email' => $user->email, 'password' => 'wrong-password']);
  $this->assertGuest('jwt');
});

test('users can get authenticated user', function () {
  $user = User::factory()->create();
  $response = $this->withHeaders(['Authorization' => 'Bearer ' . auth('jwt')->login($user)])->post(route('jwt-me.index'));
  $response->assertStatus(200)
    ->assertJsonStructure([
      'id',
      'name',
      'email',
      'email_verified_at',
      'created_at',
      'updated_at',
    ]);
  $data = $response->json();

  $this->assertIsString($data['id']);
  $this->assertIsString($data['name']);
  $this->assertIsString($data['email']);
  $this->assertIsString($data['email_verified_at']);
  $this->assertIsString($data['created_at']);
  $this->assertIsString($data['updated_at']);
  $this->assertTrue(auth('jwt')->check());
});

test('users can refresh the jwt token', function () {
  $user = User::factory()->create();
  $response = $this->withHeaders(['Authorization' => 'Bearer ' . auth('jwt')->login($user)])->post(route('jwt-refresh.update'));
  $response->assertStatus(201)->assertJsonStructure(['access_token', 'token_type', 'expires_in',]);
  $data = $response->json();

  $this->assertIsString($data['access_token']);
  $this->assertIsString($data['token_type']);
  $this->assertIsInt($data['expires_in']);
  $this->assertTrue(auth('jwt')->check());
});

test('users can sign-out', function () {
  $user = User::factory()->create();
  $response = $this->withHeaders(['Authorization' => 'Bearer ' . auth('jwt')->login($user)])->post(route('jwt-sign-out.destroy'));

  $this->assertGuest('jwt');

  $response->assertOk()->assertJson(['message' => 'Successfully logged out']);
});
