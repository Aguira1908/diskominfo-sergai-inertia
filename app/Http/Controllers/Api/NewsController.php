<?php

namespace App\Http\Controllers\Api;

use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
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

        // Filter berita terbaru secara global
        if ($request->boolean('latest')) {
            $query->latest('published_at');
        }

        // Filter berita terbaru per kategori
        if ($request->boolean('latest_per_category')) {
            $query->whereIn('id', function ($subquery) {
                $subquery->selectRaw('MAX(id)')
                    ->from('news')
                    ->groupBy('category_id');
            });
        }

        // Tentukan jumlah per halaman, maksimum 100
        $perPage = min($request->get('per_page', 5), 100);

        // Lakukan paginasi
        $news = $query->paginate($perPage)
            ->setPath($request->url())
            ->appends($request->query());

        // Response JSON
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
            try {
                $news = News::with([
                    'category' => function ($q) {
                        $q->select('id', 'name', 'slug');
                    }
                ])
                    ->where('slug', $slug)
                    ->firstOrFail();

                return response()->json([
                    'data' => $news,
                    'message' => 'Success'
                ]);
            } catch (ModelNotFoundException $e) {
                return response()->json([
                    'message' => 'Berita tidak ditemukan.'
                ], 404);
            }
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
