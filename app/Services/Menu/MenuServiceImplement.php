<?php

namespace App\Services\Menu;

use App\Models\Menu;
use Illuminate\Support\Facades\Log;
use LaravelEasyRepository\ServiceApi;
use App\Repositories\Menu\MenuRepository;

class MenuServiceImplement extends ServiceApi implements MenuService{

    /**
     * set title message api for CRUD
     * @param string $title
     */
     protected string $title = "";
     /**
     * uncomment this to override the default message
     * protected string $create_message = "";
     * protected string $update_message = "";
     * protected string $delete_message = "";
     */

     /**
     * don't change $this->mainRepository variable name
     * because used in extends service class
     */
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

    public function getMenuById(int $id)
    {
        return $this->mainRepository->getMenuById($id);
    }

    public function createMenu(array $data)
    {
        // Add any business logic or validation here before creating
        return $this->mainRepository->createMenu($data);
    }

    public function updateMenu(int $id, array $data)
    {
        // Add any business logic or validation here before updating
        return $this->mainRepository->updateMenu($id, $data);
    }

    public function deleteMenu(int $id)
    {
        // Add any business logic or validation here before deleting
        return $this->mainRepository->deleteMenu($id);
    }
}
