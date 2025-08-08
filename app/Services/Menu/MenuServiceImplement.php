<?php

namespace App\Services\Menu;

use App\Models\Menu;
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
            $menuHierarchies[] = $this->buildMenuTree($menu);
        }

        return $menuHierarchies;
    }

    private function buildMenuTree(Menu $menu)
    {
        $children = $this->mainRepository->getMenuChildrens($menu->id);
        $menu->children = [];

        foreach ($children as $child) {
            $menu->children[] = $this->buildMenuTree($child);
        }

        return $menu;
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
