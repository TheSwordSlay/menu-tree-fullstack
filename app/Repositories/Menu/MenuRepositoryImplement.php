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

    // Write something awesome :)
}
