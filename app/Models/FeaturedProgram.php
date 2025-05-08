<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeaturedProgram extends Model
{
    protected $fillable = [
        'title',
        'icon',
        'description',
        'url',
        'is_active'
    ];



    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = ['icon_url'];

    public function getIconUrlAttribute()
    {
        return url('storage/' . $this->icon);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
    public function scopeOrdered($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}

