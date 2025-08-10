<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Services\Menu\MenuService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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

    public function apiGetAllMenus() {
        $trees = $this->menuService->getHierarchyByOwnerId(auth()->user()->id);
        return response()->json($trees);
    }

    public function apiCreate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $this->menuService->createMenu($request->name, null, auth()->user()->id);
        return response()->json(['message' => 'Menu created successfully']);
    }

    public function apiCreateChild(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'parent_id' => 'required',
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $this->menuService->createMenu($request->name, $request->parent_id, auth()->user()->id);
        return response()->json(['message' => 'Child menu created successfully']);
    }

    public function apiDeleteMenu(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $this->menuService->deleteMenu($request->id);
        return response()->json(['message' => 'Menu deleted successfully']);
    }

    public function apiUpdateMenu(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'name' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $this->menuService->updateMenu($request->id, $request->name);
        return response()->json(['message' => 'Menu updated successfully']);
    }
}
