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
        try {
            $configuration = Cache::remember('active_configuration', 3600, function () {
                return Configurations::where('is_active', true)->first();
            });

            if (!$configuration) {
                return response()->json(['message' => 'Configuration not found'], 404);
            }

            return response()->json([
                'data' => $configuration,
                'message' => 'Success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve configuration'
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
