<?php

namespace App\Http\Controllers\Auth;

use Exception;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignInRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AuthenticatedJWTController extends Controller
{
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            if (!$user = auth('jwt')->user()) return response()->json(['error' => 'User not found'], 404);
            return response()->json($user);
        } catch (TokenExpiredException $error) {
            return response()->json(['error' => 'Token has expired'], 401);
        } catch (TokenInvalidException $error) {
            return response()->json(['error' => 'Token is invalid'], 401);
        } catch (JWTException $error) {
            return response()->json(['error' => 'Authorization token error'], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(SignInRequest $request): JsonResponse
    {
        try {
            $credentials = $request->validated();
            if (!$token = auth('jwt')->attempt($credentials)) return response()->json(['error' => 'Unauthorized'], 401);
            return $this->respondWithToken($token, 200);
        } catch (JWTException $error) {
            Log::error('Authentication error: ' . $error->getMessage());
            return response()->json(['error' => 'Authentication failed', 'details' => $error->getMessage()], 500);
        } catch (Exception $error) {
            Log::error('Unexpected error during sign in: ' . $error->getMessage());
            return response()->json(['error' => 'An unexpected error occurred', 'details' => $error->getMessage()], 500);
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
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(): JsonResponse
    {
        try {
            return $this->respondWithToken(JWTAuth::refresh(JWTAuth::getToken()), 201);
        } catch (TokenExpiredException $error) {
            return response()->json(['error' => 'Token has expired'], 401);
        } catch (TokenInvalidException $error) {
            return response()->json(['error' => 'Token is invalid'], 401);
        } catch (JWTException $error) {
            Log::error('Token refresh error: ' . $error->getMessage());
            return response()->json(['error' => 'Could not refresh token', 'details' => $error->getMessage()], 500);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(): JsonResponse
    {
        try {
            auth('jwt')->logout(true);
            return response()->json(['message' => 'Successfully logged out']);
        } catch (Exception $error) {
            Log::error('Sign out error: ' . $error->getMessage());
            return response()->json(['error' => 'Sign out failed', 'details' => $error->getMessage()], 500);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     * @param  int $status
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token, $status)
    {
        try {
            return response()->json([
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl', 60) * 60 // Fallback to config or default
            ], $status);
        } catch (Exception $error) {
            Log::error('Token response error: ' . $error->getMessage());
            return response()->json(['error' => 'Token generation failed', 'details' => $error->getMessage()], 500);
        }
    }
}
