<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use App\Services\Menu\MenuService;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/menu');
    }
    return redirect('/login');
});

Route::get('/menu', [MenuController::class, 'index'])->middleware(['auth', 'verified'])->name('menu');
Route::post('/menu-create', [MenuController::class, 'create'])->middleware(['auth', 'verified'])->name('menu.create');
Route::post('/menu-create-child', [MenuController::class, 'createChild'])->middleware(['auth', 'verified'])->name('menu.create.child');
Route::post('/menu-delete', [MenuController::class, 'deleteMenu'])->middleware(['auth', 'verified'])->name('menu.delete');
Route::post('/menu-update', [MenuController::class, 'updateMenu'])->middleware(['auth', 'verified'])->name('menu.update');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
