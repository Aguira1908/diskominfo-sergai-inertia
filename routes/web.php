<?php

use App\Models\Menu;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/berita', function () {
    return Inertia::render('Berita');
});

Route::get('/berita/{slug}', function ($slug) {
    return Inertia::render('Article', [
        'slug' => $slug
    ]);
});

Route::get('/summarize', function () {
    return Inertia::render('ArticleNewsSum');
});
Route::get('/proxy/categories', function () {
    $response = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/categories');
    return $response->json();
});

// Ambil data terbaru dari setiap kategori
Route::get('/proxy/posts-latest-by-category', function () {
    // Ambil semua kategori dulu
    $categoriesResponse = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/categories');

    if (!$categoriesResponse->ok()) {
        abort(500, 'Failed to fetch categories');
    }

    $categories = collect($categoriesResponse->json());

    // Batasi jumlah kategori jika perlu (misal: 10)
    $limitedCategories = $categories->take(10);

    // Ambil 1 post terbaru per kategori
    $posts = $limitedCategories->map(function ($category) {
        $postsResponse = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/posts', [
            'categories' => $category['id'],
            'per_page' => 1,
            'orderby' => 'date',
            'order' => 'desc',
            '_embed' => true, // jika ingin thumbnail atau author
        ]);

        $post = $postsResponse->json()[0] ?? null;

        if (!$post)
            return null;

        return [
            'category_id' => $category['id'],
            'category_name' => $category['name'],
            'post_id' => $post['id'],
            'title' => $post['title']['rendered'],
            'slug' => $post['slug'],
            'excerpt' => strip_tags($post['excerpt']['rendered']),
            'link' => $post['link'],
            'date' => $post['date'],
            'thumbnail' => $post['jetpack_featured_media_url'] ?? null, // ← GANTI INI
        ];
    })->filter(); // hapus yang null

    return response()->json($posts->values());
});

// Routing dinamis untuk menu dan submenu
Route::get('/{menuSlug}/{submenuSlug?}', function ($menuSlug, $submenuSlug = null) {
    // Mencari menu berdasarkan slug
    $menu = Menu::with('submenus')
        ->where('url_slug', $menuSlug)
        ->where('is_active', true)
        ->first();

    if (!$menu) {
        abort(404, 'Menu Not Found');
    }

    // Jika submenuSlug diberikan, cari submenu berdasarkan slug
    if ($submenuSlug) {
        $submenu = $menu->submenus()->where('url_slug', $submenuSlug)->first();

        if (!$submenu) {
            abort(404, 'Submenu Not Found');
        }

        // Render submenu
        return Inertia::render('ArticleContent', [
            'menu' => $menu,
            'submenu' => $submenu
        ]);
    }

    // Jika submenuSlug tidak ada, render menu utama
    return Inertia::render('ArticleContent', [
        'menu' => $menu
    ]);
})->where(['menuSlug' => '[a-zA-Z0-9-_]+', 'submenuSlug' => '[a-zA-Z0-9-_]+']);
// Route::get('/profil', function () {
//     return Inertia::render('ArticleContent');
// });
// routes/web.php

