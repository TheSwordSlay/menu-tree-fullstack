<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Services\Menu\MenuService;
use Illuminate\Http\Request;
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
        return Inertia::render('Menu', [ 
            'trees' => $trees
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $this->menuService->createMenu($request->name, null, auth()->user()->id);
        return back();
    }

    public function createChild(Request $request)
    {
        $request->validate([
            'parent_id' => 'required',
            'name' => 'required|string|max:255',
        ]);
        $this->menuService->createMenu($request->name, $request->parent_id, auth()->user()->id);
        return back();
    }

    public function deleteMenu(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);
        $this->menuService->deleteMenu($request->id);
        return back();
    }

    public function updateMenu(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'name' => 'required'
        ]);
        $this->menuService->updateMenu($request->id, $request->name);
        return back();
    }
}
