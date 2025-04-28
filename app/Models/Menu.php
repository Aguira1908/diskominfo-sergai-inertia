<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Menu extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'url_slug', 'is_active'];

    public function submenus(): HasMany
    {
        return $this->hasMany(Submenu::class);
    }

    public function contents(): HasMany
    {
        return $this->hasMany(Content::class);
    }

}
