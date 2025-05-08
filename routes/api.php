<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\ConfigurationController;
use App\Http\Controllers\APi\FeaturedProgramController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/menu', [MenuController::class, 'index']);

Route::get('/configuration', [ConfigurationController::class, 'index']);

Route::get('/banners', [BannerController::class, 'index']);

Route::get('/featured-programs', [FeaturedProgramController::class, 'index']);

Route::get('/events', [EventController::class, 'index']);
