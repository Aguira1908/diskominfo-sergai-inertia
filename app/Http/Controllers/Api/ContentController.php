<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\Menu;
use App\Models\Submenu;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Membuat query untuk mengambil konten yang aktif
        // Membuat query untuk mengambil konten yang aktif
        $query = Content::with([
            'menu' => function ($query) {
                $query->select('id', 'title', 'url_slug'); // Hanya mengambil id, title, dan url_slug dari menu
            },
            'submenu' => function ($query) {
                $query->select('id', 'title', 'url_slug'); // Hanya mengambil id, title, dan url_slug dari submenu
            }
        ])
            ->select([ // Hanya memilih kolom yang diperlukan dari content
                'id',
                'sub_menu_id',
                'menu_id',
                'title',
                'slug',
                'created_at',
                'updated_at',
            ])
            ->where('is_active', true); // Hanya mengambil konten yang aktif

        // Filter berdasarkan menu_slug
        if ($request->filled('menu_slug')) {
            $query->whereHas('menu', function ($q) use ($request) {
                $q->where('url_slug', $request->get('menu_slug'));
            });
        }

        // Filter berdasarkan sub_menu_slug (jika ada sub-menu)
        if ($request->filled('sub_menu_slug')) {
            $query->whereHas('submenu', function ($q) use ($request) {
                $q->where('url_slug', $request->get('sub_menu_slug'));
            });
        }

        // Ambil semua konten yang sesuai dengan filter tanpa paginasi
        $contents = $query->get();

        // Response JSON
        if ($contents->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Content not found',
            ], 404);
        }

        return response()->json([
            'data' => $contents,
            'message' => 'Success',
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
    {
        $content = Content::with([
            'menu' => function ($query) {
                $query->select('id', 'title', 'url_slug');
            },
            'submenu' => function ($query) {
                $query->select('id', 'title', 'url_slug');
            }
        ])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$content) {
            return response()->json([
                'message' => 'Content not found',
                'data' => null
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'data' => $content
        ]);
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
