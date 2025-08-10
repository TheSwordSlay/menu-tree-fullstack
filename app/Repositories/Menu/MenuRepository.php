<?php

namespace App\Repositories\Menu;

use LaravelEasyRepository\Repository;

interface MenuRepository extends Repository{

    public function getAllMenusByOwnerId(int $id);
    public function getMenuByUUID(string $id);
    public function getMenuChildrens(string $id);
    public function createMenu(string $name, ?string $parentId, int $ownerId);
    public function updateMenu(string $id, string $name);
    public function deleteMenu(string $id);
}
