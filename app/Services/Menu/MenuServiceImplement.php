<?php

namespace App\Services\Menu;

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

    // Define your custom methods :)
}
