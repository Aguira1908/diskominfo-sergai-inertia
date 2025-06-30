<?php

namespace App\Http\Controllers\Api;

use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Collection;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index(Request $request)
    // {
    //     $query = News::where('is_active', true)
    //         ->with([
    //             'category' => function ($q) {
    //                 $q->select('id', 'name', 'slug');
    //             }
    //         ])
    //         ->select([
    //             'id',
    //             'title',
    //             'image',
    //             'excerpt',
    //             'slug',
    //             'category_id',
    //             'published_at',
    //             'created_at'
    //         ]);

    //     // Filter berita terbaru secara global
    //     if ($request->boolean('latest')) {
    //         $query->latest('published_at');
    //     }

    //     // Filter berita terbaru per kategori
    //     if ($request->boolean('latest_per_category')) {
    //         $query->whereIn('id', function ($subquery) {
    //             $subquery->selectRaw('id')
    //                 ->from('news as n1')
    //                 ->whereRaw('n1.id = (
    //             SELECT n2.id FROM news n2
    //             WHERE n2.category_id = n1.category_id AND n2.is_active = true
    //             ORDER BY n2.published_at DESC
    //             LIMIT 1
    //         )');
    //         });
    //     }
    //     // Filter berdasarkan kategori (slug)
    //     if ($request->filled('category')) {
    //         $query->whereHas('category', function ($q) use ($request) {
    //             $q->where('slug', $request->get('category'));
    //         });
    //     }

    //     // Tentukan jumlah per halaman, maksimum 100
    //     $perPage = min($request->get('per_page', 5), 100);

    //     // Lakukan paginasi
    //     $news = $query->paginate($perPage)
    //         ->setPath($request->url())
    //         ->appends($request->query());

    //     // Response JSON
    //     return response()->json([
    //         'data' => $news->getCollection(),
    //         'meta' => [
    //             'current_page' => $news->currentPage(),
    //             'per_page' => $news->perPage(),
    //             'total' => $news->total(),
    //         ]
    //     ]);
    // }
    // public function index(Request $request)
    // {
    //     $categorySlug = $request->get('category');
    //     $perPage = min($request->get('per_page', 10), 100);
    //     $page = (int) $request->get('page', 1);
    //     $fetchLimit = $perPage * 3; // Ambil 3x dari masing-masing sumber, supaya cukup digabungkan
    //     // ========= 1. Ambil berita lokal ========= //
    //     $localQuery = News::where('is_active', true)
    //         ->with(['category:id,name,slug'])
    //         ->select('id', 'title', 'image', 'excerpt', 'slug', 'category_id', 'published_at', 'created_at');

    //     // Filter kategori jika ada
    //     if ($categorySlug) {
    //         $localQuery->whereHas('category', fn ($q) => $q->where('slug', $categorySlug));
    //     }

    //     // Filter latest
    //     if ($request->boolean('latest')) {
    //         $localQuery->orderByDesc('published_at');
    //     }

    //     // Filter latest_per_category
    //     if ($request->boolean('latest_per_category')) {
    //         $localQuery->whereIn('id', function ($sub) {
    //             $sub->selectRaw('id')->from('news as n1')->whereRaw('n1.id = (
    //                 SELECT n2.id FROM news n2
    //                 WHERE n2.category_id = n1.category_id AND n2.is_active = true
    //                 ORDER BY n2.published_at DESC LIMIT 1
    //             )');
    //         });
    //     }
    //     $localNews = $localQuery
    //         ->orderByDesc('published_at')
    //         ->limit($fetchLimit)
    //         ->get()
    //         ->map(function ($item) {
    //             return [
    //                 'id' => $item->id,
    //                 'slug' => $item->slug,
    //                 'title' => $item->title,
    //                 'excerpt' => $item->excerpt,
    //                 'image_url' => $item->image,
    //                 'published_at' => $item->published_at,
    //                 'penulis' => 'Lokal',
    //                 'category' => $item->category,
    //             ];
    //         });

    //     // ========= 2. Ambil berita dari Media Center ========= //
    //     $mediaNews = collect();

    //     try {
    //         $mediaParams = [
    //             'per_page' => $fetchLimit,
    //             'page' => 1,
    //             'orderby' => 'date',
    //             'order' => 'desc',
    //             '_fields' => 'id,date,slug,title,excerpt,jetpack_featured_media_url,categories,author',
    //         ];


    //         // Jika ada kategori, cari ID dari slug
    //         if ($categorySlug) {
    //             $catRes = Http::withoutVerifying()->timeout(5)
    //                 ->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/categories', [
    //                     'slug' => $categorySlug,
    //                 ]);
    //             $catId = collect($catRes->json())->first()['id'] ?? null;
    //             if ($catId) $mediaParams['categories'] = $catId;
    //         }

    //         $mediaRes = Http::withoutVerifying()->timeout(10)
    //             ->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/posts', $mediaParams);

    //         if ($mediaRes->ok()) {
    //             $mediaNews = collect($mediaRes->json())->map(function ($item) {
    //                 return [
    //                     'id' => $item['id'],
    //                     'slug' => $item['slug'],
    //                     'title' => $item['title']['rendered'],
    //                     'excerpt' => strip_tags($item['excerpt']['rendered']),
    //                     'image_url' => $item['jetpack_featured_media_url'] ?? null,
    //                     'published_at' => $item['date'],
    //                     'penulis' => 'Media Center',
    //                     'category' => [], // Optional: bisa fetch lagi kategori WordPress
    //                 ];
    //             });
    //         }
    //     } catch (\Throwable $e) {
    //         // Bisa log atau abaikan saja jika error
    //     }

    //     // ========= 3. Gabungkan & paginasi manual ========= //
    //     $merged = $localNews->concat($mediaNews)->sortByDesc('published_at')->values();

    //     $total = $merged->count();
    //     $paginated = $merged->forPage($page, $perPage)->values();

    //     return response()->json([
    //         'data' => $paginated,
    //         'meta' => [
    //             'current_page' => $page,
    //             'per_page' => $perPage,
    //             'total' => $total,
    //             'total_pages' => ceil($total / $perPage),
    //         ]
    //     ]);
    // }
    // public function index(Request $request)
    // {
    //     $categorySlug = $request->get('category');
    //     $perPage = min($request->get('per_page', 10), 100);
    //     $page = (int) $request->get('page', 1);
    //     $isLatest = $request->boolean('latest');
    //     $isLatestPerCategory = $request->boolean('latest_per_category');
    //     $fetchLimit = $perPage * 3;

    //     // Buat cache key unik berdasarkan filter
    //     $cacheKey = 'news:index:category=' . ($categorySlug ?? 'all') .
    //                 ':page=' . $page .
    //                 ':perPage=' . $perPage .
    //                 ':latest=' . ($isLatest ? '1' : '0') .
    //                 ':latest_per_category=' . ($isLatestPerCategory ? '1' : '0');

    //     return Cache::remember($cacheKey, now()->addMinutes(10), function () use (
    //         $categorySlug, $perPage, $page, $fetchLimit, $isLatest, $isLatestPerCategory
    //     ) {
    //         // ========= 1. Ambil berita lokal ========= //
    //         $localQuery = News::where('is_active', true)
    //             ->with(['category:id,name,slug'])
    //             ->select('id', 'title', 'image', 'excerpt', 'slug', 'category_id', 'published_at', 'created_at');

    //         if ($categorySlug) {
    //             $localQuery->whereHas('category', fn ($q) => $q->where('slug', $categorySlug));
    //         }

    //         if ($isLatest) {
    //             $localQuery->orderByDesc('published_at');
    //         }

    //         if ($isLatestPerCategory) {
    //             $localQuery->whereIn('id', function ($sub) {
    //                 $sub->selectRaw('id')->from('news as n1')->whereRaw('n1.id = (
    //                     SELECT n2.id FROM news n2
    //                     WHERE n2.category_id = n1.category_id AND n2.is_active = true
    //                     ORDER BY n2.published_at DESC LIMIT 1
    //                 )');
    //             });
    //         }

    //         $localNews = $localQuery
    //             ->orderByDesc('published_at')
    //             ->limit($fetchLimit)
    //             ->get()
    //             ->map(function ($item) {
    //                 return [
    //                     'id' => $item->id,
    //                     'slug' => $item->slug,
    //                     'title' => $item->title,
    //                     'excerpt' => $item->excerpt,
    //                     'image_url' => $item->image,
    //                     'published_at' => $item->published_at,
    //                     'penulis' => 'Lokal',
    //                     'category' => $item->category,
    //                     'source' => 'local',
    //                 ];
    //             });

    //         // ========= 2. Ambil berita dari Media Center ========= //
    //         $mediaNews = collect();

    //         try {
    //             if ($isLatestPerCategory) {
    //                 $mediaNews = Cache::remember('media-latest-per-category', now()->addMinutes(1), function () {
    //                     $categoriesRes = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/categories');
    //                     if (!$categoriesRes->ok()) return collect();

    //                     $categories = collect($categoriesRes->json())->take(10);

    //                     return $categories->map(function ($category) {
    //                         $postRes = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/posts', [
    //                             'categories' => $category['id'],
    //                             'per_page' => 1,
    //                             'orderby' => 'date',
    //                             'order' => 'desc',
    //                             '_embed' => true,
    //                         ]);

    //                         $post = $postRes->json()[0] ?? null;
    //                         if (!$post) return null;

    //                         return [
    //                             'id' => $post['id'],
    //                             'slug' => $post['slug'],
    //                             'title' => html_entity_decode($post['title']['rendered']),
    //                             'excerpt' =>  html_entity_decode(strip_tags($post['excerpt']['rendered'])),
    //                             'image_url' => $post['_embedded']['wp:featuredmedia'][0]['source_url'] ?? null,
    //                             'published_at' => $post['date'],
    //                             'penulis' => 'Media Center',
    //                             'category' => [
    //                                 'id' => $category['id'],
    //                                 'name' => $category['name'],
    //                                 'slug' => $category['slug'],
    //                             ],
    //                             'source' => 'media',
    //                         ];
    //                     })->filter()->values();
    //                 });
    //             } elseif ($isLatest) {
    //                 $mediaNews = Cache::remember('media-latest-news', now()->addMinutes(1), function () {
    //                     $postRes = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/posts', [
    //                         'per_page' => 5,
    //                         'orderby' => 'date',
    //                         'order' => 'desc',
    //                         '_fields' => 'id,date,slug,title,excerpt,jetpack_featured_media_url,categories,author',
    //                     ]);

    //                     $posts = collect($postRes->json());
    //                     $categoryIds = $posts->pluck('categories')->flatten()->unique()->all();
    //                     $authorIds = $posts->pluck('author')->unique()->all();

    //                     $categories = collect(Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/categories', [
    //                         'include' => implode(',', $categoryIds),
    //                         '_fields' => 'id,name,slug'
    //                     ])->json())->keyBy('id');

    //                     $authors = collect(Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/users', [
    //                         'include' => implode(',', $authorIds),
    //                         '_fields' => 'id,name'
    //                     ])->json())->keyBy('id');

    //                     return $posts->map(function ($item) use ($categories, $authors) {
    //                         return [
    //                             'id' => $item['id'],
    //                             'slug' => $item['slug'],
    //                             'title' => $item['title']['rendered'],
    //                             'excerpt' => strip_tags($item['excerpt']['rendered']),
    //                             'image_url' => $item['jetpack_featured_media_url'] ?? null,
    //                             'published_at' => $item['date'],
    //                             'penulis' => $authors[$item['author']]['name'] ?? 'Media Center',
    //                             'category' => collect($item['categories'])->map(fn($id) => $categories[$id] ?? null)->filter()->values(),
    //                             'source' => 'media',
    //                         ];
    //                     });
    //                 });
    //             } else {
    //                 // Full fetch berdasarkan kategori (tanpa cache karena bisa banyak kombinasi)
    //                 $mediaParams = [
    //                     'per_page' => $fetchLimit,
    //                     'page' => 1,
    //                     'orderby' => 'date',
    //                     'order' => 'desc',
    //                     '_fields' => 'id,date,slug,title,excerpt,jetpack_featured_media_url,categories,author',
    //                 ];

    //                 if ($categorySlug) {
    //                     $catRes = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/categories', [
    //                         'slug' => $categorySlug,
    //                     ]);

    //                     $catId = collect($catRes->json())->first()['id'] ?? null;
    //                     if ($catId) $mediaParams['categories'] = $catId;
    //                 }

    //                 $mediaRes = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/posts', $mediaParams);

    //                 if ($mediaRes->ok()) {
    //                     $posts = collect($mediaRes->json());
    //                     $categoryIds = $posts->pluck('categories')->flatten()->unique()->all();
    //                     $authorIds = $posts->pluck('author')->unique()->all();

    //                     $categories = collect(Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/categories', [
    //                         'include' => implode(',', $categoryIds),
    //                         '_fields' => 'id,name,slug',
    //                     ])->json())->keyBy('id');

    //                     $authors = collect(Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/users', [
    //                         'include' => implode(',', $authorIds),
    //                         '_fields' => 'id,name',
    //                     ])->json())->keyBy('id');

    //                     $mediaNews = $posts->map(function ($item) use ($categories, $authors) {
    //                         return [
    //                             'id' => $item['id'],
    //                             'slug' => $item['slug'],
    //                             'title' => $item['title']['rendered'],
    //                             'excerpt' => strip_tags($item['excerpt']['rendered']),
    //                             'image_url' => $item['jetpack_featured_media_url'] ?? null,
    //                             'published_at' => $item['date'],
    //                             'penulis' => $authors[$item['author']]['name'] ?? 'Media Center',
    //                             'category' => collect($item['categories'])->map(fn($id) => $categories[$id] ?? null)->filter()->values(),
    //                             'source' => 'media',
    //                         ];
    //                     });
    //                 }
    //             }
    //         } catch (\Throwable $e) {
    //             $mediaNews = collect();
    //         }

    //         // ========= 3. Gabungkan & paginasi manual ========= //
    //         $merged = $localNews->concat($mediaNews)->sortByDesc('published_at')->values();
    //         $total = $merged->count();
    //         $paginated = $merged->forPage($page, $perPage)->values();

    //         return [
    //             'data' => $paginated,
    //             'meta' => [
    //                 'current_page' => $page,
    //                 'per_page' => $perPage,
    //                 'total' => $total,
    //                 'total_pages' => ceil($total / $perPage),
    //             ]
    //         ];
    //     });
    // }

    public function index(Request $request)
    {
        $categorySlug = $request->get('category');
        $perPage = min($request->get('per_page', 10), 100);
        $page = (int) $request->get('page', 1);
        $isLatest = $request->boolean('latest');
        $isLatestPerCategory = $request->boolean('latest_per_category');
        $fetchLimit = $perPage * 3;

        $cacheKey = 'news:index:category=' . ($categorySlug ?? 'all') .
                    ':page=' . $page .
                    ':perPage=' . $perPage .
                    ':latest=' . ($isLatest ? '1' : '0') .
                    ':latest_per_category=' . ($isLatestPerCategory ? '1' : '0');

        return Cache::remember($cacheKey, now()->addMinutes(10), function () use (
            $categorySlug, $perPage, $page, $fetchLimit, $isLatest, $isLatestPerCategory
        ) {
            $localQuery = News::where('is_active', true)
                ->with(['category:id,name,slug'])
                ->select('id', 'title', 'image', 'excerpt', 'slug', 'category_id', 'published_at', 'created_at');

            if ($categorySlug) {
                $localQuery->whereHas('category', fn ($q) => $q->where('slug', $categorySlug));
            }

            if ($isLatest) {
                $localQuery->orderByDesc('published_at');
            }

            if ($isLatestPerCategory) {
                $localQuery->whereIn('id', function ($sub) {
                    $sub->selectRaw('id')->from('news as n1')->whereRaw('n1.id = (
                        SELECT n2.id FROM news n2
                        WHERE n2.category_id = n1.category_id AND n2.is_active = true
                        ORDER BY n2.published_at DESC LIMIT 1
                    )');
                });
            }

            $localNews = $localQuery
                ->orderByDesc('published_at')
                ->limit($fetchLimit)
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'slug' => $item->slug,
                        'title' => $item->title,
                        'excerpt' => $item->excerpt,
                        'image_url' => $item->image,
                        'published_at' => $item->published_at,
                        'penulis' => 'Lokal',
                        'category' => $item->category,
                        'source' => 'local',
                    ];
                });

            $mediaNews = collect();

            try {
                if ($isLatestPerCategory) {
                    $mediaNews = Cache::remember('media-latest-per-category', now()->addMinutes(1), function () {
                        $categoriesRes = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/categories');
                        if (!$categoriesRes->ok()) return collect();

                        $categories = collect($categoriesRes->json())->take(10);

                        return $categories->map(function ($category) {
                            $postRes = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/posts', [
                                'categories' => $category['id'],
                                'per_page' => 1,
                                'orderby' => 'date',
                                'order' => 'desc',
                                '_embed' => true,
                            ]);

                            $post = $postRes->json()[0] ?? null;
                            if (!$post) return null;

                            return [
                                'id' => $post['id'],
                                'slug' => $post['slug'],
                                'title' => html_entity_decode($post['title']['rendered']),
                                'excerpt' =>  html_entity_decode(strip_tags($post['excerpt']['rendered'])),
                                'image_url' => $post['_embedded']['wp:featuredmedia'][0]['source_url'] ?? null,
                                'published_at' => $post['date'],
                                'penulis' => 'Media Center',
                                'category' => [
                                    'id' => $category['id'],
                                    'name' => html_entity_decode($category['name']),
                                    'slug' => $category['slug'],
                                ],
                                'source' => 'media',
                            ];
                        })->filter()->values();
                    });
                } elseif ($isLatest) {
                    $mediaNews = Cache::remember('media-latest-news', now()->addMinutes(1), function () {
                        $postRes = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/posts', [
                            'per_page' => 5,
                            'orderby' => 'date',
                            'order' => 'desc',
                            '_fields' => 'id,date,slug,title,excerpt,jetpack_featured_media_url,categories,author',
                        ]);

                        $posts = collect($postRes->json());
                        $categoryIds = $posts->pluck('categories')->flatten()->unique()->all();
                        $authorIds = $posts->pluck('author')->unique()->all();

                        $categories = collect(Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/categories', [
                            'include' => implode(',', $categoryIds),
                            '_fields' => 'id,name,slug'
                        ])->json())->keyBy('id');

                        $authors = collect(Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/users', [
                            'include' => implode(',', $authorIds),
                            '_fields' => 'id,name'
                        ])->json())->keyBy('id');

                        return $posts->map(function ($item) use ($categories, $authors) {
                            return [
                                'id' => $item['id'],
                                'slug' => $item['slug'],
                                'title' => html_entity_decode($item['title']['rendered']),
                                'excerpt' => html_entity_decode(strip_tags($item['excerpt']['rendered'])),
                                'image_url' => $item['jetpack_featured_media_url'] ?? null,
                                'published_at' => $item['date'],
                                'penulis' => $authors[$item['author']]['name'] ?? 'Media Center',
                                'category' => collect($item['categories'])->map(fn($id) => $categories[$id] ?? null)->filter()->values(),
                                'source' => 'media',
                            ];
                        });
                    });
                } else {
                    $mediaParams = [
                        'per_page' => min($fetchLimit, 10),
                        'page' => 1,
                        'orderby' => 'date',
                        'order' => 'desc',
                        '_fields' => 'id,date,slug,title,excerpt,jetpack_featured_media_url,categories,author',
                    ];

                    if ($categorySlug) {
                        $catRes = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/categories', [
                            'slug' => $categorySlug,
                        ]);

                        $catId = collect($catRes->json())->first()['id'] ?? null;
                        if ($catId) $mediaParams['categories'] = $catId;
                    }

                    $mediaRes = Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/posts', $mediaParams);

                    if ($mediaRes->ok()) {
                        $posts = collect($mediaRes->json());
                        $categoryIds = $posts->pluck('categories')->flatten()->unique()->all();
                        $authorIds = $posts->pluck('author')->unique()->all();

                        $categories = collect(Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/categories', [
                            'include' => implode(',', $categoryIds),
                            '_fields' => 'id,name,slug',
                        ])->json())->keyBy('id');

                        $authors = collect(Http::withoutVerifying()->get('https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/users', [
                            'include' => implode(',', $authorIds),
                            '_fields' => 'id,name',
                        ])->json())->keyBy('id');

                        $mediaNews = $posts->map(function ($item) use ($categories, $authors) {
                            return [
                                'id' => $item['id'],
                                'slug' => $item['slug'],
                                'title' => html_entity_decode($item['title']['rendered']),
                                'excerpt' => html_entity_decode(strip_tags($item['excerpt']['rendered'])),
                                'image_url' => $item['jetpack_featured_media_url'] ?? null,
                                'published_at' => $item['date'],
                                'penulis' => $authors[$item['author']]['name'] ?? 'Media Center',
                                'category' => collect($item['categories'])->map(fn($id) => $categories[$id] ?? null)->filter()->values(),
                                'source' => 'media',
                            ];
                        });
                    }
                }
            } catch (\Throwable $e) {
                $mediaNews = collect();
            }

            $merged = $localNews->concat($mediaNews)->sortByDesc('published_at')->values();
            $total = $merged->count();
            $paginated = $merged->forPage($page, $perPage)->values();

            return [
                'data' => $paginated,
                'meta' => [
                    'current_page' => $page,
                    'per_page' => $perPage,
                    'total' => $total,
                    'total_pages' => ceil($total / $perPage),
                ]
            ];
        });
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    { 

    // 1. Coba cari dari database lokal
    $local = News::where('slug', $slug)
        ->where('is_active', true)
        ->with('category:id,name,slug')
        ->select('id', 'title', 'excerpt', 'content', 'slug', 'image', 'published_at', 'category_id')
        ->first();

    if ($local) {
        return response()->json([
            'source' => 'local',
            'data' => [
                'id' => $local->id,
                'slug' => $local->slug,
                'title' => html_entity_decode($local->title),
                'excerpt' => html_entity_decode($local->excerpt),
                'content' => html_entity_decode($local->content),
                'image_url' => $local->image,
                'published_at' => $local->published_at,
                'penulis' => 'Lokal',
                'category' => $local->category,
            ],
        ]);
    }

    // 2. Kalau tidak ketemu, cari dari Media Center (gunakan cache agar ringan)
    $cacheKey = "media-news:slug:$slug";

    return Cache::remember($cacheKey, now()->addMinutes(10), function () use ($slug) {
        $res = Http::withoutVerifying()->timeout(10)->get(
            'https://mediacenter.serdangbedagaikab.go.id/wp-json/wp/v2/posts',
            [
                'slug' => $slug,
                '_embed' => true,
            ]
        );

        if (!$res->ok() || empty($res->json())) {
            abort(404, 'Berita tidak ditemukan');
        }

        $post = $res->json()[0];

        return response()->json([
            'source' => 'media_center',
            'data' => [
                'id' => $post['id'],
                'slug' => $post['slug'],
                'title' => html_entity_decode($post['title']['rendered']),
                'excerpt' => html_entity_decode(strip_tags($post['excerpt']['rendered'])),
                'content' => html_entity_decode(strip_tags($post['content']['rendered'], '<p><a><strong><em><ul><ol><li><br><h1><h2><h3><blockquote>')),
                'image_url' => $post['_embedded']['wp:featuredmedia'][0]['source_url'] ?? null,
                'published_at' => $post['date'],
                'penulis' => $post['_embedded']['author'][0]['name'] ?? 'Media Center',
                'category' => collect($post['categories'])->map(function ($id) {
                    return ['id' => $id]; // opsional: fetch nama kategori juga
                }),
            ],
        ]);
    });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
