<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class News extends Model
{
    use HasFactory;
    protected $casts = [
        'published_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    protected $fillable = [
        'title',
        'image',
        'content',
        'slug',
        'category_id',
        'is_active',
        'published_at'
    ];


    public function category()
    {
        return $this->belongsTo(NewsCategory::class, 'category_id');
    }
}
