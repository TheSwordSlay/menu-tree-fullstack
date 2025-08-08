<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    /** @use HasFactory<\Database\Factories\MenuFactory> */
    use HasFactory;

    protected $fillable = ['name', 'depth', 'owner_id', 'parent_id'];

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    public function parent()
    {
        return $this->belongsTo(Parent::class);
    }

    public function childrens()
    {
        return $this->HasMany(Parent::class);
    }
}
