<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class NewsCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'is_active'
    ];



    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function news()
    {
        return $this->hasMany(News::class, 'category_id');
    }
}
