<?php

namespace App\Repositories\Menu;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Menu;

class MenuRepositoryImplement extends Eloquent implements MenuRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected Menu $model;

    public function __construct(Menu $model)
    {
        $this->model = $model;
    }

    public function getAllMenusByOwnerId(int $id)
    {
        return $this->model->where('owner_id', $id)->whereNull('parent_id')->get();
    }

    public function getMenuById(int $id)
    {
        return $this->model->find($id);
    }

    public function getMenuChildrens(int $id)
    {
        return $this->model->find($id)->childrens;
    }

    public function createMenu(array $data)
    {
        return $this->model->create($data);
    }

    public function updateMenu(int $id, array $data)
    {
        $menu = $this->model->find($id);
        if ($menu) {
            $menu->update($data);
            return $menu;
        }
        return null;
    }

    public function deleteMenu(int $id)
    {
        $menu = $this->model->find($id);
        if ($menu) {
            return $menu->delete();
        }
        return false;
    }
}
