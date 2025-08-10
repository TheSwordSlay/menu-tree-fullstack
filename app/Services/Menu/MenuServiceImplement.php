<?php

namespace App\Services\Menu;

use App\Models\Menu;
use Illuminate\Support\Facades\Log;
use LaravelEasyRepository\ServiceApi;
use App\Repositories\Menu\MenuRepository;

class MenuServiceImplement extends ServiceApi implements MenuService{

     protected string $title = "";

     protected MenuRepository $mainRepository;

    public function __construct(MenuRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }

    public function getHierarchyByOwnerID(int $id)
    {
        $rootMenus = $this->mainRepository->getAllMenusByOwnerId($id);
        $menuHierarchies = [];
        foreach ($rootMenus as $menu) {
            $menuHierarchies[] = $this->buildMenuTree($menu, []);
        }

        return $menuHierarchies;
    }

    private function buildMenuTree(Menu $menu, array $processedIds = [])
    {
        if (in_array($menu->id, $processedIds)) {
            return $menu->toArray();
        }
        
        $processedIds[] = $menu->id;
        
        $children = $this->mainRepository->getMenuChildrens($menu->id);
        
        $menuArray = $menu->toArray();
        $menuArray['children'] = [];
        
        foreach ($children as $child) {
            $menuArray['children'][] = $this->buildMenuTree($child, $processedIds);
        }

        return $menuArray;
    }

    public function getMenuByUUID(string $id)
    {
        return $this->mainRepository->getMenuByUUID($id);
    }

    public function createMenu(string $name, string $parentId, int $ownerId)
    {
        return $this->mainRepository->createMenu($name, $parentId, $ownerId);
    }

    public function createMenuChild(string $name, string $parentId)
    {
        $ownerId = $this->mainRepository->getMenuByUUID($parentId)->owner_id;
        return $this->mainRepository->createMenu($name, $parentId, $ownerId);
    }

    public function updateMenu(string $id, array $data)
    {
        return $this->mainRepository->updateMenu($id, $data);
    }

    public function deleteMenu(string $id)
    {
        return $this->mainRepository->deleteMenu($id);
    }
}
