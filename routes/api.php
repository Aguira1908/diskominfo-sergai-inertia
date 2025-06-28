<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\NewsCategoryController;
use App\Http\Controllers\Api\ConfigurationController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\FeaturedProgramController;
use App\Http\Controllers\Api\NewsSummarizeController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/menu', [MenuController::class, 'index']);
Route::get('/menu-detail/{slug}', [MenuController::class, 'show']);

Route::get('/configuration', [ConfigurationController::class, 'index']);

Route::get('/banners', [BannerController::class, 'index']);

Route::get('/featured-programs', [FeaturedProgramController::class, 'index']);

Route::get('/events', [EventController::class, 'index']);

Route::get('/news-category', [NewsCategoryController::class, 'index']);

// Get contents by menu/submenu
Route::get('/contents', [ContentController::class, 'index']);

// Get single content by slug
Route::get('/contents/{slug}', [ContentController::class, 'show']);
// routes/api.php
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{slug}', [NewsController::class, 'show']);

//Route Api Sum
Route::get('/summarize', [NewsSummarizeController::class, 'index']);
Route::get('/summarize/{id}', [NewsSummarizeController::class, 'show']);