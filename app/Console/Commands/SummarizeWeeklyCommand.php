<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Models\News;
use App\Models\NewsSummaries;
use MoeMizrak\LaravelOpenrouter\DTO\ChatData;
use MoeMizrak\LaravelOpenrouter\DTO\MessageData;
use MoeMizrak\LaravelOpenrouter\Types\RoleType;
use MoeMizrak\LaravelOpenrouter\Facades\LaravelOpenRouter;
use MoeMizrahi\OpenRouter\Facades\OpenRouter;

class SummarizeWeeklyCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:summarize-weekly-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ringkas berita mingguan menggunakan OpenRouter LLM';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $periodType = 'weekly';
            $startDate = Carbon::now()->startOfWeek();
            $endDate = Carbon::now()->endOfWeek();

            $newsContents = News::whereNotNull('published_at')
                ->whereBetween('published_at', [Carbon::now()->subWeek(), Carbon::now()])
                ->take(100) // opsional, batas aman
                ->pluck('content');

            $allContents = $newsContents->implode("\n\n");

            if (empty($allContents)) {
                Log::warning('[SummarizeWeeklyCommand] Tidak ada berita ditemukan.');
                $this->warn('Tidak ada konten berita untuk diringkas.');
                return;
            }

            $content = <<<PROMPT
Anda adalah asisten AI profesional yang membuat ringkasan berita dalam Bahasa Indonesia yang baik dan benar. 
Tugas Anda adalah menyajikan ringkasan yang mudah dipahami oleh pembaca awam, menggunakan gaya bahasa naratif, bukan berupa poin-poin. 
Fokuskan ringkasan pada highlight utama: siapa, apa, kapan, mengapa, dan dampaknya terhadap masyarakat. 
Jika ada kutipan tokoh atau reaksi manusiawi, ringkaslah dengan alami dan ringkas.

Pastikan:
- Gunakan maksimal 100 kata per paragraf.
- Struktur HTML harus dipertahankan: setiap <h1> diikuti satu <p> berisi ringkasan.
- Jangan ubah atau hilangkan tag HTML.
- Gunakan Bahasa Indonesia baku yang jelas dan mudah dimengerti oleh masyarakat umum.

Berikut ini adalah isi berita yang akan diringkas:
$allContents
PROMPT;

            $chatData = new ChatData(
                messages: [
                    new MessageData(
                        content: $content,
                        role: RoleType::USER,
                    ),
                ],
                model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
            );

            $chatResponse = LaravelOpenRouter::chatRequest($chatData);

            Log::debug('[SummarizeWeeklyCommand] OpenRouter response', [
                'response' => $chatResponse ? get_class($chatResponse) : null,
                'properties' => $chatResponse ? get_object_vars($chatResponse) : null,
            ]);

            // Fix 1: Use correct variable name ($chatResponse instead of $response)
            // Fix 2: Use object syntax instead of array syntax
            // if ($chatResponse && isset($chatResponse->choices[0]->message->content)) {
            //     $summary = $chatResponse->choices[0]->message->content; // Object access

            //     NewsSummaries::create([
            //         'period_type' => $periodType,
            //         'start_date' => $startDate,
            //         'end_date' => $endDate,
            //         'summary' => $summary,
            //     ]);

            //     Log::info('[SummarizeWeeklyCommand] Ringkasan berhasil disimpan.');
            //     $this->info('Ringkasan mingguan berhasil disimpan.');
            // } else {
            //     // Improved error logging with response details
            //     Log::error('[SummarizeWeeklyCommand] Gagal mendapatkan ringkasan dari API.', [
            //         'response' => $chatResponse ? get_class($chatResponse) : 'NULL RESPONSE',
            //         'error' => $chatResponse->error ?? null,
            //     ]);
            //     $this->error('Gagal mendapatkan ringkasan dari API.');
            // }
            // Check for successful response with content
            // Check for successful response with content (fixed array access)
            if (
                $chatResponse &&
                property_exists($chatResponse, 'choices') &&
                is_array($chatResponse->choices) &&
                count($chatResponse->choices) > 0 &&
                isset($chatResponse->choices[0]['message']) && // Array access
                isset($chatResponse->choices[0]['message']['content']) // Array access
            ) {
                $summary = $chatResponse->choices[0]['message']['content']; // Array access

                // Save to database
                NewsSummaries::create([
                    'period_type' => $periodType,
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                    'summary' => $summary,
                ]);

                Log::info('[SummarizeWeeklyCommand] Ringkasan berhasil disimpan.');
                $this->info('Ringkasan mingguan berhasil disimpan.');
            } else {
                // More detailed error logging
                $errorDetails = [
                    'response_exists' => (bool) $chatResponse,
                    'choices_exists' => $chatResponse && property_exists($chatResponse, 'choices'),
                    'choices_count' => $chatResponse && property_exists($chatResponse, 'choices') ? count($chatResponse->choices) : 0,
                    'message_exists' => $chatResponse &&
                        property_exists($chatResponse, 'choices') &&
                        count($chatResponse->choices) > 0 &&
                        isset($chatResponse->choices[0]['message']),
                    'content_exists' => $chatResponse &&
                        property_exists($chatResponse, 'choices') &&
                        count($chatResponse->choices) > 0 &&
                        isset($chatResponse->choices[0]['message']) &&
                        isset($chatResponse->choices[0]['message']['content']),
                ];

                Log::error('[SummarizeWeeklyCommand] Gagal mendapatkan ringkasan dari API.', $errorDetails);
                $this->error('Gagal mendapatkan ringkasan dari API.');
            }
        } catch (\Throwable $e) {
            Log::error('[SummarizeWeeklyCommand] Terjadi kesalahan: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);
            $this->error('Terjadi error: ' . $e->getMessage());
        }
    }
}
