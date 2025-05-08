<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'date',
        'start_time',
        'end_time',
        'location',
        'dresscode',
        'is_active',
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
        'is_active' => 'boolean',
    ];

    protected $attributes = [
        'dresscode' => 'Bebas Sopan',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('date', '>=', now()->toDateString())
            ->orderBy('date')
            ->orderBy('start_time');
    }

    public function getFormattedDateAttribute()
    {
        return Carbon::parse($this->date)->translatedFormat('d F Y');
    }

    public function getTimeRangeAttribute()
    {
        return Carbon::parse($this->start_time)->format('H:i')
            . ' - '
            . Carbon::parse($this->end_time)->format('H:i');
    }
}
