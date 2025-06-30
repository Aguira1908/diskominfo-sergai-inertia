<?php

use App\Models\Menu;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;
use Illuminate\Support\Facades\Cache;
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

