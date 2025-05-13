<?php

namespace App\Http\Controllers\APi;

use Illuminate\Http\Request;
use App\Models\FeaturedProgram;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class FeaturedProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $programs = FeaturedProgram::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get();

        if (!$programs) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.',
            ], 404);
        }
        return response()->json($programs);

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
