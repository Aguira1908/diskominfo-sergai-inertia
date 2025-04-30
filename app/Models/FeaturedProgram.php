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

}
