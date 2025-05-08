<?php

namespace App\Http\Controllers\Api;

use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $cacheKey = 'news_index_' . md5(serialize($request->all()));

        $news = Cache::remember($cacheKey, 3600, function () use ($request) {
            $query = News::with([
                'category' => function ($q) {
                    $q->select('id', 'name', 'slug');
                }
            ])
                ->select([
                    'id',
                    'title',
                    'image',
                    'slug',
                    'category_id',
                    'published_at',
                    'created_at'
                ]);

            // Filter by Latest
            if ($request->boolean('latest')) {
                $query->latest('published_at');
            }

            // Filter latest per kategori
            if ($request->boolean('latest_per_category')) {
                $query->whereIn('id', function ($subquery) {
                    $subquery->selectRaw('MAX(id)')
                        ->from('news')
                        ->groupBy('category_id');
                });
            }

            $perPage = min($request->get('per_page', 5), 100);

            return $query->paginate($perPage)
                ->setPath($request->url())
                ->appends($request->query());
        });

        return response()->json([
            'data' => $news->getCollection(),
            'meta' => [
                'current_page' => $news->currentPage(),
                'per_page' => $news->perPage(),
                'total' => $news->total(),
            ]
        ]);
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
    { {
            $news = Cache::remember("news_{$slug}", 3600, function () use ($slug) {
                return News::with([
                    'category' => function ($q) {
                        $q->select('id', 'name', 'slug');
                    }
                ])
                    ->where('slug', $slug)
                    ->firstOrFail();
            });

            return response()->json([
                'data' => $news,
                'message' => 'Success'
            ]);
        }
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
