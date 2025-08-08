<?php

namespace App\Repositories\Menu;

use LaravelEasyRepository\Repository;

interface MenuRepository extends Repository{

    public function getAllMenusByOwnerId(int $id);
    public function getMenuById(int $id);
    public function getMenuChildrens(int $id);
    public function createMenu(array $data);
    public function updateMenu(int $id, array $data);
    public function deleteMenu(int $id);
}
