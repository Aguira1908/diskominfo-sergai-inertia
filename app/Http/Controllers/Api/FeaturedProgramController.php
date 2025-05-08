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
        try {
            $programs = Cache::remember('active_featured_programs', 3600, function () {
                return FeaturedProgram::active()
                    ->ordered()
                    ->get();
            });

            return response()->json([
                'data' => $programs,
                'message' => 'Success'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve programs'
            ], 500);
        }
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
