<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Set locale untuk Carbon jika ingin Bahasa Indonesia
        Carbon::setLocale('id');

        $events = Event::where('is_active', true)
            ->orderBy('date', 'asc')
            ->get()
            ->map(function ($event) {
                // Format tanggal dan waktu
                $event->date_formatted = Carbon::parse($event->date)->translatedFormat('d F Y');
                $event->time_range = "{$event->start_time} - {$event->end_time}";

                // Opsional: sembunyikan field mentah jika tidak dibutuhkan
                unset($event->created_at, $event->updated_at);

                return $event;
            });


        if (!$events) {
            return response()->json([
                'success' => false,
                'message' => 'event tidak ditemukan.',
            ], 404);
        }

        return response()->json($events);


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
