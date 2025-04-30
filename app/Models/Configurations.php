<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Configurations extends Model
{
    protected $fillable = ['title', 'slogan', 'information', 'telephone', 'email', 'background', 'is_active'];

    protected $casts = [
        'background' => 'array',
    ];

}
