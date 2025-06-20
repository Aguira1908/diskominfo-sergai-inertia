<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\SubMenu;
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
                        'excerpt' => $submenu->excerpt,
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
    public function show(string $slug)
    {
        // Coba cari di Menu
        $menu = Menu::where('url_slug', $slug)->first();

        if ($menu) {
            return response()->json([
                'source' => 'menu',
                'title' => $menu->title,
                'excerpt' => $menu->excerpt,
                'slug' => $menu->url_slug,
            ]);
        }

        // Coba cari di SubMenu
        $subMenu = SubMenu::where('url_slug', $slug)->first();

        if ($subMenu) {
            return response()->json([
                'source' => 'sub_menu',
                'title' => $subMenu->title,
                'excerpt' => $subMenu->excerpt,
                'slug' => $subMenu->url_slug,
            ]);
        }

        // Jika tidak ditemukan di keduanya
        return response()->json(['message' => 'Menu or SubMenu not found'], 404);
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
