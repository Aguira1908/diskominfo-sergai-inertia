<?php

namespace App\Http\Controllers\APi;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\NewsSummaries;
use App\Http\Controllers\Controller;

class NewsSummarizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $startDate = Carbon::now()->subWeek(); // 7 hari terakhir
        $endDate = Carbon::now();

        $newsSum = NewsSummaries::whereBetween('created_at', [$startDate, $endDate])->get(["id", "period_type", "start_date", "end_date", "summary"]);


        if (!$newsSum) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.',
            ], 404);
        }
        return response($newsSum);
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
        $newsSum = NewsSummaries::find($id);


        if (!$newsSum) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.',
            ], 404);
        }
        return response()->json($newsSum);
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
