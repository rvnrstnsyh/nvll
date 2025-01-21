<?php

namespace App\Http\Controllers\Developer;

use App\Helpers\Classes\Aes256Gcm;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\Developer\LabRequest;

class LabController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Developer/Lab');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LabRequest $request)
    {
        $valid = $request->validated();
        $invalid = array_diff_key($request->all(), $valid);

        if (isset($valid['client_public_key'])) unset($valid['client_public_key']);

        $payload = [
            'success' => true,
            'payload' => [
                'valid' => $valid,
                'invalid' => $invalid
            ],
            'received_at' => time()
        ];

        if ($request->has('client_public_key')) {
            return response(Aes256Gcm::encrypt($payload, $request->client_public_key), 200);
        } else {
            return response()->json($payload, 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LabRequest $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
