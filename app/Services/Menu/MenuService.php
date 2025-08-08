<?php

namespace App\Services\Menu;

use LaravelEasyRepository\BaseService;

interface MenuService extends BaseService{

    public function getHierarchyByOwnerID(int $id);
    public function getMenuById(int $id);
    public function createMenu(array $data);
    public function updateMenu(int $id, array $data);
    public function deleteMenu(int $id);
}
