<?php

it('returns a successful response', function () {
    $response = $this->get(route('about.create'));
    $response->assertStatus(200);
});
