<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\Menu\MenuService;

class DashboardController extends Controller
{
    public function __construct(private MenuService $menuService) {}
    public function index()
    {
        dd($this->menuService->getHierarchyByOwnerID(1));
        return Inertia::render('Dashboard');
    }
}
