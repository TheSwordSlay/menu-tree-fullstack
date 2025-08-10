<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MenuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/menu/get-all', [MenuController::class, 'apiGetAllMenus']);
    Route::post('/menu/create', [MenuController::class, 'apiCreate']);
    Route::post('/menu/create-child', [MenuController::class, 'apiCreateChild']);
    Route::delete('/menu/delete', [MenuController::class, 'apiDeleteMenu']);
    Route::put('/menu/update', [MenuController::class, 'apiUpdateMenu']);
});