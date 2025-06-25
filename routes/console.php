<?php

use App\Console\Commands\SummarizeWeeklyCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Jobs\SummarizeNewsJob;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Artisan::command('summary:trigger-weekly', function () {
    $this->call('app:summarize-weekly-command'); // ini adalah signature dari command class
    $this->info('Command summarize:weekly telah dijalankan via console.php');
})->weekly();