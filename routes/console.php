<?php

use Carbon\Carbon;
use App\Jobs\SummarizeNewsJob;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Console\Commands\SummarizeWeeklyCommand;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Artisan::command('summary:trigger-weekly', function () {
    $startDate = Carbon::now()->copy()->subWeek()->addDay(); // Minggu lalu + 1 → Senin
    $endDate = Carbon::now();


    Log::info('Mengambil berita berdasarkan rentang tanggal', [
        'start' => $startDate,
        'end' => $endDate,
    ]);
    $this->call('app:summarize-weekly-command', [
        '--start' => $startDate,
        '--end' => $endDate,
    ]);
    $this->info("Command summarize:weekly telah dijalankan dengan tanggal $startDate - $endDate");
    // $this->call('app:summarize-weekly-command'); // ini adalah signature dari command class
})->sundays()->at('23:59');