<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menus = Menu::where('is_active', true)
            ->with([
                'submenus' => function ($query) {
                    $query->where('is_active', true);
                }
            ])
            ->get();

        $transformedMenus = $menus->map(function ($menu) {
            return [
                'id' => $menu->id,
                'title' => $menu->title,
                'url_slug' => $menu->url_slug,
                'submenus' => $menu->submenus->map(function ($submenu) {
                    return [
                        'id' => $submenu->id,
                        'title' => $submenu->title,
                        'url_slug' => $submenu->url_slug,
                    ];
                })
            ];
        });

        return response()->json(
            $transformedMenus,
            200
        );
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
