<?php

namespace App\Http\Controllers\APi;

use App\Http\Controllers\Controller;
use App\Models\NewsSummaries;
use Illuminate\Http\Request;

class NewsSummarizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $newsSum = NewsSummaries::get();

        if (!$newsSum) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.',
            ], 404);
        }
        return response()->json($newsSum);
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
    public function show(string $id)
    {
        //
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
