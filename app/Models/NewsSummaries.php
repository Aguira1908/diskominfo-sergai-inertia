<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsSummaries extends Model
{
    protected $fillable = [
        'period_type',
        'start_date',
        'end_date',
        'summary'
    ];
}
