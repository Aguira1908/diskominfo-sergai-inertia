<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Content extends Model
{
    protected $fillable = [
        'menu_id',
        'sub_menu_id',
        'title',
        'content',
        'slug',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::saving(function (Content $content) {
            // Generate slug otomatis jika kosong
            if (empty($content->slug)) {
                $content->slug = Str::slug($content->title);
            }

            // Validasi: Jika menu memiliki sub-menu, wajib pilih sub-menu
            if ($content->menu_id) {
                $menu = \App\Models\Menu::find($content->menu_id);
                if ($menu && $menu->submenus()->exists() && !$content->sub_menu_id) {
                    throw new \Exception('Menu ini memiliki sub-menu, harap pilih sub-menu');
                }
            }
        });
    }

    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }

    public function submenu(): BelongsTo
    {
        return $this->belongsTo(Submenu::class, 'sub_menu_id');
    }

    // public function submenu(): BelongsTo
    // {
    //     return $this->belongsTo(Submenu::class, 'sub_menu_id');
    // }

    // public function menu()
    // {
    //     return $this->belongsTo(Menu::class);
    // }





}
