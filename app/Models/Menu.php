<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Menu extends Model
{
    /** @use HasFactory<\Database\Factories\MenuFactory> */
    use HasFactory;
    use HasUuids;

    protected $fillable = ['name', 'depth', 'owner_id', 'parent_id'];

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    public function parent()
    {
        return $this->belongsTo(Menu::class);
    }

    public function childrens()
    {
        return $this->hasMany(Menu::class, 'parent_id');
    }
}
