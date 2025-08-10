<?php

namespace App\Services\Menu;

use LaravelEasyRepository\BaseService;

interface MenuService extends BaseService{

    public function getHierarchyByOwnerID(int $id);
    public function getMenuByUUID(string $id);
    public function createMenu(array $data);
    public function updateMenu(string $id, array $data);
    public function deleteMenu(string $id);
}
