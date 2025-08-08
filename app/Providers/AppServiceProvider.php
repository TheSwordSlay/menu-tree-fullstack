<?php

namespace App\Providers;

use App\Repositories\Menu\MenuRepository;
use App\Repositories\Menu\MenuRepositoryImplement;
use App\Services\Menu\MenuService;
use App\Services\Menu\MenuServiceImplement;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(MenuRepository::class, MenuRepositoryImplement::class);
        $this->app->bind(MenuService::class, MenuServiceImplement::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
