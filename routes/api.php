<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MenuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public route for getting a token
Route::post('/login', [AuthController::class, 'login']);

// Protected routes that require a valid Sanctum token
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Add this route for logging out
    Route::post('/logout', [AuthController::class, 'logout']);

    // Menu API routes
    Route::get('/menu/get-all', [MenuController::class, 'apiGetAllMenus']);
    Route::post('/menu/create', [MenuController::class, 'apiCreate']);
    Route::post('/menu/create-child', [MenuController::class, 'apiCreateChild']);
    Route::delete('/menu/delete', [MenuController::class, 'apiDeleteMenu']);
    Route::put('/menu/update', [MenuController::class, 'apiUpdateMenu']);
});