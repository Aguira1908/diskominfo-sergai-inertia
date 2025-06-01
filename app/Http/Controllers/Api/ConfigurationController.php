<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Configurations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;


class ConfigurationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $configuration = Configurations::where('is_active', true)->first();

        if (!$configuration) {
            return response()->json([
                'success' => false,
                'message' => 'Konfigurasi tidak ditemukan.',
            ], 404);
        }

        return response()->json($configuration);
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
