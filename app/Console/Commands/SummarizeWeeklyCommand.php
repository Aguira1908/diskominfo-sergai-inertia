<?php

namespace App\Console\Commands;

use App\Models\News;
use App\Models\NewsSummaries;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use MoeMizrak\LaravelOpenrouter\DTO\ChatData;
use MoeMizrak\LaravelOpenrouter\DTO\ErrorData;
use MoeMizrak\LaravelOpenrouter\DTO\MessageData;
use MoeMizrak\LaravelOpenrouter\Facades\LaravelOpenRouter;
use MoeMizrak\LaravelOpenrouter\Types\RoleType;
use Throwable;

class SummarizeWeeklyCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:summarize-weekly-command {--start=} {--end=}';

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
            $startDate = $this->option('start')
                ? Carbon::parse($this->option('start'))
                : Carbon::now()->subWeek()->startOfWeek();

            $endDate = $this->option('end')
                ? Carbon::parse($this->option('end'))
                : Carbon::now()->subWeek()->endOfWeek();

            $localContents = News::where('is_active', true)
                ->whereNotNull('published_at')
                ->whereBetween('published_at', [$startDate, $endDate])
                ->take(5)
                ->get(['title', 'content']);

            $mediaCenterContents = $this->fetchMediaCenterNews($startDate, $endDate, 5);

            Log::info('Jumlah berita lokal:', ['total' => $localContents->count()]);
            Log::info('Jumlah berita media center:', ['total' => $mediaCenterContents->count()]);

            $combined = $localContents->map(fn($item) => [
                'title' => $item->title,
                'content' => $item->content,
            ])->concat($mediaCenterContents);

            $allContents = $combined->map(fn($item) => "<h1>{$item['title']}</h1>\n<p>{$item['content']}</p>")->implode("\n\n");

            if (empty($allContents)) {
                Log::warning('[SummarizeWeeklyCommand] Tidak ada berita ditemukan.');
                $this->warn('Tidak ada konten berita untuk diringkas.');
                return;
            }

            $content = <<<PROMPT
            **TUGAS UTAMA**: Buat ringkasan berita **abstraktif** (parafrasa kreatif, bukan copy-paste) dalam format HTML.
            
            🌟 **KRITERIA KUALITAS**:
            1. **Singkat**: Maksimal **200 kata/ringkasan**, gunakan kalimat efisien
            2. **Jernih**: Gunakan Bahasa Indonesia baku + istilah teknis yang dijelaskan (mis: "blockchain → sistem pencatatan digital terdesentralisasi", tetapi tetap membawakan teks aslinya)
            3. **Struktur Ketat**:
               - Setiap `<h1>` diinput HARUS diikuti **tepat satu** `<p>`
               - Urutan tag HTML asli TIDAK BOLEH diubah
               - Dilarang membuat tag baru (seperti `<div>` atau `<span>`)
            
            ✍️ **PANDUAN NARASI**:
            - Mulai dengan inti berita (5W+1H) di kalimat pertama
            - Gunakan konjungsi naratif: _"sehingga", "namun", "karena itu", "sementara itu"_
            - Prioritaskan: dampak → penyebab → detail pendukung
            - Hilangkan: kutipan langsung, statistik minor, opini editorial
            
            ⚡ **OPTIMASI KONSISTENSI**:
            1. **Judul**: 
               - Konversi judul clickbait jadi netral (contoh: "VIRAAAAAM!!!" → "Pasar Saham Anjlok Tajam")
               - Pertahankan entitas nama (orang/lembaga/lokasi)
            2. **Konten**:  
               - Abaikan informasi berulang di paragraf berbeda
               - Kompresi urutan kejadian kronologis jadi maksimal 2 poin waktu
            
            🚫 **LARANGAN KRITIS**:
            - Jangan tambahkan tanggal/tempat kecuali krusial
            - Jangan ulangi judul di teks ringkasan
            - Hindari kata: _"menurut", "dikatakannya", "dalam kesempatan itu"_
            - Cukup jawab dengan hasil ringkasan berita tidak perlu yang lain seperti : "Berikut adalah ringkasan abstraktif dalam format HTML sesuai kriteria yang diminta:" atau  ```html"

            📜 **CONTOH OUTPUT BENAR**:
            <h1>Bank Central Asia Catat Kenaikan Laba Bersih</h1>
            <p>PT Bank Central Asia (BCA) membukukan laba bersih Rp12,5 triliun pada kuartal I-2024, meningkat 10% dibanding periode sama tahun sebelumnya. Peningkatan ini dipicu pertumbuhan kredit korporasi dan transaksi digital. Direktur Utama BCA menyatakan optimisme dengan proyeksi ekonomi nasional meskipun menyoroti potensi risiko inflasi.</p>
            
            Berita :
            $allContents
            PROMPT;

            $chatData = new ChatData(
                messages: [
                    new MessageData(
                        content: $content,
                        role: RoleType::USER,
                    ),
                ],
                model: 'deepseek/deepseek-chat-v3-0324:free',
            );

            $chatResponse = LaravelOpenRouter::chatRequest($chatData);
            dump($chatResponse);

            if ($chatResponse instanceof ErrorData) {
                Log::error('OpenRouter error', [
                    'code' => $chatResponse->code,
                    'message' => $chatResponse->message,
                ]);
                return;
            }

            $content = $chatResponse->choices[0]['message']['content'] ?? null;
            dump($content);

            if (!$content) {
                Log::error('ResponseData tidak mengandung konten.');
                NewsSummaries::updateOrCreate(
                    ['period_type' => 'weekly', 'start_date' => $startDate],
                    [
                        'end_date' => $endDate,
                        'summary' => $content,
                        'status' => 'empty',
                        'error_message' => "ResponseData tidak mengandung konten, silahkan lakukan Summarize Ulang",
                    ]
                );
                return;
            } else {
                Log::info('Ringkasan berhasil diterima.', ['content' => substr($content, 0, 100)]);
                NewsSummaries::updateOrCreate(
                    ['period_type' => 'weekly', 'start_date' => $startDate],
                    [
                        'end_date' => $endDate,
                        'summary' => $content,
                        'status' => 'success',
                        'error_message' => null,
                    ]
                );
                $this->info('Ringkasan berhasil disimpan.');
            }
        } catch (Throwable $e) {
            Log::error('[SummarizeWeeklyCommand] Terjadi error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            NewsSummaries::updateOrCreate(
                ['period_type' => 'weekly', 'start_date' => $startDate ?? now()],
                [
                    'end_date' => $endDate ?? now(),
                    'summary' => '',
                    'status' => 'failed',
                    'error_message' => $e->getMessage(),
                ]
            );

            $this->error('Terjadi error: ' . $e->getMessage());
        }
    }


    // Tambahkan method baru di dalam class
    protected function fetchMediaCenterNews(Carbon $startDate, Carbon $endDate, int $limit = 5)
    {
        try {
            $response = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/posts', [
                'after' => $startDate->toIso8601String(),
                'before' => $endDate->toIso8601String(),
                'per_page' => $limit,
                'orderby' => 'date',
                'order' => 'desc',
                '_fields' => 'id,title,content',
            ]);

            if (!$response->ok()) {
                Log::warning('[fetchMediaCenterNews] Gagal mengambil data media center.');
                return collect();
            }

            return collect($response->json())->map(function ($post) {
                return [
                    'title' => html_entity_decode($post['title']['rendered']),
                    'content' => strip_tags($post['content']['rendered']),
                ];
            });
        } catch (\Throwable $e) {
            Log::error('[fetchMediaCenterNews] Error: ' . $e->getMessage());
            return collect();
        }
    }


}
