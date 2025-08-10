<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Services\Menu\MenuService;
use Inertia\Inertia;
use App\Models\Menu;

class MenuController extends Controller
{
    protected MenuService $menuService;
    public function __construct(MenuService $menuService)
    {
      $this->menuService = $menuService;
    }

    public function index()
    {
        $trees = $this->menuService->getHierarchyByOwnerId(auth()->user()->id);
        return Inertia::render('Dashboard', [ 
            'trees' => $trees
        ]);
    }

    public function create()
    {
        //
    }

    public function store(StoreMenuRequest $request)
    {
        //
    }

    public function show(Menu $menu)
    {
        //
    }

    public function edit(Menu $menu)
    {
        //
    }

    public function update(UpdateMenuRequest $request, Menu $menu)
    {
        //
    }

    public function destroy(Menu $menu)
    {
        //
    }
}
