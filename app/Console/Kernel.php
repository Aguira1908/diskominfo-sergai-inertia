<?php

namespace App\Console;

use App\Jobs\SummarizeNewsJob;
use App\Schedules\SummarizeNewsWeekly;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // // Job untuk meringkas berita mingguan
        $schedule->job(new SummarizeNewsJob())
            ->weekly()
            ->sundays()
            ->at('23:00')
            ->name('summarize-news-weekly')
            ->withoutOverlapping()
            ->onOneServer(); // Tambahan: pastikan hanya berjalan di satu server jika ada multiple servers
        // Panggil schedule dari class terpisah
        // (new SummarizeNewsWeekly())($schedule);
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');
        require base_path('routes/console.php');
    }
}