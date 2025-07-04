<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>
Website Diskominfo Sergai – website layanan masyarakat dan portal berita dengan Automatic News Summarization. Proyek ini merupakan sistem portal berita interaktif untuk Dinas Komunikasi dan Informatika (Diskominfo) Serdang Bedagai. Salah satu fitur utama yang ditawarkan adalah kemampuan untuk **merangkum berita secara otomatis** menggunakan teknologi _Natural Language Processing (NLP)_ berbasis model LLM (Large Language Model).

---

## 🔧 Teknologi yang Digunakan

-   **Laravel 12.x** – Framework backend utama
-   **React.js (via Inertia.js)** – Frontend dinamis
-   **FilamentPHP** – Admin panel Laravel
-   **MySQL** – Database sistem
-   **Tailwind CSS** – Framework CSS untuk styling responsif
-   **OpenRouter API / Local LLM** – Untuk menghasilkan ringkasan berita
-   **Scheduler + Cron** – Untuk menjadwalkan peringkasan berita otomatis

---

## ✨ Fitur Utama

### 🔸 Portal Publik

-   Menampilkan berita terbaru, program unggulan, banner, dan konten dinamis lainnya.
-   Terhubung dengan berita dari sistem internal dan Media Center berbasis WordPress.

### 🔸 Manajemen Konten

-   CRUD berita internal.
-   Integrasi API eksternal dari WordPress untuk mengambil data berita eksternal.

### 🔸 Automatic News Summarization

-   Ringkasan otomatis berdasarkan rentang waktu (harian, mingguan, bulanan).
-   Ringkasan disimpan dalam tabel `news_summarize`.
-   Bisa dijalankan secara manual via Admin Panel maupun otomatis via scheduler.

---

## 📁 Struktur Direktori

├── app/
│ ├── Console/Commands/AppSummarizeWeeklyCommand.php
│ ├── Services/NewsSummarizationService.php
│ └── Models/{News, NewsSummaries}.php
├── resources/js/ # React + Inertia Frontend
├── routes/
│ ├── web.php # Route untuk frontend dan admin
│ ├── console.php # trigger command summarize dan penjadwalan (weekly)
│ └── api.php # API endpoint untuk fetching dan summarization
├── database/migrations/ # Struktur DB
├── public/ # Aset publik
├── storage/ # File dan log
└── README.md

---

## 🚀 Instalasi & Setup

1. **Clone Repository**

```bash
git clone https://github.com/Aguira1908/diskominfo-sergai-inertia.git
cd diskominfo-sergai
```

2. **Install Dependency**

```bash
composer install
npm install && npm run build
```

3. **Install Dependency**

```bash
cp .env.example .env
php artisan key:generate
```

note: untuk api key OpenRouter dan Konfigurasi OpenRouter Tanya ke developer

4. **Migrasi dan Seeding Database**

```bash
php artisan migrate --seed
```

## ⚙️ Konfigurasi Cron di VPS (Wajib)

Konfigurasi cron dilakukan untuk melakukan penjadwalan dalam melakukan summarize weekly secara otomatis.

buka menu cron dengan : `crontab -e`:

```bash
* * * * * cd /var/www/[nama-file-project] && php artisan schedule:run >> /var/www/[nama-file-project]/storage/logs/scheduler.log 2>&1
```

untuk mengecek apakah schedule sudah berjalan atau belum

```bash
 php artisan schedule:list
```

note : untuk melakukan summarize secara manual (untuk pertama kali) jalankan perintah berikut :

```bash
 php artisan summary:trigger-weekly
```

---

## 🧠 Arsitektur Summarization

1. Ambil berita dari internal database dan website Media Center melalui API.
2. Gabungkan seluruh berita dan lakukan pemotongan jika jumlah token melebihi batas model LLM.
3. Kirim teks hasil gabungan ke model LLM melalui OpenRouter API.
4. Terima hasil ringkasan dan simpan ke tabel di database.
5. Tampilkan hasil ringkasan di panel admin, dan/atau pada halaman publik.
