<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Menu;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $testUser = User::factory()->create([
            'name' => 'Testing User',
            'email' => 'testinguser123@gmail.com',
            'password' => bcrypt('password123@123'),
        ]);

        $mainMenu1 = Menu::create([
            'owner_id' => $testUser->id,
            'parent_id' => null,
            'name' => 'Main menu 1'
        ]);

        $subMenu1_1 = Menu::create([
            'owner_id' => $testUser->id,
            'parent_id' => $mainMenu1->id,
            'name' => 'sub menu 1'
        ]);

        Menu::create([
            'owner_id' => $testUser->id,
            'parent_id' => $mainMenu1->id,
            'name' => 'sub menu 2'
        ]);

        Menu::create([
            'owner_id' => $testUser->id,
            'parent_id' => $mainMenu1->id,
            'name' => 'sub menu 3'
        ]);

        $subMenu1_2 = Menu::create([
            'owner_id' => $testUser->id,
            'parent_id' => $subMenu1_1->id,
            'name' => 'sub menu 1.1'
        ]);

        Menu::create([
            'owner_id' => $testUser->id,
            'parent_id' => $subMenu1_2->id,
            'name' => 'sub menu 1.1.1'
        ]);

        Menu::create([
            'owner_id' => $testUser->id,
            'parent_id' => $subMenu1_2->id,
            'name' => 'sub menu 1.1.2'
        ]);

        $mainMenu2 = Menu::create([
            'owner_id' => $testUser->id,
            'parent_id' => null,
            'name' => 'Main menu 2'
        ]);
        $subMenu2_1 = Menu::create([
            'owner_id' => $testUser->id,
            'parent_id' => $mainMenu2->id,
            'name' => 'sub menu 1'
        ]);
    }
}
