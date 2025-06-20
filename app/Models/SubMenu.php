<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubMenu extends Model
{

    protected $table = 'sub_menus';
    protected $fillable = ['menu_id', 'title', 'excerpt', 'url_slug', 'position', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }

    public function contents(): HasMany
    {
        return $this->hasMany(Content::class);
    }
}
