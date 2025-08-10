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

        User::factory()->create([
            'name' => 'Rizalul Fiqri',
            'email' => 'fiqrijambi@gmail.com',
            'password' => bcrypt('password'),
        ]);

        Menu::create([
            'owner_id' => 1,
            'parent_id' => null,
            'name' => 'Main menu 1'
        ]);

        Menu::create([
            'owner_id' => 1,
            'parent_id' => 1,
            'name' => 'sub menu 1'
        ]);

        Menu::create([
            'owner_id' => 1,
            'parent_id' => 1,
            'name' => 'sub menu 1'
        ]);

        Menu::create([
            'owner_id' => 1,
            'parent_id' => 1,
            'name' => 'sub menu 1'
        ]);

        Menu::create([
            'owner_id' => 1,
            'parent_id' => 2,
            'name' => 'sub menu 1'
        ]);

        Menu::create([
            'owner_id' => 1,
            'parent_id' => 3,
            'name' => 'sub menu 1'
        ]);

        Menu::create([
            'owner_id' => 1,
            'parent_id' => 3,
            'name' => 'sub menu 1'
        ]);
    }
}
